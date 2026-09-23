# 🏫 Shabab Ashraf Residential School (SARS) — Modern Website & School Management Portal

> **A production-ready, full-stack institutional web platform and School Management ERP for Shabab Ashraf Residential School (SARS), Baghra, Siwan, Bihar (Estd. 2001).**

---

## 🌟 Overview & Key Architecture Highlights

This repository contains the complete modern web ecosystem for **Shabab Ashraf Residential School (SARS)**, combining a **public school website** and a **Role-Based School Management Portal** for School Administrators, Accounts/Finance staff, Teachers, Admission officers, Students, and Parents.

### 🌐 1. Public School Website
- **Cinematic Homepage (`/`)**: Hero section with session 2026–2027 admissions highlights, live announcements ticker, Principal's message, academic pillars, residential facilities, and campus map.
- **Institutional Pages**:
  - `About Us` (`/about`): School history since 2001, vision, leadership, and code of conduct.
  - `Academics` (`/academics`): Foundational, Primary, Middle, Secondary (Nursery to Class 10), CBSE curriculum mapping.
  - `Online Admissions` (`/admission` & `/admissions`): Multi-step application wizard, unique registration number generation (`SARS-2026-REG-XXXXXX`), and real-time tracking.
  - `Facilities & Living` (`/facilities`): Smart classrooms, science/computer laboratories, residential hostels, and bus routes.
  - `Photo Gallery` (`/gallery`): High-resolution categorized photo albums (Campus, Classrooms, Hostels, Sports, Events).
  - `Notice Board` (`/notices`): Real-time searchable circulars with priority tags (Normal, High, Urgent).
  - `Annual Events` (`/events`): Sports galas, Science & Robotics fairs, and PTM conferences.
  - `Contact & Helpdesk` (`/contact`): Direct phone helplines, visiting hours, and interactive enquiry dispatch.

### 💳 2. Online Fee Payment & Tamper-Proof Receipts
- **Instant Student Fee Lookup (`/fees/pay` & `/pay-fees`)**: Search by Admission No (e.g. `SARS-2026-001`) or Student Name.
- **Itemized Fee Ledger**: Tuition, Smart Class, Hostel/Residential, Exam, and Admission fees calculated strictly server-side.
- **Integrated Payment Gateway Architecture**: Secured Razorpay / UPI order creation with HMAC-SHA256 signature verification, webhook processing (`/api/payments/webhook`), and sandbox demo mode.
- **Official Electronic Receipts**: Auto-generated printable receipts with unique receipt numbers (`SARS-2026-XXXXXX`), digital signatures, and cryptographic QR verification.
- **Public QR Verification (`/verify/receipt/[id]`)**: Tamper-proof real-time verification of any issued fee receipt.

