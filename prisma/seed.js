const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Shabab Ashraf Residential School database...');

  // 1. School Settings
  await prisma.schoolSettings.upsert({
    where: { id: 'sars-settings-main' },
    update: {},
    create: {
      id: 'sars-settings-main',
      name: 'Shabab Ashraf Residential School',
      shortName: 'SARS',
      tagline: 'Excellence in Education & Character Building',
      establishedYear: '2001',
      phone: '+91 9006326786',
      altPhone: '+91 7543073786, +91 7479600063',
      email: 'sars.baghra@gmail.com',
      altEmail: 'info@sarssiwan.com',
      address: 'Village Baghra, Post Khalishpur, Badli-Hasuwa Road',
      city: 'Siwan',
      state: 'Bihar',
      pincode: '841226',
      website: 'https://sarssiwan.com',
      logoUrl: '/images/sars-logo.png',
      principalName: 'Dr. Shabab Ashraf',
      principalMessage: 'At SARS, we nurture intellect, ethical character, and discipline in an inspiring residential environment.',
      currentSession: '2026-27',
      currency: 'INR',
      currencySymbol: '₹',
      lateFeePerDay: 10,
      receiptPrefix: 'SARS-2026-',
      facebookUrl: 'https://facebook.com/sarssiwan',
      youtubeUrl: 'https://youtube.com/@sarssiwan',
      instagramUrl: 'https://instagram.com/sarssiwan',
    },
  });

  const defaultPasswordHash = await bcrypt.hash('admin123', 10);
  const studentPasswordHash = await bcrypt.hash('student123', 10);
  const teacherPasswordHash = await bcrypt.hash('teacher123', 10);
  const parentPasswordHash = await bcrypt.hash('parent123', 10);

  // 2. Academic Years
  const academicYear2026 = await prisma.academicYear.upsert({
    where: { name: '2026-27' },
    update: { isCurrent: true, status: 'ACTIVE' },
    create: {
      name: '2026-27',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isCurrent: true,
      status: 'ACTIVE',
    },
  });

  const academicYear2025 = await prisma.academicYear.upsert({
    where: { name: '2025-26' },
    update: { isCurrent: false, status: 'ARCHIVED' },
    create: {
      name: '2025-26',
      startDate: new Date('2025-04-01'),
      endDate: new Date('2026-03-31'),
      isCurrent: false,
      status: 'ARCHIVED',
    },
  });

  // 3. Fee Categories
  const feeCategoriesData = [
    { name: 'Tuition Fee', code: 'TUITION', desc: 'Core academic instructional fee', default: true },
    { name: 'Admission Fee', code: 'ADMISSION', desc: 'One-time registration & admission fee', default: true },
    { name: 'Hostel & Mess Fee', code: 'HOSTEL', desc: 'Residential lodging, laundry, and meals', default: true },
    { name: 'Transport Fee', code: 'TRANSPORT', desc: 'School bus commuting fee', default: true },
    { name: 'Examination Fee', code: 'EXAM', desc: 'Term and annual assessment materials fee', default: true },
    { name: 'Computer & Smart Lab Fee', code: 'COMPUTER', desc: 'IT workstation and smart board maintenance', default: true },
    { name: 'Library & Reading Room Fee', code: 'LIBRARY', desc: 'Book loans and periodical subscriptions', default: true },
    { name: 'Development & Sports Fee', code: 'DEVELOPMENT', desc: 'Infrastructure and athletics maintenance', default: true },
    { name: 'Other Fee', code: 'OTHER', desc: 'Miscellaneous institutional charges', default: false },
  ];

  const createdFeeCategories = {};
  for (const cat of feeCategoriesData) {
    const fc = await prisma.feeCategory.upsert({
      where: { code: cat.code },
      update: {},
      create: {
        name: cat.name,
        code: cat.code,
        description: cat.desc,
        isDefault: cat.default,
      },
    });
    createdFeeCategories[cat.code] = fc;
  }

  // 4. Gallery Categories
  const galleryCategoriesData = [
    { name: 'Campus & Grounds', slug: 'campus', desc: 'Main academic block, gardens, and playgrounds' },
    { name: 'Classrooms & Smart Labs', slug: 'classrooms', desc: 'Smart boards and teaching environments' },
    { name: 'Science & Computer Labs', slug: 'laboratories', desc: 'Physics, chemistry, and coding stations' },
    { name: 'Residential Hostels', slug: 'hostel', desc: 'Hostel dormitories and dining hall' },
    { name: 'Sports & Athletics', slug: 'sports', desc: 'Football, cricket, and annual athletics meet' },
    { name: 'Events & Functions', slug: 'events', desc: 'Republic day, science fair, and cultural events' },
    { name: 'Faculty & Mentors', slug: 'faculty', desc: 'Educators and administrative staff' },
    { name: 'Other Facilities', slug: 'other', desc: 'Transport fleet, library, and medical room' },
  ];

  for (const gc of galleryCategoriesData) {
    await prisma.galleryCategory.upsert({
      where: { slug: gc.slug },
      update: {},
      create: {
        name: gc.name,
        slug: gc.slug,
        description: gc.desc,
      },
    });
  }

  // 5. Core Users (Super Admin, Admin, Accountant, Admission Staff)
  const superAdmin = await prisma.user.upsert({
    where: { username: 'superadmin' },
    update: {},
    create: {
      username: 'superadmin',
      email: 'admin@sarssiwan.com',
      passwordHash: defaultPasswordHash,
      name: 'Dr. S. Ashraf (Principal)',
      role: 'SUPER_ADMIN',
      phone: '+91 9006326786',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'office@sarssiwan.com',
      passwordHash: defaultPasswordHash,
      name: 'SARS Administrative Office',
      role: 'ADMIN',
      phone: '+91 7543073786',
    },
  });

  const accountantUser = await prisma.user.upsert({
    where: { username: 'accountant' },
    update: {},
    create: {
      username: 'accountant',
      email: 'accounts@sarssiwan.com',
      passwordHash: defaultPasswordHash,
      name: 'Md. Tariq (Accounts Officer)',
      role: 'ACCOUNTANT',
      phone: '+91 7479600063',
    },
  });

  const admissionStaffUser = await prisma.user.upsert({
    where: { username: 'admission' },
    update: {},
    create: {
      username: 'admission',
      email: 'admissions@sarssiwan.com',
      passwordHash: defaultPasswordHash,
      name: 'S. K. Singh (Admissions Officer)',
      role: 'ADMISSION_STAFF',
      phone: '+91 9006326786',
    },
  });

  // 6. Transport Routes
  const route1 = await prisma.transportRoute.create({
    data: {
      routeName: 'Siwan Town - Baghra Main Route',
      vehicleNo: 'BR-29-PA-1045',
      driverName: 'Rameshwar Yadav',
      driverPhone: '+91 9835012345',
      pickupPointsJson: JSON.stringify([
        'Siwan Junction',
        'Bhatwalia Mor',
        'Suta Factory',
        'Khalishpur Chowk',
        'SARS Campus Baghra',
      ]),
      monthlyFee: 1200,
    },
  });

  const route2 = await prisma.transportRoute.create({
    data: {
      routeName: 'Badli - Hasuwa Express Line',
      vehicleNo: 'BR-29-PA-2289',
      driverName: 'Mohammad Shamim',
      driverPhone: '+91 9431098765',
      pickupPointsJson: JSON.stringify([
        'Hasuwa Bazaar',
        'Badli Chowk',
        'Rampur Turn',
        'SARS Campus Baghra',
      ]),
      monthlyFee: 1000,
    },
  });

  // 7. Classes, Sections & Subjects
  const classNames = [
    { name: 'Nursery', level: 0 },
    { name: 'LKG', level: 0 },
    { name: 'UKG', level: 0 },
    { name: 'Class 1', level: 1 },
    { name: 'Class 2', level: 2 },
    { name: 'Class 3', level: 3 },
    { name: 'Class 4', level: 4 },
    { name: 'Class 5', level: 5 },
    { name: 'Class 6', level: 6 },
    { name: 'Class 7', level: 7 },
    { name: 'Class 8', level: 8 },
    { name: 'Class 9', level: 9 },
    { name: 'Class 10', level: 10 },
  ];

  const createdClasses = {};
  for (const c of classNames) {
    const cls = await prisma.class.upsert({
      where: { name: c.name },
      update: {},
      create: {
        name: c.name,
        numericLevel: c.level,
        description: `${c.name} Standard Curriculum - CBSE Pattern`,
      },
    });
    createdClasses[c.name] = cls;

    // Create Sections A and B
    await prisma.section.upsert({
      where: { classId_name: { classId: cls.id, name: 'A' } },
      update: {},
      create: { name: 'A', classId: cls.id, capacity: 40 },
    });
    await prisma.section.upsert({
      where: { classId_name: { classId: cls.id, name: 'B' } },
      update: {},
      create: { name: 'B', classId: cls.id, capacity: 40 },
    });

    // Create Standard Subjects
    const standardSubjects = [
      { name: 'Mathematics', code: `MATH-${c.level}` },
      { name: 'Science & EVS', code: `SCI-${c.level}` },
      { name: 'English Language & Lit', code: `ENG-${c.level}` },
      { name: 'Hindi', code: `HIN-${c.level}` },
      { name: 'Social Studies', code: `SST-${c.level}` },
      { name: 'Computer Applications', code: `COMP-${c.level}` },
    ];

    for (const sub of standardSubjects) {
      await prisma.subject.create({
        data: {
          name: sub.name,
          code: sub.code,
          classId: cls.id,
        },
      });
    }

    // Create Fee Structure for this Class in 2026-27
    const baseTuition = 1500 + c.level * 200;
    const feeStruct = await prisma.feeStructure.upsert({
      where: { academicYearId_classId: { academicYearId: academicYear2026.id, classId: cls.id } },
      update: {},
      create: {
        academicYearId: academicYear2026.id,
        classId: cls.id,
        name: `${c.name} Standard Fee (2026-27)`,
        session: '2026-27',
        tuitionFee: baseTuition,
        admissionFee: 3000,
        examFee: 800,
        computerFee: 400,
        libraryFee: 300,
        activityFee: 500,
        hostelFee: 4500,
        otherFee: 200,
        totalYearly: baseTuition * 12 + 3000 + 800 + 400 + 300 + 500,
        isActive: true,
      },
    });

    // Create items for fee structure
    await prisma.feeStructureItem.createMany({
      data: [
        { feeStructureId: feeStruct.id, feeCategoryId: createdFeeCategories['TUITION'].id, amount: baseTuition, frequency: 'MONTHLY' },
        { feeStructureId: feeStruct.id, feeCategoryId: createdFeeCategories['ADMISSION'].id, amount: 3000, frequency: 'ONE_TIME' },
        { feeStructureId: feeStruct.id, feeCategoryId: createdFeeCategories['EXAM'].id, amount: 800, frequency: 'QUARTERLY' },
        { feeStructureId: feeStruct.id, feeCategoryId: createdFeeCategories['COMPUTER'].id, amount: 400, frequency: 'MONTHLY' },
        { feeStructureId: feeStruct.id, feeCategoryId: createdFeeCategories['LIBRARY'].id, amount: 300, frequency: 'ANNUALLY' },
        { feeStructureId: feeStruct.id, feeCategoryId: createdFeeCategories['HOSTEL'].id, amount: 4500, frequency: 'MONTHLY', isOptional: true },
      ],
    });
  }

  // 8. Teachers
  const teachersData = [
    {
      name: 'Vikramaditya Sharma',
      username: 'teacher.vikram',
      email: 'vikram.sharma@sarssiwan.com',
      empId: 'SARS-T-001',
      designation: 'Senior Faculty - Mathematics',
      qualification: 'M.Sc. Mathematics, B.Ed.',
      subject: 'Mathematics',
      phone: '+91 9835100001',
    },
    {
      name: 'Anjali Verma',
      username: 'teacher.anjali',
      email: 'anjali.verma@sarssiwan.com',
      empId: 'SARS-T-002',
      designation: 'Faculty - English & Literature',
      qualification: 'M.A. English, B.Ed.',
      subject: 'English Language & Lit',
      phone: '+91 9835100002',
    },
    {
      name: 'Dr. Rajesh Kumar Pandey',
      username: 'teacher.rajesh',
      email: 'rajesh.pandey@sarssiwan.com',
      empId: 'SARS-T-003',
      designation: 'Head of Science Department',
      qualification: 'Ph.D. Physics, M.Sc., B.Ed.',
      subject: 'Science & EVS',
      phone: '+91 9835100003',
    },
    {
      name: 'Syed Arshad Ali',
      username: 'teacher.arshad',
      email: 'arshad.ali@sarssiwan.com',
      empId: 'SARS-T-004',
      designation: 'Senior Teacher - Social Science',
      qualification: 'M.A. History, B.Ed.',
      subject: 'Social Studies',
      phone: '+91 9835100004',
    },
    {
      name: 'Pooja Srivastava',
      username: 'teacher.pooja',
      email: 'pooja.srivastava@sarssiwan.com',
      empId: 'SARS-T-005',
      designation: 'Computer Science Instructor',
      qualification: 'MCA, B.Tech CS',
      subject: 'Computer Applications',
      phone: '+91 9835100005',
    },
  ];

  for (const t of teachersData) {
    const user = await prisma.user.upsert({
      where: { username: t.username },
      update: {},
      create: {
        username: t.username,
        email: t.email,
        passwordHash: teacherPasswordHash,
        name: t.name,
        role: 'TEACHER',
        phone: t.phone,
      },
    });

    await prisma.teacher.upsert({
      where: { employeeId: t.empId },
      update: {},
      create: {
        userId: user.id,
        employeeId: t.empId,
        designation: t.designation,
        qualification: t.qualification,
        subjectExpertise: t.subject,
        address: 'Staff Quarters, Baghra, Siwan',
        emergencyContact: '+91 9006326786',
      },
    });
  }

  // 9. Parents & Students (20 Realistic Profiles)
  const parentsData = [
    {
      father: 'Arun Kumar Singh',
      mother: 'Sunita Singh',
      username: 'parent.arun',
      phone: '+91 9431200001',
      address: 'Near Gandhi Maidan, Siwan',
      occupation: 'Government Service',
    },
    {
      father: 'Mohd. Iqbal Ansari',
      mother: 'Farzana Khatoon',
      username: 'parent.iqbal',
      phone: '+91 9431200002',
      address: 'Bhatwalia, Siwan',
      occupation: 'Businessman',
    },
    {
      father: 'Ramesh Chandra Gupta',
      mother: 'Anita Gupta',
      username: 'parent.ramesh',
      phone: '+91 9431200003',
      address: 'Main Road, Khalishpur, Siwan',
      occupation: 'Pharmacist',
    },
    {
      father: 'Suresh Prasad Yadav',
      mother: 'Kiran Devi',
      username: 'parent.suresh',
      phone: '+91 9431200004',
      address: 'Badli Village, Siwan',
      occupation: 'Agriculture & Business',
    },
    {
      father: 'Dr. Manoj Mishra',
      mother: 'Dr. Rashmi Mishra',
      username: 'parent.manoj',
      phone: '+91 9431200005',
      address: 'Hospital Road, Siwan',
      occupation: 'Medical Practitioner',
    },
  ];

  const createdParents = [];
  for (const p of parentsData) {
    const user = await prisma.user.upsert({
      where: { username: p.username },
      update: {},
      create: {
        username: p.username,
        email: `${p.username}@gmail.com`,
        passwordHash: parentPasswordHash,
        name: `${p.father} & ${p.mother}`,
        role: 'PARENT',
        phone: p.phone,
      },
    });

    const parent = await prisma.parent.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        fatherName: p.father,
        motherName: p.mother,
        occupation: p.occupation,
        address: p.address,
        emergencyContact: p.phone,
      },
    });
    createdParents.push(parent);
  }

  const sampleStudents = [
    { first: 'Aarav', last: 'Singh', gender: 'Male', class: 'Class 10', roll: '01', adm: 'SARS-2026-001', parentIdx: 0, res: true, route: null },
    { first: 'Zainab', last: 'Ansari', gender: 'Female', class: 'Class 10', roll: '02', adm: 'SARS-2026-002', parentIdx: 1, res: false, route: route1.id },
    { first: 'Rohan', last: 'Gupta', gender: 'Male', class: 'Class 9', roll: '01', adm: 'SARS-2026-003', parentIdx: 2, res: true, route: null },
    { first: 'Priya', last: 'Yadav', gender: 'Female', class: 'Class 9', roll: '02', adm: 'SARS-2026-004', parentIdx: 3, res: false, route: route2.id },
    { first: 'Aditya', last: 'Mishra', gender: 'Male', class: 'Class 8', roll: '01', adm: 'SARS-2026-005', parentIdx: 4, res: true, route: null },
    { first: 'Ananya', last: 'Singh', gender: 'Female', class: 'Class 8', roll: '02', adm: 'SARS-2026-006', parentIdx: 0, res: true, route: null },
    { first: 'Faizan', last: 'Ansari', gender: 'Male', class: 'Class 7', roll: '01', adm: 'SARS-2026-007', parentIdx: 1, res: false, route: route1.id },
    { first: 'Ayush', last: 'Gupta', gender: 'Male', class: 'Class 7', roll: '02', adm: 'SARS-2026-008', parentIdx: 2, res: true, route: null },
    { first: 'Shreya', last: 'Yadav', gender: 'Female', class: 'Class 6', roll: '01', adm: 'SARS-2026-009', parentIdx: 3, res: false, route: route2.id },
    { first: 'Aryan', last: 'Mishra', gender: 'Male', class: 'Class 6', roll: '02', adm: 'SARS-2026-010', parentIdx: 4, res: true, route: null },
    { first: 'Kavya', last: 'Singh', gender: 'Female', class: 'Class 5', roll: '01', adm: 'SARS-2026-011', parentIdx: 0, res: true, route: null },
    { first: 'Saad', last: 'Ansari', gender: 'Male', class: 'Class 5', roll: '02', adm: 'SARS-2026-012', parentIdx: 1, res: false, route: route1.id },
    { first: 'Diya', last: 'Gupta', gender: 'Female', class: 'Class 4', roll: '01', adm: 'SARS-2026-013', parentIdx: 2, res: false, route: route1.id },
    { first: 'Harsh', last: 'Yadav', gender: 'Male', class: 'Class 4', roll: '02', adm: 'SARS-2026-014', parentIdx: 3, res: true, route: null },
    { first: 'Tanvi', last: 'Mishra', gender: 'Female', class: 'Class 3', roll: '01', adm: 'SARS-2026-015', parentIdx: 4, res: true, route: null },
    { first: 'Kabir', last: 'Singh', gender: 'Male', class: 'Class 2', roll: '01', adm: 'SARS-2026-016', parentIdx: 0, res: false, route: route2.id },
    { first: 'Alisha', last: 'Ansari', gender: 'Female', class: 'Class 1', roll: '01', adm: 'SARS-2026-017', parentIdx: 1, res: false, route: route1.id },
    { first: 'Vihaan', last: 'Gupta', gender: 'Male', class: 'UKG', roll: '01', adm: 'SARS-2026-018', parentIdx: 2, res: false, route: route1.id },
    { first: 'Navya', last: 'Yadav', gender: 'Female', class: 'LKG', roll: '01', adm: 'SARS-2026-019', parentIdx: 3, res: false, route: route2.id },
    { first: 'Ibrahim', last: 'Mishra', gender: 'Male', class: 'Nursery', roll: '01', adm: 'SARS-2026-020', parentIdx: 4, res: false, route: null },
  ];

  const createdStudents = [];
  for (const s of sampleStudents) {
    const cls = createdClasses[s.class];
    const sec = await prisma.section.findFirst({ where: { classId: cls.id, name: 'A' } });
    const parent = createdParents[s.parentIdx];
    const username = s.adm.toLowerCase().replace(/[^a-z0-9]/g, '');

    const user = await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        username,
        email: `${username}@student.sarssiwan.com`,
        passwordHash: studentPasswordHash,
        name: `${s.first} ${s.last}`,
        role: 'STUDENT',
        phone: parent ? parent.emergencyContact : '+91 9006326786',
      },
    });

    const student = await prisma.student.upsert({
      where: { admissionNo: s.adm },
      update: {},
      create: {
        userId: user.id,
        admissionNo: s.adm,
        rollNo: s.roll,
        firstName: s.first,
        lastName: s.last,
        gender: s.gender,
        dob: new Date('2012-05-15'),
        bloodGroup: 'B+',
        classId: cls.id,
        sectionId: sec.id,
        parentId: parent ? parent.id : null,
        session: '2026-27',
        address: parent ? parent.address : 'Village Baghra, Siwan',
        isResidential: s.res,
        hostelRoom: s.res ? `Block-A Room ${100 + parseInt(s.roll)}` : null,
        transportRouteId: s.route,
      },
    });
    createdStudents.push(student);

    // Create StudentEnrollment in Academic Year 2026-27
    await prisma.studentEnrollment.upsert({
      where: { studentId_academicYearId: { studentId: student.id, academicYearId: academicYear2026.id } },
      update: {},
      create: {
        studentId: student.id,
        academicYearId: academicYear2026.id,
        classId: cls.id,
        sectionId: sec.id,
        rollNo: s.roll,
        status: 'ENROLLED',
      },
    });

    // Create StudentFee record
    const feeStruct = await prisma.feeStructure.findUnique({
      where: { academicYearId_classId: { academicYearId: academicYear2026.id, classId: cls.id } },
    });

    const totalAnnual = feeStruct ? feeStruct.totalYearly : 24000;
    const studentFee = await prisma.studentFee.upsert({
      where: { studentId_academicYearId: { studentId: student.id, academicYearId: academicYear2026.id } },
      update: {},
      create: {
        studentId: student.id,
        academicYearId: academicYear2026.id,
        feeStructureId: feeStruct?.id,
        totalAmount: totalAnnual,
        discount: 500,
        lateFee: 0,
        finalAmount: totalAnnual - 500,
        paidAmount: 7000,
        status: 'PARTIAL',
        dueDate: new Date('2026-09-15'),
      },
    });

    // Create Q1 Paid Invoice
    const inv1 = await prisma.feeInvoice.create({
      data: {
        invoiceNo: `INV-2026-${student.admissionNo}-Q1`,
        studentId: student.id,
        studentFeeId: studentFee.id,
        session: '2026-27',
        title: 'Quarter 1 Composite Fee (Apr - Jun 2026)',
        dueDate: new Date('2026-04-15'),
        subtotal: 7500,
        discount: 500,
        lateFee: 0,
        totalAmount: 7000,
        paidAmount: 7000,
        status: 'PAID',
        items: {
          create: [
            { categoryName: 'Tuition Fee (Q1)', amount: 4500 },
            { categoryName: 'Computer & Smart Class Fee', amount: 1200 },
            { categoryName: 'Activity & Sports', amount: 800 },
            { categoryName: 'Library & Examination', amount: 1000 },
          ],
        },
      },
    });

    // Create Payment & Transaction
    const pmt1 = await prisma.payment.create({
      data: {
        paymentNo: `PMT-${Date.now()}-${student.rollNo}`,
        invoiceId: inv1.id,
        studentFeeId: studentFee.id,
        studentId: student.id,
        amount: 7000,
        paymentMethod: 'ONLINE_RAZORPAY',
        transactionId: `TXN_SARS_Q1_${student.admissionNo.replace(/-/g, '_')}`,
        gatewayOrderId: `order_SARS_${student.id.slice(0, 8)}`,
        gatewayPaymentId: `pay_SARS_${student.id.slice(0, 8)}`,
        status: 'SUCCESS',
        paidAt: new Date('2026-04-10'),
      },
    });

    await prisma.paymentTransaction.create({
      data: {
        paymentId: pmt1.id,
        studentId: student.id,
        gatewayOrderId: `order_SARS_${student.id.slice(0, 8)}`,
        gatewayEventId: `evt_${Date.now()}`,
        amount: 7000,
        currency: 'INR',
        status: 'SUCCESS',
        rawPayloadJson: JSON.stringify({ event: 'payment.captured', order_id: pmt1.gatewayOrderId }),
      },
    });

    // Create Receipt with QR code
    await prisma.receipt.create({
      data: {
        receiptNo: `SARS-2026-${String(createdStudents.length + 100).padStart(6, '0')}`,
        paymentId: pmt1.id,
        studentId: student.id,
        totalAmount: 7000,
        paymentMethod: 'Online Payment (Razorpay / UPI)',
        studentDetailsJson: JSON.stringify({
          studentName: `${student.firstName} ${student.lastName}`,
          admissionNo: student.admissionNo,
          rollNo: student.rollNo,
          className: s.class,
          sectionName: 'A',
          parentName: parent ? parent.fatherName : 'N/A',
          contact: parent ? parent.emergencyContact : '+91 9006326786',
        }),
        feeBreakdownJson: JSON.stringify([
          { name: 'Tuition Fee (Q1)', amount: 4500 },
          { name: 'Computer & Smart Class Fee', amount: 1200 },
          { name: 'Activity & Sports', amount: 800 },
          { name: 'Library & Examination', amount: 1000 },
          { name: 'Special Concession / Discount', amount: -500 },
        ]),
        verificationHash: `SARS-VERIFY-${pmt1.id.slice(0, 10).toUpperCase()}`,
        qrCodeUrl: `/verify/receipt/SARS-2026-${String(createdStudents.length + 100).padStart(6, '0')}`,
      },
    });

    // Create Pending Q2 Invoice
    await prisma.feeInvoice.create({
      data: {
        invoiceNo: `INV-2026-${student.admissionNo}-Q2`,
        studentId: student.id,
        studentFeeId: studentFee.id,
        session: '2026-27',
        title: 'Quarter 2 Composite Fee (Jul - Sep 2026)',
        dueDate: new Date('2026-09-15'),
        subtotal: 7500,
        discount: 0,
        lateFee: 0,
        totalAmount: 7500,
        paidAmount: 0,
        status: 'UNPAID',
        items: {
          create: [
            { categoryName: 'Tuition Fee (Q2)', amount: 4500 },
            { categoryName: 'Computer & Smart Class Fee', amount: 1200 },
            { categoryName: 'Activity & Sports', amount: 800 },
            { categoryName: 'Library & Examination', amount: 1000 },
          ],
        },
      },
    });

    // Add Attendance Records
    const today = new Date();
    for (let d = 1; d <= 15; d++) {
      const attDate = new Date(today.getFullYear(), today.getMonth(), d);
      await prisma.attendance.create({
        data: {
          date: attDate,
          studentId: student.id,
          classId: cls.id,
          sectionId: sec.id,
          status: d % 7 === 0 ? 'LEAVE' : d % 11 === 0 ? 'ABSENT' : 'PRESENT',
          markedBy: 'SARS Automated Biometric / Class Teacher',
        },
      }).catch(() => {});
    }
  }

  // 10. Exams, Marks & Results
  const class10 = createdClasses['Class 10'];
  const midTermExam = await prisma.exam.create({
    data: {
      name: 'Mid-Term Examination 2026',
      session: '2026-27',
      term: 'Term 1',
      startDate: new Date('2026-09-20'),
      endDate: new Date('2026-09-28'),
      classId: class10.id,
      isPublished: true,
    },
  });

  const class10Subjects = await prisma.subject.findMany({ where: { classId: class10.id } });
  for (const sub of class10Subjects) {
    await prisma.examSubject.create({
      data: {
        examId: midTermExam.id,
        subjectId: sub.id,
        maxMarks: 100,
        passMarks: 33,
      },
    });

    const c10Students = createdStudents.filter((s) => s.classId === class10.id);
    for (const st of c10Students) {
      const marksObtained = 75 + Math.floor(Math.random() * 20);
      const grade = marksObtained >= 90 ? 'A+' : marksObtained >= 80 ? 'A' : 'B+';
      await prisma.mark.create({
        data: {
          examId: midTermExam.id,
          subjectId: sub.id,
          studentId: st.id,
          marksObtained,
          grade,
          remarks: 'Excellent analytical understanding & neat presentation',
        },
      });
    }
  }

  // 11. Notices
  const sampleNotices = [
    {
      title: 'Online Admissions Open for Academic Session 2026-2027',
      content: 'Shabab Ashraf Residential School announces the commencement of online admissions from Nursery to Class 10. Parents can apply online or visit the administrative office at Baghra campus.',
      category: 'ADMISSION',
      priority: 'HIGH',
      targetAudience: 'ALL',
      isPublished: true,
    },
    {
      title: 'Quarter 2 Fee Payment Due Date Notice',
      content: 'Parents and guardians are requested to clear the outstanding Quarter 2 tuition and hostel fees before September 15, 2026 using our fast online payment portal to avoid late payment charges.',
      category: 'FEE',
      priority: 'HIGH',
      targetAudience: 'PARENTS',
      isPublished: true,
    },
    {
      title: 'Annual Sports Day & Inter-House Athletics Meet 2026',
      content: 'The Annual Sports Meet will be organized at the Main Sports Pavilion on November 14, 2026. Events include 100m sprint, relay, long jump, football, cricket and badminton matches.',
      category: 'GENERAL',
      priority: 'NORMAL',
      targetAudience: 'ALL',
      isPublished: true,
    },
    {
      title: 'Science & Robotics Exhibition Announcement',
      content: 'Students from Class 6 to 10 are invited to submit their innovative working models and science projects for the District Level Science Expo.',
      category: 'GENERAL',
      priority: 'NORMAL',
      targetAudience: 'STUDENTS',
      isPublished: true,
    },
    {
      title: 'Republic Day Parade & Cultural Program Recognition',
      content: 'SARS contingent won top honors at the District Republic Day Parade in Siwan. Congratulations to all participating cadet students and mentors!',
      category: 'GENERAL',
      priority: 'NORMAL',
      targetAudience: 'ALL',
      isPublished: true,
    },
  ];

  for (const n of sampleNotices) {
    await prisma.notice.create({ data: n });
  }

  // 12. Events
  const sampleEvents = [
    {
      title: 'Annual Sports Extravaganza & Athletics Gala',
      description: 'Grand sports meet with track and field competitions, march past, and award distribution.',
      category: 'SPORTS',
      eventDate: new Date('2026-11-14'),
      location: 'SARS Sports Grounds, Baghra',
      imageUrl: '/images/events/sports-day.jpg',
    },
    {
      title: 'Science, Technology & Art Innovation Fair',
      description: 'Interactive STEM exhibits, working robotic prototypes, and student art gallery.',
      category: 'ACADEMIC',
      eventDate: new Date('2026-10-18'),
      location: 'Auditorium & Laboratories',
      imageUrl: '/images/events/science-fair.jpg',
    },
    {
      title: 'Parent-Teacher Academic Review Conference',
      description: 'Comprehensive 1-on-1 discussion on student academic growth, quarterly test progress and residential wellbeing.',
      category: 'ACADEMIC',
      eventDate: new Date('2026-09-30'),
      location: 'Central Academic Block',
      imageUrl: '/images/events/ptm.jpg',
    },
  ];

  for (const ev of sampleEvents) {
    await prisma.event.create({ data: ev });
  }

  // 13. Gallery Items
  const sampleGallery = [
    { title: 'Grand School Main Entrance & Academic Block', album: 'Campus & Infrastructure', category: 'CAMPUS', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80', caption: 'State-of-the-art campus surrounded by green serenity in Baghra, Siwan.' },
    { title: 'Digital Smart Classroom in Session', album: 'Academics', category: 'CLASSROOMS', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', caption: 'Interactive multi-media learning with experienced subject educators.' },
    { title: 'Advanced Science & Chemistry Laboratory', album: 'Facilities', category: 'CAMPUS', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80', caption: 'Hands-on practical experiments and research-oriented learning.' },
    { title: 'Modern Computer Technology Lab', album: 'Facilities', category: 'CAMPUS', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', caption: 'High-speed internet-enabled workstations for digital literacy and coding.' },
    { title: 'Residential Hostel Building & Courtyard', album: 'Hostel Life', category: 'HOSTEL', imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80', caption: 'Safe, comfortable, and disciplined residential living with 24x7 pastoral care.' },
    { title: 'Annual Athletics & Football Championship', album: 'Sports', category: 'SPORTS', imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', caption: 'Nurturing physical fitness, sportsmanship, and teamwork.' },
  ];

  for (const g of sampleGallery) {
    await prisma.galleryItem.create({ data: g });
  }

  // 14. Admission Applications & Documents
  const sampleApps = [
    {
      applicationNo: 'SARS-2026-REG-000001',
      studentName: 'Mohammad Reyan',
      gender: 'Male',
      dob: new Date('2015-06-12'),
      applyingForClass: 'Class 6',
      fatherName: 'Tariq Anwar',
      motherName: 'Shabana Parveen',
      parentPhone: '+91 9835991122',
      parentEmail: 'tariq.anwar@gmail.com',
      address: 'Town Thana Road, Siwan',
      isResidential: true,
      status: 'APPROVED',
      remarks: 'Documents verified and entrance test cleared with 88%.',
    },
    {
      applicationNo: 'SARS-2026-REG-000002',
      studentName: 'Sneha Kumari',
      gender: 'Female',
      dob: new Date('2017-09-24'),
      applyingForClass: 'Class 4',
      fatherName: 'Dharmendra Kumar',
      motherName: 'Geeta Devi',
      parentPhone: '+91 9431882233',
      parentEmail: 'dharmendra.k@gmail.com',
      address: 'Mairwa Road, Siwan',
      isResidential: false,
      status: 'UNDER_REVIEW',
      remarks: 'Application under verification by academic committee.',
    },
    {
      applicationNo: 'SARS-2026-REG-000003',
      studentName: 'Zayd Khan',
      gender: 'Male',
      dob: new Date('2021-03-10'),
      applyingForClass: 'Nursery',
      fatherName: 'Imran Khan',
      motherName: 'Nadia Khan',
      parentPhone: '+91 9771223344',
      parentEmail: 'imran.khan@gmail.com',
      address: 'Bhatwalia, Siwan',
      isResidential: false,
      status: 'SUBMITTED',
      remarks: 'New application submitted online.',
    },
  ];

  for (const app of sampleApps) {
    const createdApp = await prisma.admissionApplication.create({ data: app });
    await prisma.admissionDocument.create({
      data: {
        applicationId: createdApp.id,
        documentType: 'BIRTH_CERTIFICATE',
        fileName: `${createdApp.studentName.replace(/\s+/g, '_')}_Birth_Cert.pdf`,
        fileUrl: '/uploads/documents/sample_birth_cert.pdf',
        fileSize: '450 KB',
      },
    });
  }

  // 15. Sample Certificates
  const student1 = createdStudents[0];
  if (student1) {
    await prisma.certificate.create({
      data: {
        certificateNo: 'SARS-CERT-2026-0089',
        studentId: student1.id,
        type: 'BONAFIDE',
        issueDate: new Date('2026-07-15'),
        contentJson: JSON.stringify({
          studentName: `${student1.firstName} ${student1.lastName}`,
          admissionNo: student1.admissionNo,
          rollNo: student1.rollNo,
          className: 'Class 10',
          session: '2026-27',
          fatherName: 'Arun Kumar Singh',
          purpose: 'Official verification and passport application',
        }),
        verificationHash: 'SARS-CERT-VHASH-998811',
        qrCodeUrl: '/verify/certificate/SARS-CERT-2026-0089',
      },
    });
  }

  // 16. Audit Log Initial Entry
  await prisma.auditLog.create({
    data: {
      userId: superAdmin.id,
      userName: 'Dr. S. Ashraf (Principal)',
      action: 'SYSTEM_INITIALIZATION',
      entity: 'SETTINGS',
      entityId: 'sars-settings-main',
      details: 'SARS Educational Portal initialized with complete master databases, academic years, classes, and demo records.',
      ipAddress: '127.0.0.1',
    },
  });

  console.log('Database seeded successfully with all relational sample data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
