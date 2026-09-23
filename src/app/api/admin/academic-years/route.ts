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

    const academicYears = await db.academicYear.findMany({
      include: {
        _count: {
          select: { enrollments: true, feeStructures: true, studentFees: true }
        }
      },
      orderBy: { startDate: 'desc' }
    });

    return NextResponse.json({ data: academicYears });
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
    const { name, startDate, endDate, isCurrent, status } = body;

    if (!name || !startDate || !endDate) {
      return NextResponse.json({ error: 'name, startDate, and endDate are required' }, { status: 400 });
    }

    if (isCurrent) {
      await db.academicYear.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false }
      });
    }

    const academicYear = await db.academicYear.create({
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isCurrent: Boolean(isCurrent),
        status: status || 'UPCOMING'
      }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'CREATE_ACADEMIC_YEAR',
        details: `Created academic year ${name}`
      });
    }

    return NextResponse.json({ data: academicYear }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Academic year name already exists' }, { status: 409 });
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
    const { id, name, startDate, endDate, isCurrent, status } = body;

    if (!id || !name || !startDate || !endDate) {
      return NextResponse.json({ error: 'id, name, startDate, and endDate are required' }, { status: 400 });
    }

    if (isCurrent) {
      await db.academicYear.updateMany({
        where: { isCurrent: true, id: { not: id } },
        data: { isCurrent: false }
      });
    }

    const academicYear = await db.academicYear.update({
      where: { id },
      data: {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isCurrent: Boolean(isCurrent),
        status: status || 'ACTIVE'
      }
    });

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE_ACADEMIC_YEAR',
        details: `Updated academic year ${name}`
      });
    }

    return NextResponse.json({ data: academicYear });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Academic year name already exists' }, { status: 409 });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const year = await db.academicYear.findUnique({ where: { id } });
    if (!year) {
      return NextResponse.json({ error: 'Academic year not found' }, { status: 404 });
    }

    await db.$transaction([
      db.academicYear.updateMany({
        where: { isCurrent: true },
        data: { isCurrent: false }
      }),
      db.academicYear.update({
        where: { id },
        data: { isCurrent: true, status: 'ACTIVE' }
      })
    ]);

    if (session.userId && session.name) {
      await logAudit({
        userId: session.userId,
        userName: session.name,
        action: 'ACTIVATE_ACADEMIC_YEAR',
        details: `Activated academic year ${year.name}`
      });
    }

    return NextResponse.json({ message: 'Active academic year switched successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
