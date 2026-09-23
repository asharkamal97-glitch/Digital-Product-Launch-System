import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const classId = searchParams.get('classId');

    const subjects = await db.subject.findMany({
      where: classId ? { classId } : undefined,
      include: { class: true },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({ data: subjects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, code, classId } = body;

    if (!name || !code || !classId) {
      return NextResponse.json({ error: 'name, code, and classId are required' }, { status: 400 });
    }

    const subject = await db.subject.create({
      data: { name, code, classId }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'CREATE_SUBJECT',
        details: `Created subject ${name}`
      });
    }

    return NextResponse.json({ data: subject }, { status: 201 });
  } catch (error: any) {
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
    const { id, name, code, classId } = body;

    if (!id || !name || !code || !classId) {
      return NextResponse.json({ error: 'id, name, code, and classId are required' }, { status: 400 });
    }

    const subject = await db.subject.update({
      where: { id },
      data: { name, code, classId }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE_SUBJECT',
        details: `Updated subject ${name}`
      });
    }

    return NextResponse.json({ data: subject });
  } catch (error: any) {
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

    const subject = await db.subject.findUnique({ where: { id } });
    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    await db.subject.delete({ where: { id } });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'DELETE_SUBJECT',
        details: `Deleted subject ${subject.name}`
      });
    }

    return NextResponse.json({ message: 'Subject deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
