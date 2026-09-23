import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateApplicationNumber } from '@/lib/utils';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentName,
      gender,
      dob,
      applyingForClass,
      fatherName,
      motherName,
      parentPhone,
      parentEmail,
      address,
      previousSchool,
      isResidential = true,
      documentsJson,
    } = body;

    if (!studentName || !gender || !dob || !applyingForClass || !fatherName || !parentPhone || !address) {
      return NextResponse.json(
        { error: 'Please fill in all mandatory application fields.' },
        { status: 400 }
      );
    }

    const count = await db.admissionApplication.count();
    const applicationNo = generateApplicationNumber(count + 1001);

    const application = await db.admissionApplication.create({
      data: {
        applicationNo,
        studentName,
        gender,
        dob: new Date(dob),
        applyingForClass,
        fatherName,
        motherName: motherName || 'N/A',
        parentPhone,
        parentEmail: parentEmail || '',
        address,
        previousSchool: previousSchool || '',
        isResidential: Boolean(isResidential),
        documentsJson: documentsJson ? JSON.stringify(documentsJson) : null,
        status: 'SUBMITTED',
        submissionDate: new Date(),
        remarks: 'Online admission form received. Pending document verification.',
      },
    });

    await logAudit(
      'ADMISSION_APPLICATION_SUBMITTED',
      `New admission application ${applicationNo} submitted for student ${studentName} (${applyingForClass})`
    );

    return NextResponse.json({
      success: true,
      message: 'Admission application submitted successfully!',
      applicationNo: application.applicationNo,
      application,
    });
  } catch (error: any) {
    console.error('Admission apply error:', error);
    return NextResponse.json(
      { error: 'Failed to submit admission application.' },
      { status: 500 }
    );
  }
}
