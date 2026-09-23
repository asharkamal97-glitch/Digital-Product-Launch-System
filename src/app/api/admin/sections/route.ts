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
    const { classId, name, capacity } = body;

    if (!classId || !name) {
      return NextResponse.json({ error: 'classId and name are required' }, { status: 400 });
    }

    const section = await db.section.create({
      data: {
        classId,
        name,
        capacity: capacity ? Number(capacity) : 40
      }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'CREATE_SECTION',
        details: `Created section ${name}`
      });
    }

    return NextResponse.json({ data: section }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Section name already exists in this class' }, { status: 409 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, name, capacity } = body;

    if (!id || !name) {
      return NextResponse.json({ error: 'id and name are required' }, { status: 400 });
    }

    const section = await db.section.update({
      where: { id },
      data: {
        name,
        capacity: capacity ? Number(capacity) : undefined
      }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE_SECTION',
        details: `Updated section ${name}`
      });
    }

    return NextResponse.json({ data: section });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Section name already exists in this class' }, { status: 409 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const section = await db.section.findUnique({
      where: { id },
      include: { _count: { select: { students: true } } }
    });

    if (!section) {
      return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    }

    if (section._count.students > 0) {
      return NextResponse.json({ error: 'Cannot delete section with enrolled students' }, { status: 409 });
    }

    await db.section.delete({ where: { id } });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'DELETE_SECTION',
        details: `Deleted section ${section.name}`
      });
    }

    return NextResponse.json({ message: 'Section deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
