import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT'].includes(session.role)) {
      return NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 });
    }

    const body = await req.json();
    const { studentId, invoiceId, amount, paymentMethod, referenceNo, bankName, chequeNo, remarks } = body;

    const numAmount = parseFloat(amount);
    if (!studentId || isNaN(numAmount) || numAmount <= 0 || !paymentMethod) {
      return NextResponse.json(
        { error: 'Invalid input. Student, Amount > 0, and Payment Method are required.' },
        { status: 400 }
      );
    }

    const student = await db.student.findUnique({
      where: { id: studentId },
      include: {
        class: true,
        section: true,
        parent: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    // Execute in transaction
    const result = await db.$transaction(async (prisma) => {
      let currentInvoice = null;

      if (invoiceId) {
        currentInvoice = await prisma.feeInvoice.findUnique({
          where: { id: invoiceId },
          include: { studentFee: true },
        });
      }

      if (!currentInvoice) {
        currentInvoice = await prisma.feeInvoice.findFirst({
          where: {
            studentId,
            status: { in: ['UNPAID', 'PARTIAL'] },
          },
          include: { studentFee: true },
          orderBy: { dueDate: 'asc' },
        });
      }

      if (!currentInvoice) {
        // Find studentFee to create invoice or process payment
        const studentFee = await prisma.studentFee.findFirst({
          where: {
            studentId,
            status: { in: ['UNPAID', 'PARTIAL'] },
          },
        });

        const invoiceCount = await prisma.feeInvoice.count();
        const invoiceNo = `INV-SARS-2026-${String(invoiceCount + 1).padStart(5, '0')}`;

        currentInvoice = await prisma.feeInvoice.create({
          data: {
            invoiceNo,
            studentId,
            studentFeeId: studentFee?.id || null,
            session: student.session || '2026-27',
            title: `Fee Settlement - ${student.class.name}`,
            dueDate: new Date(Date.now() + 86400000 * 15),
            subtotal: numAmount,
            totalAmount: numAmount,
            paidAmount: 0,
            status: 'UNPAID',
          },
          include: { studentFee: true },
        });
      }

      const paymentCount = await prisma.payment.count();
      const paymentNo = `PAY-SARS-2026-${String(paymentCount + 1).padStart(5, '0')}`;
      const transactionId = referenceNo?.trim() || chequeNo?.trim() || `TXN_OFFLINE_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      const payment = await prisma.payment.create({
        data: {
          paymentNo,
          invoiceId: currentInvoice.id,
          studentFeeId: currentInvoice.studentFeeId,
          studentId,
          amount: numAmount,
          currency: 'INR',
          paymentMethod: paymentMethod.toUpperCase(),
          transactionId,
          status: 'SUCCESS',
          paidAt: new Date(),
        },
      });

      // Generate Official Receipt
      const receiptCount = await prisma.receipt.count();
      const receiptNo = `SARS-2026-${String(receiptCount + 1).padStart(6, '0')}`;
      const verificationHash = crypto
        .createHash('sha256')
        .update(`${receiptNo}-${payment.id}-${numAmount}-${Date.now()}`)
        .digest('hex');

      const studentDetailsJson = JSON.stringify({
        admissionNo: student.admissionNo,
        rollNo: student.rollNo,
        studentName: `${student.firstName} ${student.lastName}`,
        className: student.class.name,
        sectionName: student.section.name,
        fatherName: student.parent?.fatherName || 'Parent / Guardian',
        phone: student.parent?.emergencyContact || '+91 9006326786',
        session: student.session,
        paymentMode: paymentMethod,
        bankDetails: bankName ? `${bankName} (Cheque/Ref: ${chequeNo || referenceNo})` : undefined,
        remarks: remarks || undefined,
        collectedBy: session.name || 'Accountant',
      });

      const feeBreakdownJson = JSON.stringify([
        {
          head: `Institutional Fee Settlement (${paymentMethod})`,
          amount: numAmount,
        },
      ]);

      const receipt = await prisma.receipt.create({
        data: {
          receiptNo,
          paymentId: payment.id,
          studentId,
          receiptDate: new Date(),
          totalAmount: numAmount,
          paymentMethod: paymentMethod.toUpperCase(),
          studentDetailsJson,
          feeBreakdownJson,
          verificationHash,
          qrCodeUrl: `/verify/receipt/${receiptNo}`,
        },
      });

      // Update Invoice
      const updatedInvoicePaid = (currentInvoice.paidAmount || 0) + numAmount;
      const updatedInvoiceStatus = updatedInvoicePaid >= currentInvoice.totalAmount ? 'PAID' : 'PARTIAL';

      await prisma.feeInvoice.update({
        where: { id: currentInvoice.id },
        data: {
          paidAmount: updatedInvoicePaid,
          status: updatedInvoiceStatus,
        },
      });

      // Update StudentFee
      if (currentInvoice.studentFeeId) {
        const studentFee = await prisma.studentFee.findUnique({
          where: { id: currentInvoice.studentFeeId },
        });

        if (studentFee) {
          const updatedFeePaid = (studentFee.paidAmount || 0) + numAmount;
          const updatedFeeStatus = updatedFeePaid >= studentFee.finalAmount ? 'PAID' : 'PARTIAL';

          await prisma.studentFee.update({
            where: { id: currentInvoice.studentFeeId },
            data: {
              paidAmount: updatedFeePaid,
              status: updatedFeeStatus,
            },
          });
        }
      }

      await logAudit(
        session.userId,
        session.name,
        'FEE_COLLECTION_OFFLINE',
        `Collected offline payment of ₹${numAmount} (${paymentMethod}) from student ${student.firstName} ${student.lastName} (${student.admissionNo}). Receipt: ${receiptNo}`
      );

      return { payment, receipt };
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Offline fee collection error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
