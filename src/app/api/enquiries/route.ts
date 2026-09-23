import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, type = 'GENERAL', message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, phone number, and message are required.' },
        { status: 400 }
      );
    }

    const count = await db.enquiry.count();
    const enquiryNo = `ENQ-${Date.now().toString().slice(-4)}-${count + 1}`;

    const enquiry = await db.enquiry.create({
      data: {
        enquiryNo,
        name: name.trim(),
        email: (email || '').trim(),
        phone: phone.trim(),
        type,
        message: message.trim(),
        status: 'NEW',
      },
    });

    await logAudit(
      'ENQUIRY_RECEIVED',
      `New ${type} enquiry from ${name} (${phone}): "${message.slice(0, 40)}..."`
    );

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our administrative team will reach out shortly.',
      enquiryNo: enquiry.enquiryNo,
    });
  } catch (error: any) {
    console.error('Enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ success: true, enquiries });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to load enquiries' }, { status: 500 });
  }
}