### 🎓 3. Dedicated Admin Portal (`/admin` and `/portal/admin`)
- **Dashboard Overview (`/admin`)**:
  - 8 Institutional KPI counters (Total Students, Active Students, Pending Admissions, Today's Payments, Total Fees Collected, Outstanding Dues, Classes Configured, Active Session).
  - Recent Payments and Recent Online Admission Registrations tables.
- **Student Management (`/admin/students` & `/admin/students/[id]`)**:
  - Full student registry with Name, Admission No, Roll No search and Class filters.
  - Student Profile view with Personal, Academic, Parent, and Fee Ledger history.
  - Add New Student modal with automatic login credentials generation.
  - CSV Export & Import support.
- **Parents & Guardians Directory (`/admin/parents`)**:
  - Guardian contact directory, emergency numbers, and enrolled wards overview.
- **Classes & Sections Management (`/admin/classes`)**:
  - Class levels (Nursery - Class 10), sections (A, B), capacities, and subject allocations.
- **Academic Years & Sessions (`/admin/academic-years`)**:
  - Multi-year session management (`2026-27`), active session switcher, and non-destructive student promotions.
- **Fee Structure Master (`/admin/fees/structure`)**:
  - Dynamic fee management by Academic Year and Class across all Fee Categories (Tuition, Admission, Hostel, Computer, Exam, Library, Development). No hard-coded fees.
- **Student Fee Assignments (`/admin/fees/student`)**:
  - Fee assignments, scholarship concessions, discounts, late fee adjustments, and payment balances.
- **Payment Transactions (`/admin/payments`)**:
  - Complete transaction ledger with gateway order IDs, payment IDs, and webhook verification logs.
- **Official Receipts Registry (`/admin/receipts`)**:
  - Search, view, print, and PDF download of official electronic receipts with QR codes.
- **Admissions Desk (`/admin/admissions`)**:
  - Review online student registrations (`SARS-2026-REG-XXXXXX`), document previews, and status workflows (`SUBMITTED`, `UNDER_REVIEW`, `DOCUMENTS_REQUIRED`, `APPROVED`, `REJECTED`, `ADMITTED`).
- **Gallery & Media Manager (`/admin/gallery`)**:
  - Categorized photo manager with safe server-side file upload (`/api/upload`), captions, and publish/unpublish toggles.
- **Notice Board Circulars (`/admin/notices`)**:
  - Circular publisher with category, priority, audience, and expiry dates.
- **Staff & Role Access Directory (`/admin/staff`)**:
  - Staff management with role assignments (`SUPER_ADMIN`, `ADMIN`, `ACCOUNTANT`, `TEACHER`, `ADMISSION_STAFF`) and bcrypt password reset.
- **Financial & Academic Reports (`/admin/reports`)**:
  - Revenue breakdowns, class enrollment distribution charts, and fee defaulters watchlist.
- **Website CMS Settings (`/admin/settings`)**:
  - Live configuration of school name, helplines, email, campus address, principal's message, and receipt prefix.
- **Security Audit Logs (`/admin/audit-logs`)**:
  - Cryptographically timestamped audit trail tracking authentication, fee modifications, admissions, and financial events.

---

## 🔑 Demo Login Credentials

The database comes pre-seeded with realistic institutional accounts. You can sign in at [`/login`](/login) or use the **Quick 1-Click Demo Buttons**:

| Role | Username | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin` | `admin123` | Full Institutional Control, Staff & Settings |
| **School Admin** | `admin` | `admin123` | Student, Classes, Admission & Certificate Desk |
| **Accountant** | `accountant` | `admin123` | Fee Structures, Ledgers, Payments & Receipts |
| **Admission Staff** | `admission` | `admin123` | Online Registration Desk & Document Review |
| **Teacher** | `teacher.vikram` | `teacher123` | Attendance Marking & Homework Assignments |
| **Student** | `sars2026001` | `student123` | Student Results, Attendance & Fee Invoices |
| **Parent** | `parent.arun` | `parent123` | Multi-Child Academic Monitor & Online Fee Pay |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with institutional color tokens (Deep Navy `#0F2851`, Gold `#D97706`, Emerald `#059669`)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite (zero-config, plug-and-play with PostgreSQL/MySQL in production)
- **Security & Authentication**: JWT session tokens signed with `jsonwebtoken`, HTTP-only cookies, password hashing via `bcryptjs`, and server-side RBAC guard (`src/lib/rbac.ts`)
- **Payment Architecture**: Razorpay SDK & Webhook Verification with HMAC-SHA256 signature checking
- **Icons & Graphics**: [Lucide React](https://lucide.dev/), Canvas Confetti
- **QR Code Engine**: `qrcode` with SVG and DataURL verification generation

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.17+ or v20+ LTS)
- npm or yarn / pnpm

### 1. Installation
```bash
git clone <repo-url>
cd sarsweb
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` (already pre-configured for local development):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sars-residential-school-jwt-secret-key-siwan-bihar-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_SARS2026Sandbox"
RAZORPAY_KEY_SECRET="mock_secret_sars_razorpay_test"
MOCK_PAYMENT_MODE="true"
```

### 3. Initialize Database & Seed Demo Data
```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Type Checking & Verification
```bash
npx tsc --noEmit
```

---

## 🏛️ Institutional Information

- **Institution**: Shabab Ashraf Residential School (SARS)
- **Established**: 2001
- **Location**: Village Baghra, Post Khalishpur (Near Suta Factory, Badli-Hasuwa Road), Siwan Sadar, Bihar - 841226, India
- **Helplines**: +91-9006326786, +91-7543073786, +91-7479600063
- **Official Email**: `sars.baghra@gmail.com` / `info@sarssiwan.com`
- **Affiliation / Pattern**: CBSE Pattern English-Medium Co-Educational Residential School (Nursery to Class 10)

---

## 📄 License
Built for Shabab Ashraf Residential School. All rights reserved.
