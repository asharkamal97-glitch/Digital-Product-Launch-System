import { db } from './db';
import { getSession } from './auth';

export async function logAudit(
  arg1: any,
  arg2?: string,
  arg3?: string,
  arg4?: string,
  arg5?: string
) {
  try {
    let userId: string | null = null;
    let userName: string = 'System / Admin';
    let action: string = '';
    let details: string = '';
    let ipAddress: string = '127.0.0.1';

    if (typeof arg1 === 'object' && arg1 !== null) {
      // Called as logAudit({ action, details, userId, userName, ipAddress })
      const session = await getSession();
      userId = arg1.userId ?? session?.userId ?? null;
      userName = arg1.userName ?? session?.name ?? 'System / Admin';
      action = arg1.action || 'SYSTEM_ACTION';
      details = arg1.details || '';
      if (arg1.ipAddress) ipAddress = arg1.ipAddress;
    } else if (arg3 !== undefined && arg4 !== undefined) {
      // Called as logAudit(userId, userName, action, details, ipAddress)
      userId = arg1 || null;
      userName = arg2 || 'Admin';
      action = arg3;
      details = arg4;
      if (arg5) ipAddress = arg5;
    } else {
      // Called as logAudit(action, details, ipAddress)
      const session = await getSession();
      userId = session?.userId || null;
      userName = session?.name || 'System / Guest User';
      action = arg1 || 'SYSTEM_ACTION';
      details = arg2 || '';
      if (arg3) ipAddress = arg3;
    }

    await db.auditLog.create({
      data: {
        userId,
        userName,
        action,
        details,
        ipAddress,
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}
