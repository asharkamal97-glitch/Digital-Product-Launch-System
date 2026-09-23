import crypto from 'crypto';
import { db } from './db';

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'mock_secret_sars_razorpay_test';

export interface PaymentOrderParams {
  studentId: string;
  invoiceId: string;
  amount: number;
  currency?: string;
  receiptNumber?: string;
}

export function createMockRazorpayOrderId(prefix: string = 'order_SARS'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

export function createMockPaymentId(): string {
  return `pay_SARS_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

export function generateRazorpaySignature(orderId: string, paymentId: string): string {
  return crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  // In development / sandbox mode, accept valid signatures or test prefix
  if (process.env.MOCK_PAYMENT_MODE === 'true' && signature.startsWith('mock_sig_')) {
    return true;
  }
  const expectedSignature = generateRazorpaySignature(orderId, paymentId);
  return expectedSignature === signature;
}

export async function processVerifiedPayment(params: {
  invoiceId: string;
  studentId: string;
  amount: number;
  paymentMethod: string;
  gatewayOrderId: string;
  gatewayPaymentId: string;
  gatewaySignature: string;
}) {
  const { invoiceId, studentId, amount, paymentMethod, gatewayOrderId, gatewayPaymentId, gatewaySignature } = params;

  // 1. Fetch Invoice & Student
  const invoice = await db.feeInvoice.findUnique({
    where: { id: invoiceId },
    include: {
      items: true,
      student: {
        include: {
          class: true,
          section: true,
          parent: true,
        },
      },
    },
  });

  if (!invoice) {
    throw new Error('Invoice not found');
  }

  // 2. Prevent duplicate payment
  const existingPayment = await db.payment.findFirst({
    where: {
      gatewayPaymentId,
      status: 'SUCCESS',
    },
  });

  if (existingPayment) {
    const existingReceipt = await db.receipt.findUnique({
      where: { paymentId: existingPayment.id },
    });
    return { payment: existingPayment, receipt: existingReceipt };
  }

  // 3. Create Payment Record
  const paymentNo = `PMT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const transactionId = `TXN_SARS_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  const payment = await db.payment.create({
    data: {
      paymentNo,
      invoiceId,
      studentId,
      amount,
      currency: 'INR',
      paymentMethod,
      gatewayOrderId,
      gatewayPaymentId,
      gatewaySignature,
      transactionId,
      status: 'SUCCESS',
      paidAt: new Date(),
    },
  });

  // 4. Update Invoice Status
  const newPaidAmount = invoice.paidAmount + amount;
  const isFullyPaid = newPaidAmount >= invoice.totalAmount;
  await db.feeInvoice.update({
    where: { id: invoiceId },
    data: {
      paidAmount: newPaidAmount,
      status: isFullyPaid ? 'PAID' : 'PARTIAL',
    },
  });

  // 5. Generate Professional Receipt
  const receiptCount = await db.receipt.count();
  const receiptNo = `SARS/REC/2026/${String(receiptCount + 1001).padStart(4, '0')}`;
  const verificationHash = `SARS-VERIFY-${payment.id.slice(0, 12).toUpperCase()}`;
  const qrVerificationUrl = `/verify/receipt/${receiptNo.replace(/\//g, '-')}`;

  const studentDetailsJson = JSON.stringify({
    studentName: `${invoice.student.firstName} ${invoice.student.lastName}`,
    admissionNo: invoice.student.admissionNo,
    rollNo: invoice.student.rollNo,
    className: invoice.student.class.name,
    sectionName: invoice.student.section.name,
    session: invoice.student.session,
    parentName: invoice.student.parent?.fatherName || 'Guardian',
    contact: invoice.student.parent?.emergencyContact || '+91 9006326786',
    address: invoice.student.address,
  });

  const feeBreakdownJson = JSON.stringify(
    invoice.items.map((item) => ({
      name: item.categoryName,
      amount: item.amount,
    }))
  );

  const receipt = await db.receipt.create({
    data: {
      receiptNo,
      paymentId: payment.id,
      studentId,
      totalAmount: amount,
      paymentMethod,
      studentDetailsJson,
      feeBreakdownJson,
      verificationHash,
      qrCodeUrl: qrVerificationUrl,
    },
  });

  return { payment, receipt };
}
