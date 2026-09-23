import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword, setAuthCookie } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();

    // Find User by username or email or admission number
    const user = await db.user.findFirst({
      where: {
        OR: [
          { username: cleanUsername },
          { email: cleanUsername },
          { student: { admissionNo: cleanUsername.toUpperCase() } },
          { teacher: { employeeId: cleanUsername.toUpperCase() } },
        ],
      },
      include: {
        student: true,
        teacher: true,
        parent: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid username, ID, or password' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated. Please contact school administration.' },
        { status: 403 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid username, ID, or password' },
        { status: 401 }
      );
    }

    const session = {
      userId: user.id,
      username: user.username,
      role: user.role as any,
      name: user.name,
      email: user.email,
    };

    await setAuthCookie(session);
    await logAudit('USER_LOGIN', `User ${user.username} (${user.role}) logged in successfully.`);

    return NextResponse.json({
      success: true,
      user: session,
      redirectUrl:
        user.role === 'SUPER_ADMIN' || user.role === 'ADMIN'
          ? '/portal/admin'
          : user.role === 'ACCOUNTANT'
          ? '/portal/accountant'
          : user.role === 'TEACHER'
          ? '/portal/teacher'
          : user.role === 'PARENT'
          ? '/portal/parent'
          : '/portal/student',
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
