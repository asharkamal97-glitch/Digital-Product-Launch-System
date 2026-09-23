export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'ACCOUNTANT'
  | 'TEACHER'
  | 'STUDENT'
  | 'PARENT';

export interface SchoolInfo {
  name: string;
  shortName: string;
  tagline: string;
  establishedYear: string;
  phone: string;
  altPhone: string;
  email: string;
  altEmail: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website: string;
  currentSession: string;
}

export interface StudentWithDetails {
  id: string;
  admissionNo: string;
  rollNo: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date | string;
  bloodGroup?: string | null;
  photoUrl?: string | null;
  class: {
    id: string;
    name: string;
  };
  section: {
    id: string;
    name: string;
  };
  parent?: {
    id: string;
    fatherName: string;
    motherName: string;
    emergencyContact: string;
    address: string;
  } | null;
  session: string;
  address: string;
  isResidential: boolean;
  hostelRoom?: string | null;
  status: string;
}

export interface FeeItemBreakdown {
  name: string;
  amount: number;
}

export interface InvoiceWithDetails {
  id: string;
  invoiceNo: string;
  studentId: string;
  title: string;
  session: string;
  dueDate: Date | string;
  subtotal: number;
  discount: number;
  lateFee: number;
  totalAmount: number;
  paidAmount: number;
  status: 'UNPAID' | 'PARTIAL' | 'PAID' | 'OVERDUE';
  items: {
    id: string;
    categoryName: string;
    amount: number;
  }[];
}

export interface ReceiptData {
  id: string;
  receiptNo: string;
  paymentId: string;
  studentId: string;
  receiptDate: Date | string;
  totalAmount: number;
  paymentMethod: string;
  studentDetails: {
    studentName: string;
    admissionNo: string;
    rollNo: string;
    className: string;
    sectionName: string;
    parentName: string;
    contact: string;
    address?: string;
  };
  feeBreakdown: FeeItemBreakdown[];
  verificationHash: string;
  qrCodeUrl?: string | null;
}
