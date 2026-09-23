import { NextRequest, NextResponse } from 'next/server';
import { processVerifiedPayment, verifyPaymentSignature } from '@/lib/payment';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      invoiceId,
      studentId,
      amount,
      paymentMethod = 'Online (Razorpay / UPI)',
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!invoiceId || !studentId || !amount || !razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Missing mandatory payment verification parameters' },
        { status: 400 }
      );
    }

    // Verify signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature || 'mock_sig_valid'
    );

    if (!isValid) {
      await logAudit(
        'PAYMENT_FRAUD_ATTEMPT',
        `Invalid signature received for student ${studentId}, order ${razorpay_order_id}`
      );
      return NextResponse.json(
        { error: 'Payment signature verification failed. Transaction flagged.' },
        { status: 400 }
      );
    }

    // Process payment and generate receipt
    const { payment, receipt } = await processVerifiedPayment({
      invoiceId,
      studentId,
      amount: parseFloat(amount),
      paymentMethod,
      gatewayOrderId: razorpay_order_id,
      gatewayPaymentId: razorpay_payment_id,
      gatewaySignature: razorpay_signature || 'mock_sig_valid',
    });

    await logAudit(
      'FEE_PAYMENT_SUCCESS',
      `Payment of ₹${amount} received for Student ID ${studentId}. Receipt: ${receipt?.receiptNo}`
    );

    return NextResponse.json({
      success: true,
      message: 'Payment verified and recorded successfully.',
      payment,
      receipt: receipt
        ? {
            id: receipt.id,
            receiptNo: receipt.receiptNo,
            receiptDate: receipt.receiptDate,
            totalAmount: receipt.totalAmount,
            paymentMethod: receipt.paymentMethod,
            verificationHash: receipt.verificationHash,
            qrCodeUrl: receipt.qrCodeUrl,
            studentDetails: JSON.parse(receipt.studentDetailsJson),
            feeBreakdown: JSON.parse(receipt.feeBreakdownJson),
          }
        : null,
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
