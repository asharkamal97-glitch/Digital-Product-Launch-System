import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const notices = await db.notice.findMany({
      orderBy: { publishDate: 'desc' },
    });
    return NextResponse.json({ notices });
  } catch (error: any) {
    console.error('Fetch notices error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notices' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { title, content, category, priority, targetAudience, expiryDate } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const notice = await db.notice.create({
      data: {
        title,
        content,
        category: category || 'GENERAL',
        priority: priority || 'NORMAL',
        targetAudience: targetAudience || 'ALL',
        publishDate: new Date(),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        isPublished: true,
        isActive: true,
      },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'NOTICE_PUBLISHED',
      `Published circular: "${title}" (${category})`
    );

    return NextResponse.json({ notice }, { status: 201 });
  } catch (error: any) {
    console.error('Create notice error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create notice' },
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
      return NextResponse.json(
        { error: 'Notice ID is required' },
        { status: 400 }
      );
    }

    await db.notice.delete({ where: { id } });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'NOTICE_DELETED',
      `Deleted circular ID ${id}`
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete notice error:', error);
    return NextResponse.json(
      { error: 'Failed to delete notice' },
      { status: 500 }
    );
  }
}
