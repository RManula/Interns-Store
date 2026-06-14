# Ideas — Accounts & E-commerce

**Owner:** Member 3
**Scope:** Student & employer dashboards, the listing builder, the AI assistant shell, and the
**cart → checkout → payment → invoice** flow (Pricing/Plans, subscriptions, premium listings).
This is the rubric's required transaction — the highest-weighted part of the build.

> Add your ideas at the bottom using the template. Priority: **MUST** / **REAL** / **ASPIR**.

## Idea template (copy this)

```markdown
### <short title>
- **Feature:** what it is
- **Why it helps:** problem solved / marks earned
- **How it should be built:** pages, components, behaviour
- **Priority:** MUST / REAL / ASPIR
- **Added by:** <your name>
```

---

## Ideas

<!-- Add your ideas below this line -->
## 1. Pricing Structure

The platform uses a subscription model with three distinct plan tiers tailored for two types of users: **Students** and **Companies**.

### 1.1. Student Plans
* **Free Plan (Basic)**
    * *Description:* Free access with essential features.
    * *Features:* Profile creation, internship search, and basic application submissions.
* **Standard Plan (Intermediate)**
    * *Description:* Paid plan offering support and profile optimization tools.
    * *Features:* Includes everything in the Free plan, plus access to an **AI Chat assistant** for student support, and a **Premium Entry (Visibility Boost)** to highlight their profile.
* **Premium Plan (Advanced)**
    * *Description:* Premium paid plan focused on maximizing job placement performance.
    * *Features:* Includes everything in the Standard plan, plus a **guaranteed visibility boost on every single application and submission** made within the platform.

### 1.2. Company Plans
* **Starter Plan (Basic)**
    * *Description:* Allows companies to test the platform with job posting limitations.
* **Standard Plan (Intermediate)**
    * *Description:* Tailored for companies with a moderate volume of hiring needs.
* **Premium Plan (Advanced)**
    * *Description:* Designed for enterprises seeking automated workflows and large-scale recruitment.

---

## 2. Cart & Payment Checkout Flow

Upon selecting any of the six available plans on the Pricing page, the user initiates the billing flow. The system detects the profile type and redirects them to the corresponding checkout page.

```
[ Pricing Page ]
       │
       ├─► Selects Student Plan ──► [ Student Checkout ]
       └─► Selects Company Plan ──► [ Company Checkout ]
```

### 2.1. Student Checkout
Standard cart interface focused on B2C (Business-to-Consumer) transactions.
* **Form Fields:**
    * Full Name
    * Phone Number
    * Email Address
    * Residential Address
    * Credit/Debit Card Details (Card Number, Expiry Date, and CVV)
* **Behavior:** Processes the recurring monthly subscription payment.

### 2.2. Company Checkout
Corporate cart interface adapted for B2B (Business-to-Business) transactions.
* **Form Fields:**
    * Company Name / Legal Entity Name
    * Corporate Phone Number
    * Corporate Email Address
    * Headquarters Address
    * **ABN (Australian Business Number):** Mandatory field required for verification and accurate tax (**GST/Tax**) calculation.
    * Credit Card / Corporate Payment Details.

---

## 3. Invoice Management & User Area

Both students and companies have access to their historical billing and accounting records within the platform.
* **Download Feature:** A dedicated billing area in the user profile allows users to view and download invoices as PDFs.
* **Tax Data:** Generated invoices must display the holder's details, service breakdowns, and the **ABN** (for companies). This ensures businesses can smoothly submit the document to **claim the tax**.

---

## 4. Employer Dashboard

A centralized workspace for companies to manage their opportunities and automate the selection process.

### 4.1. Job Posting Management
* **Direct Publishing:** Interface to create and post new internship opportunities instantly.
* **Scheduling:** Tool to schedule the exact date and time a job listing should go live or be automatically closed.
* **Performance Analytics:** Dashboard displaying metrics such as views, clicks, and total application volume for each active or past listing.

### 4.2. Intelligent Screening with AI (Candidate Top List)
* **Automated Processing:** The platform's built-in AI analyzes the profiles of all users who applied to a specific job listing in real time.
* **Requirement Matching:** The AI compares the candidate's skills, background, and data against the specific job description and company requirements.
* **Top List:** The dashboard automatically generates a restricted "Top List" ranking the candidates who best match what the company is looking for, significantly reducing screening time for recruiters.
