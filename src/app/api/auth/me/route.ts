import { NextResponse } from 'next/server';
import { getCurrentUserProfile, getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const profile = await getCurrentUserProfile();
  return NextResponse.json({
    authenticated: true,
    session,
    user: profile,
  });
}
