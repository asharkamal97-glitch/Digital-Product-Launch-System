import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany({
      where: {
        role: { in: ['SUPER_ADMIN', 'ADMIN', 'ACCOUNTANT', 'TEACHER', 'ADMISSION_STAFF'] },
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { role: 'asc' },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Fetch staff error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { name, username, email, phone, role, password } = body;

    if (!name || !username || !password || !role) {
      return NextResponse.json(
        { error: 'Name, Username, Password, and Role are required' },
        { status: 400 }
      );
    }

    const existing = await db.user.findUnique({
      where: { username: username.trim().toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: `Username "${username}" already exists.` },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        username: username.trim().toLowerCase(),
        email: email || null,
        phone: phone || null,
        role,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Super Admin',
      'STAFF_CREATED',
      `Created staff user ${name} (${username}) with role ${role}`
    );

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    console.error('Create staff error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create staff account' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { userId, newPassword } = body;

    if (!userId || !newPassword) {
      return NextResponse.json(
        { error: 'User ID and new password are required' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    const user = await db.user.update({
      where: { id: userId },
      data: { passwordHash },
      select: { id: true, name: true, username: true },
    });

    await logAudit(
      session?.userId || null,
      session?.name || 'Super Admin',
      'STAFF_PASSWORD_RESET',
      `Reset password for staff user ${user.name} (${user.username})`
    );

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Reset staff password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
