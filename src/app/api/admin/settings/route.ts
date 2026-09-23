import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    let settings = await db.schoolSettings.findUnique({
      where: { id: 'sars-settings-main' },
    });

    if (!settings) {
      settings = await db.schoolSettings.create({
        data: { id: 'sars-settings-main' },
      });
    }

    return NextResponse.json({ settings });
  } catch (error: any) {
    console.error('Fetch settings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();

    const settings = await db.schoolSettings.upsert({
      where: { id: 'sars-settings-main' },
      update: { ...body, id: 'sars-settings-main' },
      create: { ...body, id: 'sars-settings-main' },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Admin',
      'SETTINGS_UPDATED',
      'Updated school institutional branding and contact settings'
    );

    return NextResponse.json({ settings });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}
