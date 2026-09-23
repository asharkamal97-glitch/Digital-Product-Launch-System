import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createMockRazorpayOrderId } from '@/lib/payment';

export async function POST(req: NextRequest) {
  try {
    const { studentId, invoiceId, amount, paymentMethod = 'ONLINE_RAZORPAY' } = await req.json();

    if (!studentId || !invoiceId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid student ID, invoice ID, and payment amount are required' },
        { status: 400 }
      );
    }

    const invoice = await db.feeInvoice.findUnique({
      where: { id: invoiceId },
      include: {
        student: {
          include: {
            parent: true,
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const remainingDue = invoice.totalAmount - invoice.paidAmount;
    if (amount > remainingDue) {
      return NextResponse.json(
        {
          error: `Payment amount (₹${amount}) exceeds remaining due (₹${remainingDue})`,
        },
        { status: 400 }
      );
    }

    // Generate Order ID for Razorpay / UPI
    const orderId = createMockRazorpayOrderId();
    const amountInPaise = Math.round(amount * 100);

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${invoice.invoiceNo}`,
        studentName: `${invoice.student.firstName} ${invoice.student.lastName}`,
        email: invoice.student.parent?.emergencyContact
          ? `${invoice.student.admissionNo.toLowerCase()}@student.sarssiwan.com`
          : 'sars.baghra@gmail.com',
        contact: invoice.student.parent?.emergencyContact || '+91 9006326786',
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_SARS2026Sandbox',
      },
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment order.' },
      { status: 500 }
    );
  }
}
