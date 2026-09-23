import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admissionNo = searchParams.get('admissionNo');
    const studentId = searchParams.get('studentId');

    if (!admissionNo && !studentId) {
      return NextResponse.json(
        { error: 'Admission Number or Student ID is required' },
        { status: 400 }
      );
    }

    const student = await db.student.findFirst({
      where: {
        OR: [
          admissionNo ? { admissionNo: { equals: admissionNo.trim() } } : {},
          studentId ? { id: studentId } : {},
        ],
      },
      include: {
        class: true,
        section: true,
        parent: true,
        invoices: {
          include: {
            items: true,
            payments: {
              where: { status: 'SUCCESS' },
              include: { receipt: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: 'No student found matching the provided admission details' },
        { status: 404 }
      );
    }

    // Calculate Dues
    const unpaidInvoices = student.invoices.filter(
      (inv) => inv.status === 'UNPAID' || inv.status === 'PARTIAL'
    );
    const totalDue = unpaidInvoices.reduce(
      (acc, inv) => acc + (inv.totalAmount - inv.paidAmount),
      0
    );

    return NextResponse.json({
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        admissionNo: student.admissionNo,
        rollNo: student.rollNo,
        isResidential: student.isResidential,
        className: student.class.name,
        sectionName: student.section.name,
        fatherName: student.parent?.fatherName || 'Parent/Guardian',
        parentPhone: student.parent?.emergencyContact || '+91 9006326786',
        totalOutstandingDue: totalDue,
        invoices: student.invoices,
      },
    });
  } catch (error: any) {
    console.error('Fee lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to lookup student fee details' },
      { status: 500 }
    );
  }
}
