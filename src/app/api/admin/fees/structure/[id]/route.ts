import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    const feeStructure = await db.feeStructure.findUnique({
      where: { id },
      include: {
        academicYear: true,
        class: true,
        items: {
          include: {
            feeCategory: true,
          },
        },
      },
    });

    if (!feeStructure) {
      return NextResponse.json({ error: 'Fee structure not found' }, { status: 404 });
    }

    return NextResponse.json({ feeStructure });
  } catch (error: any) {
    console.error('Error fetching fee structure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { isActive } = body;

    if (isActive === undefined) {
      return NextResponse.json({ error: 'Missing isActive in body' }, { status: 400 });
    }

    const existingStructure = await db.feeStructure.findUnique({
      where: { id },
    });

    if (!existingStructure) {
      return NextResponse.json({ error: 'Fee structure not found' }, { status: 404 });
    }

    const updatedStructure = await db.feeStructure.update({
      where: { id },
      data: { isActive },
    });

    await logAudit(
      session.userId,
      session.name || 'Admin',
      'TOGGLE_FEE_STRUCTURE_STATUS',
      `Toggled fee structure ${id} status to ${isActive ? 'Active' : 'Inactive'}`
    );

    return NextResponse.json({ feeStructure: updatedStructure });
  } catch (error: any) {
    console.error('Error toggling fee structure status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { targetAcademicYearId, targetClassId, newName } = body;

    if (!targetAcademicYearId || !targetClassId || !newName) {
      return NextResponse.json({ error: 'Missing required fields for duplication' }, { status: 400 });
    }

    // Check if target structure already exists
    const existingTarget = await db.feeStructure.findUnique({
      where: {
        academicYearId_classId: {
          academicYearId: targetAcademicYearId,
          classId: targetClassId,
        },
      },
    });

    if (existingTarget) {
      return NextResponse.json({ error: 'A fee structure for the target academic year and class already exists' }, { status: 409 });
    }

    // Fetch original structure
    const sourceStructure = await db.feeStructure.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!sourceStructure) {
      return NextResponse.json({ error: 'Source fee structure not found' }, { status: 404 });
    }

    // Create new structure
    const duplicatedStructure = await db.feeStructure.create({
      data: {
        academicYearId: targetAcademicYearId,
        classId: targetClassId,
        name: newName,
        session: sourceStructure.session,
        tuitionFee: sourceStructure.tuitionFee,
        admissionFee: sourceStructure.admissionFee,
        examFee: sourceStructure.examFee,
        transportFee: sourceStructure.transportFee,
        computerFee: sourceStructure.computerFee,
        libraryFee: sourceStructure.libraryFee,
        activityFee: sourceStructure.activityFee,
        hostelFee: sourceStructure.hostelFee,
        otherFee: sourceStructure.otherFee,
        totalYearly: sourceStructure.totalYearly,
        isActive: true,
        version: 1,
        items: {
          create: sourceStructure.items.map((item: any) => ({
            feeCategoryId: item.feeCategoryId,
            amount: item.amount,
            frequency: item.frequency,
            isOptional: item.isOptional,
            description: item.description,
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
      'DUPLICATE_FEE_STRUCTURE',
      `Duplicated fee structure ${id} to new structure ${duplicatedStructure.id}`
    );

    return NextResponse.json({ feeStructure: duplicatedStructure }, { status: 201 });
  } catch (error: any) {
    console.error('Error duplicating fee structure:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
