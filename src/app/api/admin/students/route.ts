import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const classId = searchParams.get('classId') || 'ALL';

    const where: any = {};
    if (classId !== 'ALL') {
      where.classId = classId;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { admissionNo: { contains: search } },
        { rollNo: { contains: search } },
      ];
    }

    const [students, classes] = await Promise.all([
      db.student.findMany({
        where,
        include: {
          class: true,
          section: true,
          parent: true,
        },
        orderBy: [{ class: { numericLevel: 'asc' } }, { rollNo: 'asc' }],
      }),
      db.class.findMany({
        include: { sections: true },
        orderBy: { numericLevel: 'asc' },
      }),
    ]);

    return NextResponse.json({ students, classes });
  } catch (error: any) {
    console.error('Fetch students error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student registry' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();

    const {
      firstName,
      lastName,
      gender,
      dob,
      classId,
      sectionId,
      rollNo,
      admissionNo,
      fatherName,
      phone,
      address,
      isResidential,
    } = body;

    if (!firstName || !lastName || !classId || !sectionId || !rollNo || !admissionNo) {
      return NextResponse.json(
        { error: 'Missing required student fields' },
        { status: 400 }
      );
    }

    // Check unique admissionNo
    const existing = await db.student.findUnique({
      where: { admissionNo },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Student with Admission No ${admissionNo} already exists.` },
        { status: 400 }
      );
    }

    // Create user login for student
    const username = admissionNo.toLowerCase().replace(/[^a-z0-9]/g, '');
    const passwordHash = await hashPassword('student123');

    const user = await db.user.create({
      data: {
        username,
        email: `${username}@student.sarssiwan.com`,
        passwordHash,
        name: `${firstName} ${lastName}`,
        role: 'STUDENT',
        phone: phone || '+91 9006326786',
      },
    });

    // Create parent user & record if fatherName provided
    let parentRecord = null;
    if (fatherName) {
      const pUsername = `parent.${username}`;
      const parentUser = await db.user.create({
        data: {
          username: pUsername,
          email: `${pUsername}@gmail.com`,
          passwordHash: await hashPassword('parent123'),
          name: `${fatherName} (Parent)`,
          role: 'PARENT',
          phone: phone || '+91 9006326786',
        },
      });

      parentRecord = await db.parent.create({
        data: {
          userId: parentUser.id,
          fatherName,
          motherName: 'Mother',
          address: address || 'Siwan, Bihar',
          emergencyContact: phone || '+91 9006326786',
        },
      });
    }

    // Get current Academic Year
    const currentYear = await db.academicYear.findFirst({
      where: { isCurrent: true },
    });

    // Create student
    const student = await db.student.create({
      data: {
        userId: user.id,
        admissionNo,
        rollNo,
        firstName,
        lastName,
        gender: gender || 'Male',
        dob: dob ? new Date(dob) : new Date('2015-05-15'),
        classId,
        sectionId,
        parentId: parentRecord ? parentRecord.id : null,
        session: currentYear?.name || '2026-27',
        address: address || 'Village Baghra, Siwan',
        isResidential: isResidential === true,
        status: 'ACTIVE',
      },
    });

    // Create StudentEnrollment
    if (currentYear) {
      await db.studentEnrollment.create({
        data: {
          studentId: student.id,
          academicYearId: currentYear.id,
          classId,
          sectionId,
          rollNo,
          status: 'ENROLLED',
        },
      });
    }

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'STUDENT_REGISTERED',
      `Registered student ${firstName} ${lastName} (${admissionNo}) in Class ID ${classId}`
    );

    return NextResponse.json({ student }, { status: 201 });
  } catch (error: any) {
    console.error('Create student error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create student' },
      { status: 500 }
    );
  }
}
