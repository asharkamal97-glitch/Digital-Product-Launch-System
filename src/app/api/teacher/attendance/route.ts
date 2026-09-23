import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const sectionId = searchParams.get('sectionId');
    const dateStr = searchParams.get('date');

    if (!classId || !sectionId) {
      return NextResponse.json(
        { error: 'Class ID and Section ID are required' },
        { status: 400 }
      );
    }

    const date = dateStr ? new Date(dateStr) : new Date();
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const students = await db.student.findMany({
      where: { classId, sectionId },
      include: {
        attendances: {
          where: {
            date: { gte: startOfDay, lte: endOfDay },
          },
        },
      },
      orderBy: { rollNo: 'asc' },
    });

    return NextResponse.json({ students });
  } catch (error: any) {
    console.error('Teacher attendance error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { classId, sectionId, date, records } = body;

    if (!records || !Array.isArray(records)) {
      return NextResponse.json(
        { error: 'Invalid attendance records array' },
        { status: 400 }
      );
    }

    const attendanceDate = new Date(date || Date.now());

    // Batch upsert / create attendance records
    await db.$transaction(
      records.map((rec: { studentId: string; status: string; remarks?: string }) =>
        db.attendance.create({
          data: {
            studentId: rec.studentId,
            classId,
            sectionId,
            date: attendanceDate,
            status: rec.status || 'PRESENT',
            remarks: rec.remarks || null,
          },
        })
      )
    );

    return NextResponse.json({
      message: 'Attendance saved successfully',
      count: records.length,
    });
  } catch (error: any) {
    console.error('Save attendance error:', error);
    return NextResponse.json(
      { error: 'Failed to save attendance' },
      { status: 500 }
    );
  }
}
