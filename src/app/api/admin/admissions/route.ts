import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'ALL';

    const where: any = {};
    if (status !== 'ALL') {
      where.status = status;
    }

    const applications = await db.admissionApplication.findMany({
      where,
      include: { documents: true },
      orderBy: { submissionDate: 'desc' },
    });

    return NextResponse.json({ applications });
  } catch (error: any) {
    console.error('Fetch admissions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admission applications' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { id, status, remarks } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    const application = await db.admissionApplication.update({
      where: { id },
      data: {
        status,
        remarks: remarks || undefined,
        reviewedAt: new Date(),
        reviewedBy: session?.name || 'Administrative Desk',
      },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admission Staff',
      'ADMISSION_STATUS_UPDATED',
      `Updated application ${application.applicationNo} to ${status}`
    );

    return NextResponse.json({ application });
  } catch (error: any) {
    console.error('Update admission error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update admission status' },
      { status: 500 }
    );
  }
}
