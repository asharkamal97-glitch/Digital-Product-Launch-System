import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');
    const sectionId = searchParams.get('sectionId');

    const where: any = {};
    if (classId) where.classId = classId;
    if (sectionId) where.sectionId = sectionId;

    const homeworks = await db.homework.findMany({
      where,
      include: {
        class: true,
        section: true,
        subject: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ homeworks });
  } catch (error: any) {
    console.error('Fetch homework error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homework' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { title, description, classId, sectionId, subjectId, dueDate } = body;

    if (!title || !classId) {
      return NextResponse.json(
        { error: 'Title and Class ID are required' },
        { status: 400 }
      );
    }

    const homework = await db.homework.create({
      data: {
        title,
        description: description || '',
        classId,
        sectionId: sectionId || null,
        subjectId: subjectId || null,
        dueDate: new Date(dueDate || Date.now() + 86400000 * 2),
      },
    });

    return NextResponse.json({ homework }, { status: 201 });
  } catch (error: any) {
    console.error('Create homework error:', error);
    return NextResponse.json(
      { error: 'Failed to create homework assignment' },
      { status: 500 }
    );
  }
}
