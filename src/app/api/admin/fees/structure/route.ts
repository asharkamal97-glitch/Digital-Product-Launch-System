import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

function computeYearlyAmount(amount: number, frequency: string) {
  switch (frequency) {
    case 'MONTHLY':
      return amount * 12;
    case 'QUARTERLY':
      return amount * 4;
    case 'HALF_YEARLY':
      return amount * 2;
    case 'ANNUALLY':
    case 'YEARLY':
    case 'ONE_TIME':
      return amount * 1;
    default:
      return amount;
  }
}

async function computeFeeTotals(items: any[]) {
  const categoryIds = items.map((i) => i.feeCategoryId);
  const categories = await db.feeCategory.findMany({
    where: { id: { in: categoryIds } },
  });
  const categoryMap = new Map(categories.map((c) => [c.id, c.code.toUpperCase()]));

  let tuitionFee = 0;
  let admissionFee = 0;
  let examFee = 0;
  let transportFee = 0;
  let computerFee = 0;
  let libraryFee = 0;
  let activityFee = 0;
  let hostelFee = 0;
  let otherFee = 0;
  let totalYearly = 0;

  for (const item of items) {
    const code = categoryMap.get(item.feeCategoryId);
    const yearly = computeYearlyAmount(item.amount, item.frequency);

    totalYearly += yearly;

    switch (code) {
      case 'TUITION':
        tuitionFee += yearly;
        break;
      case 'ADMISSION':
        admissionFee += yearly;
        break;
      case 'EXAM':
        examFee += yearly;
        break;
      case 'TRANSPORT':
        transportFee += yearly;
        break;
      case 'COMPUTER':
        computerFee += yearly;
        break;
      case 'LIBRARY':
        libraryFee += yearly;
        break;
      case 'HOSTEL':
        hostelFee += yearly;
        break;
      case 'ACTIVITY':
        activityFee += yearly;
        break;
      default:
        otherFee += yearly;
        break;
    }
  }

  return {
    tuitionFee,
    admissionFee,
    examFee,
    transportFee,
    computerFee,
    libraryFee,
    activityFee,
    hostelFee,
    otherFee,
    totalYearly,
  };
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const academicYearId = searchParams.get('academicYearId');
    const classId = searchParams.get('classId');
    const status = searchParams.get('status');

    const where: any = {};
    if (academicYearId) where.academicYearId = academicYearId;
    if (classId) where.classId = classId;
    
    if (status === 'active') {
      where.isActive = true;
    } else if (status === 'inactive') {
      where.isActive = false;
    }

    const feeStructures = await db.feeStructure.findMany({
      where,
      include: {
        academicYear: true,
        class: true,
        items: {
          include: {
            feeCategory: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const classes = await db.class.findMany({ orderBy: { name: 'asc' } });
    const academicYears = await db.academicYear.findMany({ orderBy: { name: 'desc' } });

    return NextResponse.json({
      feeStructures,
      classes,
      academicYears,
    });
  } catch (error: any) {
    console.error('Error fetching fee structures:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, academicYearId, classId, effectiveDate, items } = body;

    if (!name || !academicYearId || !classId || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields or items array is empty' }, { status: 400 });
    }

    for (const item of items) {
      if (item.amount < 0) {
        return NextResponse.json({ error: 'Amounts cannot be negative' }, { status: 400 });
      }
    }

    const classExists = await db.class.findUnique({ where: { id: classId } });
    if (!classExists) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }

    const ayExists = await db.academicYear.findUnique({ where: { id: academicYearId } });
    if (!ayExists) {
      return NextResponse.json({ error: 'Academic Year not found' }, { status: 404 });
    }

    const existing = await db.feeStructure.findUnique({
      where: {
        academicYearId_classId: {
          academicYearId,
          classId,
        },
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'A fee structure for this academic year and class already exists' }, { status: 409 });
    }

    const totals = await computeFeeTotals(items);

    const feeStructure = await db.feeStructure.create({
      data: {
        name,
        academicYearId,
        classId,
        effectiveDate: effectiveDate ? new Date(effectiveDate) : null,
        ...totals,
        items: {
          create: items.map((item: any) => ({
            feeCategoryId: item.feeCategoryId,
            amount: item.amount,
            frequency: item.frequency || 'MONTHLY',
            isOptional: item.isOptional || false,
            dueDate: item.dueDate ? new Date(item.dueDate) : null,
            description: item.description || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    await logAudit(
      session.userId,
      session.name || 'Admin',
      'CREATE_FEE_STRUCTURE',
      `Created fee structure ${feeStructure.id} for Class ${classExists.name} (${ayExists.name})`
    );

    return NextResponse.json({ feeStructure }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating fee structure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, isActive, effectiveDate, items } = body;

    if (!id || !items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Missing id or items array' }, { status: 400 });
    }

    const existingStructure = await db.feeStructure.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existingStructure) {
      return NextResponse.json({ error: 'Fee structure not found' }, { status: 404 });
    }

    for (const item of items) {
      if (item.amount < 0) {
        return NextResponse.json({ error: 'Amounts cannot be negative' }, { status: 400 });
      }
    }

    const totals = await computeFeeTotals(items);
    const itemIds = items.filter((i: any) => i.id).map((i: any) => i.id);

    const updatedStructure = await db.$transaction(async (tx) => {
      await tx.feeStructureItem.deleteMany({
        where: {
          feeStructureId: id,
          id: { notIn: itemIds },
        },
      });

      for (const item of items) {
        if (item.id) {
          await tx.feeStructureItem.update({
            where: { id: item.id },
            data: {
              feeCategoryId: item.feeCategoryId,
              amount: item.amount,
              frequency: item.frequency,
              isOptional: item.isOptional,
              dueDate: item.dueDate ? new Date(item.dueDate) : null,
              description: item.description,
            },
          });
        } else {
          await tx.feeStructureItem.create({
            data: {
              feeStructureId: id,
              feeCategoryId: item.feeCategoryId,
              amount: item.amount,
              frequency: item.frequency || 'MONTHLY',
              isOptional: item.isOptional || false,
              dueDate: item.dueDate ? new Date(item.dueDate) : null,
              description: item.description || null,
            },
          });
        }
      }

      return await tx.feeStructure.update({
        where: { id },
        data: {
          name: name !== undefined ? name : existingStructure.name,
          isActive: isActive !== undefined ? isActive : existingStructure.isActive,
          effectiveDate: effectiveDate ? new Date(effectiveDate) : existingStructure.effectiveDate,
          version: existingStructure.version + 1,
          ...totals,
        },
        include: {
          items: true,
        },
      });
    });

    await logAudit(
      session.userId,
      session.name || 'Admin',
      'UPDATE_FEE_STRUCTURE',
      `Updated fee structure ${id}. Old total: ${existingStructure.totalYearly}, New total: ${updatedStructure.totalYearly}`
    );

    return NextResponse.json({ feeStructure: updatedStructure });
  } catch (error: any) {
    console.error('Error updating fee structure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing fee structure ID' }, { status: 400 });
    }

    const structure = await db.feeStructure.findUnique({
      where: { id },
      include: {
        _count: {
          select: { studentFees: true },
        },
      },
    });

    if (!structure) {
      return NextResponse.json({ error: 'Fee structure not found' }, { status: 404 });
    }

    if (structure._count.studentFees > 0) {
      return NextResponse.json(
        { error: 'Cannot delete fee structure as it is linked to student fees' },
        { status: 409 }
      );
    }

    await db.feeStructure.update({
      where: { id },
      data: { isActive: false },
    });

    await logAudit(
      session.userId,
      session.name || 'Admin',
      'SOFT_DELETE_FEE_STRUCTURE',
      `Soft deleted fee structure ${id}`
    );

    return NextResponse.json({ success: true, message: 'Fee structure soft-deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting fee structure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
