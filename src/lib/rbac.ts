import { getSession, AuthSession } from './auth';
import { NextResponse } from 'next/server';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'ACCOUNTANT'
  | 'TEACHER'
  | 'ADMISSION_STAFF'
  | 'STUDENT'
  | 'PARENT';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    'all',
    'manage_students',
    'manage_staff',
    'manage_academics',
    'manage_fees',
    'manage_payments',
    'manage_admissions',
    'manage_gallery',
    'manage_notices',
    'manage_settings',
    'view_audit_logs',
  ],
  ADMIN: [
    'manage_students',
    'manage_academics',
    'manage_fees',
    'manage_payments',
    'manage_admissions',
    'manage_gallery',
    'manage_notices',
    'manage_settings',
    'view_audit_logs',
  ],
  ACCOUNTANT: [
    'manage_students_read',
    'manage_fees',
    'manage_payments',
    'manage_receipts',
    'view_financial_reports',
    'view_audit_logs',
  ],
  TEACHER: [
    'manage_assigned_students',
    'mark_attendance',
    'manage_homework',
    'enter_marks',
    'view_notices',
  ],
  ADMISSION_STAFF: [
    'manage_admissions',
    'review_applications',
    'view_documents',
    'update_admission_status',
  ],
  STUDENT: [
    'view_own_profile',
    'view_own_attendance',
    'view_own_results',
    'view_own_fees',
    'pay_fees',
  ],
  PARENT: [
    'view_children_profile',
    'view_children_attendance',
    'view_children_results',
    'view_children_fees',
    'pay_fees',
  ],
};

export async function authorizeRequest(allowedRoles: UserRole[]): Promise<{
  authorized: boolean;
  session: AuthSession | null;
  response?: NextResponse;
}> {
  const session = await getSession();

  if (!session) {
    return {
      authorized: false,
      session: null,
      response: NextResponse.json(
        { error: 'Authentication required. Please log in.' },
        { status: 401 }
      ),
    };
  }

  const role = session.role as UserRole;
  if (!allowedRoles.includes(role) && role !== 'SUPER_ADMIN') {
    return {
      authorized: false,
      session,
      response: NextResponse.json(
        { error: `Access denied. Role "${role}" is not authorized for this operation.` },
        { status: 403 }
      ),
    };
  }

  return { authorized: true, session };
}
