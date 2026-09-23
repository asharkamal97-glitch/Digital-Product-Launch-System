import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const items = await db.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ items });
  } catch (error: any) {
    console.error('Fetch gallery error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { title, description, category, imageUrl, caption, isPublished } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and Image URL are required' },
        { status: 400 }
      );
    }

    const item = await db.galleryItem.create({
      data: {
        title,
        description: description || caption || '',
        category: category || 'CAMPUS',
        imageUrl,
        caption: caption || '',
        isPublished: isPublished !== false,
        uploadedById: session?.userId || null,
      },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'GALLERY_IMAGE_UPLOADED',
      `Added gallery item "${title}" to category ${category}`
    );

    return NextResponse.json({ item }, { status: 201 });
  } catch (error: any) {
    console.error('Create gallery item error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { id, isPublished, title, category } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Gallery item ID is required' },
        { status: 400 }
      );
    }

    const item = await db.galleryItem.update({
      where: { id },
      data: {
        ...(typeof isPublished === 'boolean' && { isPublished }),
        ...(title && { title }),
        ...(category && { category }),
      },
    });

    return NextResponse.json({ item });
  } catch (error: any) {
    console.error('Update gallery item error:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery item' },
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
        { error: 'Gallery item ID is required' },
        { status: 400 }
      );
    }

    await db.galleryItem.delete({
      where: { id },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'GALLERY_IMAGE_DELETED',
      `Deleted gallery item ID ${id}`
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete gallery item error:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
}
