import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationNo = searchParams.get('applicationNo');

    if (!applicationNo) {
      return NextResponse.json(
        { error: 'Application number is required' },
        { status: 400 }
      );
    }

    const application = await db.admissionApplication.findUnique({
      where: { applicationNo: applicationNo.trim() },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'No application found with the provided Application Number' },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });
  } catch (error: any) {
    console.error('Track admission error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve application status' },
      { status: 500 }
    );
  }
}
