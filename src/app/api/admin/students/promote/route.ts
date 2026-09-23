import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fromAcademicYearId, toAcademicYearId, targetClassId, targetSectionId, studentIds } = body;

    if (!fromAcademicYearId || !toAcademicYearId || !targetClassId || !targetSectionId || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const toYear = await db.academicYear.findUnique({ where: { id: toAcademicYearId } });
    if (!toYear) {
      return NextResponse.json({ error: 'Target academic year not found' }, { status: 404 });
    }

    await db.$transaction(async (tx) => {
      for (const studentId of studentIds) {
        const student = await tx.student.findUnique({
          where: { id: studentId }
        });
        
        if (!student) continue;

        await tx.studentEnrollment.updateMany({
          where: {
            studentId,
            academicYearId: fromAcademicYearId
          },
          data: {
            status: 'PROMOTED'
          }
        });

        await tx.studentEnrollment.create({
          data: {
            studentId,
            academicYearId: toAcademicYearId,
            classId: targetClassId,
            sectionId: targetSectionId,
            rollNo: student.rollNo,
            status: 'ENROLLED'
          }
        });

        await tx.student.update({
          where: { id: studentId },
          data: {
            classId: targetClassId,
            sectionId: targetSectionId,
            session: toYear.name
          }
        });
      }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'PROMOTE_STUDENTS',
        details: `Promoted ${studentIds.length} students to class ID ${targetClassId}`
      });
    }

    return NextResponse.json({ message: 'Students promoted successfully' });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'One or more students are already enrolled in the target academic year' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
