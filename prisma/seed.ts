import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password", 10);

  // --- Demo student -------------------------------------------------------
  await prisma.user.upsert({
    where: { email: "student@demo.com" },
    update: {},
    create: {
      role: "student",
      name: "Alex Taylor",
      email: "student@demo.com",
      passwordHash,
      activePlan: "Basic",
      student: {
        headline: "Final-year Computer Science student",
        location: "Brisbane, QLD",
        phone: "+61 400 000 000",
        rightToWork: "I'm an Australian citizen",
        resumeName: "Alex-Taylor-Resume.pdf",
        education: [
          {
            id: "edu-1",
            qualification: "Bachelor of Computer Science",
            institution: "Queensland University of Technology",
            finished: "Expected 2026",
            detail: "Majoring in software engineering and cyber security.",
          },
        ],
        careerHistory: [
          {
            id: "role-1",
            title: "IT Support Volunteer",
            organisation: "Campus Tech Help",
            period: "2025 - Present",
            location: "Brisbane, QLD",
            detail: "First-line support for students and staff.",
          },
        ],
        skills: ["JavaScript", "Python", "Teamwork", "Problem solving"],
      },
    },
  });

  // --- Real employer accounts, one per company ---------------------------
  // Each account "owns" all catalogue listings whose companyId matches, so the
  // employer sees those listings + their applications and can delete them.
  // Remove the old placeholder demo employer if it exists.
  await prisma.user.deleteMany({ where: { email: "employer@demo.com" } });

  const COMPANY_ACCOUNTS = [
    { companyId: "atlassian", email: "atlassian@employer.demo", companyName: "Atlassian", industry: "Software & Technology", companySize: "10,000+ employees", website: "https://www.atlassian.com", abn: "53 102 443 916", contactName: "Talent Team" },
    { companyId: "google", email: "google@employer.demo", companyName: "Google", industry: "Technology", companySize: "180,000+ employees", website: "https://careers.google.com", abn: "33 102 417 032", contactName: "University Recruiting" },
    { companyId: "commbank", email: "commbank@employer.demo", companyName: "CommBank", industry: "Banking & Financial Services", companySize: "50,000+ employees", website: "https://www.commbank.com.au/careers", abn: "48 123 123 124", contactName: "Early Careers" },
    { companyId: "nab", email: "nab@employer.demo", companyName: "NAB", industry: "Banking & Financial Services", companySize: "38,000+ employees", website: "https://www.nab.com.au/about-us/careers", abn: "12 004 044 937", contactName: "Emerging Talent" },
    { companyId: "bhp", email: "bhp@employer.demo", companyName: "BHP", industry: "Mining & Resources", companySize: "80,000+ employees", website: "https://www.bhp.com/careers", abn: "49 004 028 077", contactName: "Graduate Programs" },
    { companyId: "woolworths-group", email: "woolworths@employer.demo", companyName: "Woolworths Group", industry: "Retail & Technology", companySize: "200,000+ employees", website: "https://www.woolworthsgroup.com.au/careers", abn: "88 000 014 675", contactName: "Talent Acquisition" },
    { companyId: "coles-group", email: "coles@employer.demo", companyName: "Coles Group", industry: "Retail", companySize: "120,000+ employees", website: "https://www.colescareers.com.au", abn: "11 004 089 936", contactName: "Early Careers" },
    { companyId: "jb-hi-fi", email: "jbhifi@employer.demo", companyName: "JB Hi-Fi", industry: "Retail (Consumer Electronics)", companySize: "14,000+ employees", website: "https://careers.jbhifi.com.au", abn: "80 093 220 136", contactName: "People & Culture" },
  ];

  for (const acc of COMPANY_ACCOUNTS) {
    await prisma.user.upsert({
      where: { email: acc.email },
      update: { employer: { companyId: acc.companyId, companyName: acc.companyName, abn: acc.abn, industry: acc.industry, companySize: acc.companySize, website: acc.website, contactName: acc.contactName, position: "Internship Program Lead", phone: "+61 2 8000 0000", plan: "Unlimited" } },
      create: {
        role: "employer",
        name: acc.companyName,
        email: acc.email,
        passwordHash,
        activePlan: "Unlimited",
        employer: { companyId: acc.companyId, companyName: acc.companyName, abn: acc.abn, industry: acc.industry, companySize: acc.companySize, website: acc.website, contactName: acc.contactName, position: "Internship Program Lead", phone: "+61 2 8000 0000", plan: "Unlimited" },
      },
    });
  }

  // --- Demo student (Pro) with saved jobs ---------------------------------
  const pro = await prisma.user.upsert({
    where: { email: "pro@demo.com" },
    update: {},
    create: {
      role: "student",
      name: "Sam Rivera",
      email: "pro@demo.com",
      passwordHash,
      activePlan: "Pro",
      paymentMethod: { type: "Mastercard", last4: "5678", expiry: "09/27" },
      paymentHistory: [
        { id: "inv-p01", date: "2026-06-01", description: "Student Pro Plan", amount: 24.99, status: "Paid" },
        { id: "inv-p02", date: "2026-05-01", description: "Student Pro Plan", amount: 24.99, status: "Paid" },
        { id: "inv-p03", date: "2026-04-01", description: "Student Pro Plan", amount: 24.99, status: "Paid" },
      ],
      student: {
        headline: "Master of Data Science student — AI & ML focus",
        location: "Sydney, NSW",
        phone: "+61 411 000 000",
        rightToWork: "I'm an Australian citizen",
        resumeName: "Sam-Rivera-Resume.pdf",
        education: [
          {
            id: "edu-1",
            qualification: "Master of Data Science",
            institution: "University of Sydney",
            finished: "Expected 2027",
            detail: "Specialising in machine learning and AI applications.",
          },
        ],
        careerHistory: [
          {
            id: "role-1",
            title: "Research Assistant",
            organisation: "USyd AI Lab",
            period: "2025 - Present",
            location: "Sydney, NSW",
            detail: "Assisted in NLP research and published two papers.",
          },
        ],
        skills: ["Python", "TensorFlow", "Data Analysis", "Machine Learning", "SQL", "Research"],
      },
    },
  });

  for (const jobId of ["atlassian-software-engineering-intern", "google-ux-design-intern"]) {
    await prisma.savedJob.upsert({
      where: { userId_jobId: { userId: pro.id, jobId } },
      update: {},
      create: { userId: pro.id, jobId },
    });
  }

  // --- Seed reviews -------------------------------------------------------
  const reviews = [
    { id: "rev-seed-1", companyId: "atlassian", companyName: "Atlassian", authorName: "Priya N.", authorRole: "student", rating: 5, title: "Best first experience", body: "Mentors actually invested time in me and I shipped real features. Felt like part of the team from week one.", date: new Date("2026-05-20") },
    { id: "rev-seed-2", companyId: "commbank", companyName: "CommBank", authorName: "Liam R.", authorRole: "student", rating: 4, title: "Structured and supportive", body: "The 12-week program was well organised with clear goals. Great exposure to how a big bank builds software.", date: new Date("2026-05-02") },
    { id: "rev-seed-3", companyId: "google", companyName: "Google", authorName: "Sam T.", authorRole: "student", rating: 5, title: "Learned an incredible amount", body: "Working on large-scale systems with world-class engineers was a genuine career accelerator.", date: new Date("2026-04-18") },
  ];
  for (const r of reviews) {
    await prisma.review.upsert({ where: { id: r.id }, update: {}, create: r });
  }

  console.log("Seed complete: 2 student demos + 8 company employer accounts + 3 reviews.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
