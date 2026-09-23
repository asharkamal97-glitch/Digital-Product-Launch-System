import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { generateCertificateNumber } from '@/lib/utils';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get('studentId');

    const where: any = {};
    if (studentId) where.studentId = studentId;

    const certificates = await db.certificate.findMany({
      where,
      include: {
        student: {
          include: { class: true, section: true, parent: true },
        },
      },
      orderBy: { issueDate: 'desc' },
    });

    return NextResponse.json({ success: true, certificates });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { studentId, type = 'BONAFIDE', purpose, remarks } = await req.json();
    if (!studentId) {
      return NextResponse.json({ error: 'Student ID is required' }, { status: 400 });
    }

    const student = await db.student.findUnique({
      where: { id: studentId },
      include: { class: true, section: true, parent: true },
    });

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const count = await db.certificate.count();
    const certificateNo = generateCertificateNumber(type, count + 1001);
    const verificationHash = `SARS-CERT-VHASH-${Date.now().toString().slice(-6)}`;
    const qrCodeUrl = `/verify/certificate/${certificateNo.replace(/\//g, '-')}`;

    const contentJson = JSON.stringify({
      studentName: `${student.firstName} ${student.lastName}`,
      admissionNo: student.admissionNo,
      rollNo: student.rollNo,
      className: student.class.name,
      sectionName: student.section.name,
      session: student.session,
      fatherName: student.parent?.fatherName || 'Guardian',
      motherName: student.parent?.motherName || 'N/A',
      dob: student.dob,
      purpose: purpose || 'Official documentation and identification',
      remarks: remarks || 'Bearing exemplary moral character and academic diligence.',
      issueDate: new Date(),
    });

    const certificate = await db.certificate.create({
      data: {
        certificateNo,
        studentId: student.id,
        type,
        issueDate: new Date(),
        contentJson,
        verificationHash,
        qrCodeUrl,
      },
    });

    await logAudit(
      'CERTIFICATE_GENERATED',
      `${type} certificate ${certificateNo} generated for ${student.firstName} ${student.lastName}`
    );

    return NextResponse.json({ success: true, certificate });
  } catch (error: any) {
    console.error('Certificate create error:', error);
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 });
  }
}
