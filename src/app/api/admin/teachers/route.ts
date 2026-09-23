import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession, hashPassword } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function GET() {
  try {
    const teachers = await db.teacher.findMany({
      include: { user: true },
      orderBy: { joiningDate: 'desc' },
    });
    return NextResponse.json({ success: true, teachers });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch teachers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || (session.role !== 'SUPER_ADMIN' && session.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, email, phone, employeeId, designation, qualification, subjectExpertise } = await req.json();

    if (!name || !employeeId || !designation || !subjectExpertise) {
      return NextResponse.json({ error: 'Missing required teacher fields' }, { status: 400 });
    }

    const username = `teacher.${employeeId.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const passwordHash = await hashPassword('teacher123');

    const user = await db.user.create({
      data: {
        username,
        email: email || `${username}@sarssiwan.com`,
        passwordHash,
        name,
        role: 'TEACHER',
        phone: phone || '+91 9006326786',
      },
    });

    const teacher = await db.teacher.create({
      data: {
        userId: user.id,
        employeeId: employeeId.trim().toUpperCase(),
        designation,
        qualification: qualification || 'B.Ed, Post Graduate',
        subjectExpertise,
        address: 'Staff Quarters, Baghra, Siwan',
      },
    });

    await logAudit('TEACHER_ADDED', `Teacher ${name} (${employeeId}) registered.`);

    return NextResponse.json({ success: true, teacher });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to add teacher' }, { status: 500 });
  }
}
