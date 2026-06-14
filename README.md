# Interns Store

Interns Store is an Australian student-first internship marketplace built for finding, comparing, and tracking early-career opportunities.

This website is a class assignment and is not intended for commercial use.

## Features

- Responsive internship marketplace homepage
- Search by role, company, location, remote work, and study field
- Live autocomplete and accessible custom dropdowns
- Internship listing and detail pages
- Saveable internship cards
- Student and employer landing pages
- Employer pricing and internship submission pages
- Animated cinematic placement section
- Responsive navigation with desktop dropdowns and mobile accordions
- Newsletter and contact forms
- Accessible keyboard navigation and reduced-motion support

## Technology

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn-compatible component structure
- Framer Motion
- GSAP and ScrollTrigger
- React Three Fiber and Drei
- Lucide React icons

## Local Development

Requirements:

- Node.js 20 or later
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Run `npm run lint` and `npm run build` before publishing changes.

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage, internship search, features, pricing, and testimonials |
| `/browse` | Searchable internship listings |
| `/internships/[id]` | Individual internship details |
| `/for-students` | Student tools and application workflow |
| `/for-employers` | Employer benefits and hiring workflow |
| `/post` | Employer internship submission form |
| `/pricing` | Employer listing and subscription plans |
| `/register` | Registration |
| `/about` | Company information |
| `/blog` | Internship guides and articles |
| `/contact` | Contact information and form |
| `/privacy` | Privacy and safety information |

## Project Structure

```text
app/                  Next.js routes, layouts, metadata, and global styles
components/home/      Homepage hero, search, and newsletter components
components/internships/ Reusable internship listing components
components/layout/    Header, footer, and scroll progress
components/shared/    Shared page heroes and calls to action
components/ui/        Reusable UI and animation components
components/employers/ Employer forms
lib/                  Site configuration, content data, and utilities
public/               Static public assets
```

## Deployment

The recommended deployment platform is Vercel:

1. Push this project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) with GitHub.
3. Import the repository.
4. Keep the detected framework as Next.js.
5. Select **Deploy**.

Vercel will create a public URL and redeploy automatically whenever changes are pushed to the production branch.

## Important Notice

The business details, listings, testimonials, pricing, and contact information in this project are demonstration content.

**This website/app is for a class assignment and not for commercial purposes.**
