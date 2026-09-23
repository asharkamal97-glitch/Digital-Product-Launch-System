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

    const classes = await db.class.findMany({
      include: {
        sections: true,
        _count: {
          select: { students: true, subjects: true }
        }
      },
      orderBy: { numericLevel: 'asc' }
    });

    return NextResponse.json({ data: classes });
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
    const { name, numericLevel, description, createDefaultSection } = body;

    if (!name || numericLevel === undefined) {
      return NextResponse.json({ error: 'Name and numericLevel are required' }, { status: 400 });
    }

    const newClass = await db.class.create({
      data: {
        name,
        numericLevel: Number(numericLevel),
        description,
        ...(createDefaultSection !== false && {
          sections: {
            create: [{ name: 'A', capacity: 40 }]
          }
        })
      },
      include: { sections: true }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'CREATE_CLASS',
        details: `Created class ${name}`
      });
    }

    return NextResponse.json({ data: newClass }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Class name already exists' }, { status: 409 });
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
    const { id, name, numericLevel, description } = body;

    if (!id || !name || numericLevel === undefined) {
      return NextResponse.json({ error: 'ID, name, and numericLevel are required' }, { status: 400 });
    }

    const updatedClass = await db.class.update({
      where: { id },
      data: {
        name,
        numericLevel: Number(numericLevel),
        description
      }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE_CLASS',
        details: `Updated class ${name}`
      });
    }

    return NextResponse.json({ data: updatedClass });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Class name already exists' }, { status: 409 });
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

    const classData = await db.class.findUnique({
      where: { id },
      include: { _count: { select: { students: true } } }
    });

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    if (classData._count.students > 0) {
      return NextResponse.json({ error: 'Cannot delete class with enrolled students' }, { status: 409 });
    }

    await db.class.delete({ where: { id } });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'DELETE_CLASS',
        details: `Deleted class ${classData.name}`
      });
    }

    return NextResponse.json({ message: 'Class deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
