import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const categories = await db.feeCategory.findMany({
      include: {
        _count: {
          select: {
            feeStructureItems: true,
            studentFeeItems: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ categories });
  } catch (error: any) {
    console.error('Fetch fee categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fee categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { name, code, description, isDefault = true } = body;

    if (!name || !code) {
      return NextResponse.json(
        { error: 'Category name and code are required' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase().replace(/\s+/g, '_');

    // Check unique constraints
    const existing = await db.feeCategory.findFirst({
      where: {
        OR: [
          { name: { equals: name.trim() } },
          { code: { equals: cleanCode } },
        ],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Fee category with name "${name}" or code "${cleanCode}" already exists` },
        { status: 409 }
      );
    }

    const category = await db.feeCategory.create({
      data: {
        name: name.trim(),
        code: cleanCode,
        description: description?.trim() || null,
        isDefault: isDefault !== false,
      },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'FEE_CATEGORY_CREATED',
      `Created fee category ${category.name} (${category.code})`
    );

    return NextResponse.json({ category }, { status: 201 });
  } catch (error: any) {
    console.error('Create fee category error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create fee category' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { id, name, code, description, isDefault } = body;

    if (!id || !name || !code) {
      return NextResponse.json(
        { error: 'ID, name, and code are required' },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase().replace(/\s+/g, '_');

    // Check duplicate name or code with other records
    const conflict = await db.feeCategory.findFirst({
      where: {
        id: { not: id },
        OR: [
          { name: { equals: name.trim() } },
          { code: { equals: cleanCode } },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json(
        { error: `Another fee category with name "${name}" or code "${cleanCode}" already exists` },
        { status: 409 }
      );
    }

    const existing = await db.feeCategory.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Fee category not found' }, { status: 404 });
    }

    const updated = await db.feeCategory.update({
      where: { id },
      data: {
        name: name.trim(),
        code: cleanCode,
        description: description?.trim() || null,
        isDefault: isDefault !== undefined ? isDefault : existing.isDefault,
      },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'FEE_CATEGORY_UPDATED',
      `Updated fee category ${existing.name} -> ${updated.name} (${updated.code})`
    );

    return NextResponse.json({ category: updated });
  } catch (error: any) {
    console.error('Update fee category error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update fee category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    const category = await db.feeCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            feeStructureItems: true,
            studentFeeItems: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: 'Fee category not found' }, { status: 404 });
    }

    if (category._count.feeStructureItems > 0 || category._count.studentFeeItems > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete "${category.name}". It is currently assigned to ${category._count.feeStructureItems} fee structure items and ${category._count.studentFeeItems} student fee ledgers.`,
        },
        { status: 409 }
      );
    }

    await db.feeCategory.delete({ where: { id } });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'FEE_CATEGORY_DELETED',
      `Deleted fee category ${category.name} (${category.code})`
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete fee category error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete fee category' },
      { status: 500 }
    );
  }
}
