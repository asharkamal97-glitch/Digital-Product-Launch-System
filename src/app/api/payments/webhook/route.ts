import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'sars_webhook_secret_2026';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    // In production, verify the webhook signature
    if (process.env.NODE_ENV === 'production' && RAZORPAY_WEBHOOK_SECRET && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;

    if (event === 'payment.captured' && paymentEntity) {
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const amount = paymentEntity.amount / 100; // in INR

      // Find pending payment by orderId
      const payment = await db.payment.findFirst({
        where: { gatewayOrderId: orderId },
        include: { feeInvoice: true, student: { include: { class: true } } },
      });

      if (payment && payment.status !== 'SUCCESS') {
        await db.$transaction(async (tx) => {
          // 1. Update Payment record
          await tx.payment.update({
            where: { id: payment.id },
            data: {
              status: 'SUCCESS',
              gatewayPaymentId: paymentId,
              paidAt: new Date(),
            },
          });

          // 2. Update Invoice
          await tx.feeInvoice.update({
            where: { id: payment.invoiceId },
            data: {
              paidAmount: payment.feeInvoice.paidAmount + amount,
              status: payment.feeInvoice.totalAmount <= payment.feeInvoice.paidAmount + amount ? 'PAID' : 'PARTIAL',
            },
          });

          // 3. Create Payment Transaction Log
          await tx.paymentTransaction.create({
            data: {
              paymentId: payment.id,
              studentId: payment.studentId,
              gatewayOrderId: orderId,
              gatewayEventId: payload.id || `evt_${Date.now()}`,
              amount,
              currency: 'INR',
              status: 'WEBHOOK_VERIFIED',
              rawPayloadJson: rawBody,
            },
          });
        });

        await logAudit(
          null,
          'Razorpay Webhook',
          'PAYMENT_WEBHOOK_VERIFIED',
          `Captured payment ${paymentId} for Order ${orderId}, amount ₹${amount}`
        );
      }
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook error' },
      { status: 500 }
    );
  }
}
