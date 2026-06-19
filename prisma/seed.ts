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

  // --- Demo employer ------------------------------------------------------
  await prisma.user.upsert({
    where: { email: "employer@demo.com" },
    update: {},
    create: {
      role: "employer",
      name: "Jordan Wells",
      email: "employer@demo.com",
      passwordHash,
      activePlan: "Per listing",
      paymentMethod: { type: "Visa", last4: "4242", expiry: "12/28" },
      paymentHistory: [
        { id: "inv-001", date: "2026-05-14", description: "Growth Plan", amount: 165.0, status: "Paid" },
        { id: "inv-002", date: "2026-04-14", description: "Growth Plan", amount: 165.0, status: "Paid" },
        { id: "inv-003", date: "2026-03-14", description: "Growth Plan", amount: 165.0, status: "Paid" },
      ],
      employer: {
        companyName: "Canopy Labs",
        abn: "12 345 678 901",
        industry: "Design & Product Studio",
        companySize: "51-200 employees",
        website: "https://canopylabs.example",
        contactName: "Jordan Wells",
        position: "People Lead",
        phone: "+61 7 3000 0000",
        plan: "Per listing",
      },
    },
  });

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

  console.log("Seed complete: 3 demo accounts + 3 reviews.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
