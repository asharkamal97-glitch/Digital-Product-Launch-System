import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth';
import { logAudit } from '@/lib/audit';

export async function POST() {
  await logAudit('USER_LOGOUT', 'User logged out.');
  await clearAuthCookie();
  return NextResponse.json({ success: true });
}
