import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get('examId');
    const subjectId = searchParams.get('subjectId');
    const classId = searchParams.get('classId');

    const exams = await db.exam.findMany({
      include: {
        class: true,
        subjects: { include: { subject: true } },
      },
      orderBy: { startDate: 'desc' },
    });

    let marks: any[] = [];
    if (examId && subjectId && classId) {
      marks = await db.mark.findMany({
        where: { examId, subjectId },
        include: {
          student: {
            include: { class: true, section: true },
          },
        },
      });
    }

    return NextResponse.json({ success: true, exams, marks });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch examination data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'TEACHER' && session.role !== 'ADMIN' && session.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { examId, subjectId, records } = await req.json();

    if (!examId || !subjectId || !records || !Array.isArray(records)) {
      return NextResponse.json({ error: 'Invalid marks payload' }, { status: 400 });
    }

    for (const rec of records) {
      const marks = parseFloat(rec.marksObtained);
      const grade =
        marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B+' : marks >= 60 ? 'B' : marks >= 50 ? 'C' : marks >= 33 ? 'D' : 'F';

      await db.mark.upsert({
        where: {
          examId_subjectId_studentId: {
            examId,
            subjectId,
            studentId: rec.studentId,
          },
        },
        update: {
          marksObtained: marks,
          grade,
          remarks: rec.remarks || null,
        },
        create: {
          examId,
          subjectId,
          studentId: rec.studentId,
          marksObtained: marks,
          grade,
          remarks: rec.remarks || null,
        },
      });
    }

    await logAudit('MARKS_ENTERED', `Marks updated for Exam ${examId}, Subject ${subjectId} by ${session.name}`);

    return NextResponse.json({ success: true, message: 'Marks saved successfully' });
  } catch (error: any) {
    console.error('Marks save error:', error);
    return NextResponse.json({ error: 'Failed to save marks' }, { status: 500 });
  }
}
