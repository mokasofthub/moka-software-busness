<div align="center">

<h1>MokaSoftware Business</h1>

<p><strong>Production-grade Next.js 14 portfolio &middot; Containerised &middot; Automated CI/CD to AWS ECS Fargate</strong></p>

<p>
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/AWS_ECS-Fargate-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS ECS">
  <img src="https://img.shields.io/badge/Jenkins-CI%2FCD-D24939?style=for-the-badge&logo=jenkins&logoColor=white" alt="Jenkins">
  <img src="https://img.shields.io/badge/Jest-96_tests-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
</p>

Personal freelance portfolio for **Bernard D. Mokalo** — Principal Software Engineer & DevOps/Cloud specialist.  
Available in **5 languages** &middot; **Dark / light theme** &middot; **Containerised** &middot; **Automated CI/CD to AWS**

</div>

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [Running Tests Locally](#running-tests-locally)
- [Docker (local container)](#docker-local-container)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables](#environment-variables)
- [AWS Cost Guide](#aws-cost-guide)
- [Customisation](#customisation)
- [License](#license)

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org) | App Router · SSR · `output: 'standalone'` for Docker |
| **Language** | TypeScript 5 | Strict mode enabled |
| **Styling** | Tailwind CSS 3 + CSS custom properties | Design tokens for light/dark theme |
| **i18n** | [next-intl 3](https://next-intl-docs.vercel.app) | 5 locales: `en` · `fr` · `es` · `de` · `pt` |
| **Fonts** | Inter · Space Grotesk | Via `next/font/google` (zero layout shift) |
| **Contact form** | [Formspree](https://formspree.io) | No backend / email server required |
| **Testing** | Jest 30 · React Testing Library · `@testing-library/user-event` | 12 test files · 96 tests |
| **Container** | Docker — Node 20 Alpine, 3-stage build | Non-root user · ~150 MB final image |
| **CI/CD** | Jenkins Declarative Pipeline | Shared library [`jenkins-nextjs-lib`](https://github.com/mokasofthub/jenkins-nextjs-lib) |
| **Image registry** | Amazon ECR | Auto-created · lifecycle: keep last 5 images |
| **Compute** | Amazon ECS Fargate | 256 CPU · 512 MB · public subnet · port 3000 |
| **CDN** | Amazon CloudFront | HTTPS · edge caching · custom domain |

---

## Architecture

### Production infrastructure

```
  User (browser / mobile)
          │  HTTPS
          ▼
  ┌───────────────────┐
  │   CloudFront CDN  │  ← HTTPS termination · edge caching · DDoS protection
  └───────────────────┘
          │  HTTP (origin request)
          ▼
  ┌─────────────────────────────────────────┐
  │           AWS ECS Fargate               │
  │  ┌───────────────────────────────────┐  │
  │  │  Next.js 14  (standalone mode)    │  │  256 CPU · 512 MB · public subnet
  │  │  Node 20 Alpine container         │  │  Port 3000
  │  └───────────────────────────────────┘  │
  └─────────────────────────────────────────┘
          │  pulls image on deploy
          ▼
  ┌───────────────────┐
  │   Amazon ECR      │  ← Container image registry · lifecycle: keep last 5
  └───────────────────┘
```

### CI/CD flow

```
  Developer
      │  git push / open PR
      ▼
  GitHub repository
      │  webhook  →  POST /github-webhook/
      ▼
  Jenkins (EC2)
      │
      ├─ [all branches & PRs]
      │     Checkout → Install → Lint → Test → Build
      │
      └─ [main branch only]
            Docker Build & Push to ECR
                  → Register new ECS task definition
                  → aws ecs update-service
                  → wait services-stable
                  → CloudFront cache invalidation
```

### Application layers

```
  messages/           ← Translation JSON (en / fr / es / de / pt)
      │
  src/middleware.ts   ← next-intl routing (locale detection & redirect)
      │
  src/app/[locale]/   ← Per-locale layout + root page
      │
  src/app/components/ ← All UI sections: Hero · About · Services · Projects ·
      │                  Pricing · Skills · Contact · Navbar · Footer · BottomNav
      │
  src/lib/utils.ts    ← Pure shared helpers (e.g. isValidEmail)
```

---

## Project Structure

```
moka-software-business/
│
├── messages/                        # i18n translation files (one JSON per locale)
│   ├── en.json
│   ├── fr.json
│   ├── es.json
│   ├── de.json
│   └── pt.json
│
├── public/                          # Static assets — icons, manifest.json
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           # Per-locale layout (ThemeProvider + NextIntlClientProvider)
│   │   │   └── page.tsx             # Root page — assembles all section components
│   │   │
│   │   ├── components/
│   │   │   ├── About.tsx            # Bio, skill tags, quick-fact cards
│   │   │   ├── BackToTop.tsx        # Floating scroll-to-top button
│   │   │   ├── BottomNav.tsx        # Mobile floating navigation bar
│   │   │   ├── BrandLogo.tsx        # Shared logo wordmark
│   │   │   ├── Card3D.tsx           # Mouse-tracking 3D tilt + glare wrapper
│   │   │   ├── Contact.tsx          # Client-side validated form → Formspree
│   │   │   ├── Footer.tsx           # Footer links + copyright
│   │   │   ├── Hero.tsx             # Name, title, key metrics, primary CTAs
│   │   │   ├── Navbar.tsx           # Sticky nav · theme toggle · locale switcher · drawer
│   │   │   ├── Pricing.tsx          # 3-tab service catalog (web / engineering / support)
│   │   │   ├── Projects.tsx         # Case study cards + modal
│   │   │   ├── Services.tsx         # 9-card service grid with expand/collapse
│   │   │   ├── Skills.tsx           # Technology inventory grouped by category
│   │   │   ├── ThemeProvider.tsx    # React context — dark/light + localStorage persistence
│   │   │   │
│   │   │   └── __tests__/           # Component test files (Jest + RTL)
│   │   │       ├── About.test.tsx
│   │   │       ├── BottomNav.test.tsx
│   │   │       ├── Card3D.test.tsx
│   │   │       ├── Contact.test.tsx
│   │   │       ├── Footer.test.tsx
│   │   │       ├── Hero.test.tsx
│   │   │       ├── Navbar.test.tsx
│   │   │       ├── Pricing.test.tsx
│   │   │       ├── Projects.test.tsx
│   │   │       ├── Services.test.tsx
│   │   │       └── ThemeProvider.test.tsx
│   │   │
│   │   ├── globals.css              # CSS tokens · Tailwind layers · animations
│   │   └── layout.tsx               # Root layout (HTML lang attribute)
│   │
│   ├── lib/
│   │   └── utils.ts                 # Pure helpers (isValidEmail, etc.)
│   │
│   ├── __tests__/
│   │   └── utils.test.ts            # Unit tests for utils
│   │
│   ├── i18n.ts                      # next-intl config (locales, defaultLocale)
│   └── middleware.ts                # next-intl routing middleware
│
├── Dockerfile                       # Multi-stage production container image
├── .dockerignore
├── Jenkinsfile                      # CI/CD entry point — uses jenkins-nextjs-lib
├── jest.config.ts
├── jest.setup.ts
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Running Locally

### Prerequisites

Make sure the following tools are installed before you begin:

| Tool | Minimum version | Check |
|---|---|---|
| Node.js | 20 | `node --version` |
| npm | 10 | `npm --version` |
| Git | any | `git --version` |
| Docker *(optional — only for container testing)* | 24 | `docker --version` |

---

### Step 1 — Clone the repository

```bash
git clone https://github.com/mokasofthub/moka-software-busness.git
cd moka-software-busness
```

---

### Step 2 — Install dependencies

```bash
npm install
```

This installs all runtime and dev dependencies listed in `package.json`.

---

### Step 3 — Configure environment variables

The only required variable is your Formspree form ID (used by the contact form).

```bash
# Create the local env file (never committed — already in .gitignore)
cp .env.example .env.local
```

Then open `.env.local` and set:

```env
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id_here
```

> **Where to get your form ID:** Create a free form at [formspree.io](https://formspree.io).  
> If you just want to browse the UI without the contact form working, you can leave this blank — the form will simply fail on submission.

---

### Step 4 — Start the development server

```bash
npm run dev
```

The server starts at **[http://localhost:3000](http://localhost:3000)**.

The app hot-reloads on every file save — no manual restarts needed.

**Available locale routes:**

| URL | Locale |
|---|---|
| `http://localhost:3000` | English (default) |
| `http://localhost:3000/fr` | French |
| `http://localhost:3000/es` | Spanish |
| `http://localhost:3000/de` | German |
| `http://localhost:3000/pt` | Portuguese |

---

### All available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the hot-reloading development server |
| `npm run build` | Compile a production build (`output: 'standalone'`) |
| `npm start` | Start the compiled production server (requires `npm run build` first) |
| `npm run lint` | Run ESLint across all source files |
| `npm test` | Run the full test suite once and exit |
| `npm run test:watch` | Re-run affected tests on every file save |
| `npm run test:coverage` | Run tests and generate an HTML coverage report |

---

## Running Tests Locally

The project uses **Jest 30** + **React Testing Library** + **`@testing-library/user-event`**.

---

### Step 1 — Run all tests once

```bash
npm test
```

Expected output:

```
Test Suites: 12 passed, 12 total
Tests:       96 passed, 96 total
Time:        ~2s
```

---

### Step 2 — Run tests in watch mode (during development)

```bash
npm run test:watch
```

Jest will watch for file changes and automatically re-run only the tests affected by your edits. Press `a` to force a full run, `q` to quit.

---

### Step 3 — Run a specific test file

```bash
# Run only the Contact tests
npm test -- --testPathPattern="Contact"

# Run only component tests
npm test -- --testPathPattern="components"

# Run tests matching a specific test name
npm test -- --testNamePattern="validates email"
```

---

### Step 4 — Generate a coverage report

```bash
npm run test:coverage
```

An HTML report is written to `coverage/lcov-report/index.html`. Open it in your browser:

```bash
# macOS
open coverage/lcov-report/index.html

# Linux
xdg-open coverage/lcov-report/index.html

# Or navigate manually in any browser
```

---

### What each test file covers

| Test file | Component | What is tested |
|---|---|---|
| `utils.test.ts` | `lib/utils.ts` | `isValidEmail` — valid, malformed, and edge-case addresses |
| `ThemeProvider.test.tsx` | `ThemeProvider` | Default dark theme, `localStorage` restore, dark ↔ light toggle |
| `Card3D.test.tsx` | `Card3D` | Renders children, perspective on `mouseMove`, reset on `mouseLeave`, glare overlay |
| `Hero.test.tsx` | `Hero` | Availability badge, headline copy, CTA `href` values, stat labels |
| `Contact.test.tsx` | `Contact` | All validation paths, Formspree success/error/network failure, loading state |
| `Navbar.test.tsx` | `Navbar` | Logo anchor, nav `href` values, theme toggle, mobile drawer, locale dropdown |
| `About.test.tsx` | `About` | Headline, section label, bio text, skill tags, profile image, "Available" badge |
| `Services.test.tsx` | `Services` | Headline, labels, first 6 cards visible, expand/collapse toggle |
| `Pricing.test.tsx` | `Pricing` | Headline, all 3 tabs, popular badge, CTA text, scope note |
| `Projects.test.tsx` | `Projects` | Project titles, tech tags, modal open/close, modal CTA link |
| `Footer.test.tsx` | `Footer` | Brand logo, copyright text, all 4 nav links and their `href` values |
| `BottomNav.test.tsx` | `BottomNav` | 5 nav items, correct `href` values, `fixed bottom-0` positioning, `md:hidden` |

---

## Docker (local container)

Use this to replicate the exact production image on your machine.

### Step 1 — Build the image

```bash
docker build \
  --build-arg NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id \
  -t moka-software-business \
  .
```

### Step 2 — Run the container

```bash
docker run -p 3000:3000 moka-software-business
```

Open [http://localhost:3000](http://localhost:3000).

### How the multi-stage build works

| Stage | Base image | What happens |
|---|---|---|
| `deps` | `node:20-alpine` | `npm ci` — installs all dependencies |
| `builder` | `node:20-alpine` | `npm run build` — compiles Next.js standalone output |
| `runner` | `node:20-alpine` | Copies only the runtime files; drops dev deps and build cache |

> Final image: ~150 MB. Non-root `nextjs` user for security.

---

## CI/CD Pipeline

The pipeline is defined in [`Jenkinsfile`](./Jenkinsfile) and powered by the shared library [`jenkins-nextjs-lib`](https://github.com/mokasofthub/jenkins-nextjs-lib).

Every push and pull request triggers **CI** (stages 1–5).  
Deployment to AWS runs **only on merges to `main`**.

### Pipeline stages

| Stage | Runs on | Description |
|---|---|---|
| **Checkout** | All branches | Clone repo, log branch + commit SHA |
| **Install** | All branches | `npm ci --prefer-offline` |
| **Lint** | All branches | `npm run lint` — fails fast on any ESLint error |
| **Test** | All branches | `npm test` — fails fast if any test fails |
| **Build** | All branches | `npm run build` — validates TypeScript and SSR output |
| **Docker Build & Push** | `main` only | Build image with `<sha>` + `latest` tags, push to ECR |
| **Deploy to ECS** | `main` only | Register new task def revision → `update-service` → wait stable |
| **Invalidate CloudFront** | `main` only | `/*` invalidation (skipped if `cloudfrontDistributionId` not set) |

### Jenkins credentials required

| Credential ID | Type | Used for |
|---|---|---|
| `aws-access-key-id` | Secret text | AWS CLI authentication |
| `aws-secret-access-key` | Secret text | AWS CLI authentication |
| `formspree-form-id` | Secret text | Injected as `NEXT_PUBLIC_FORMSPREE_FORM_ID` at Docker build time |

### IAM permissions required

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:PutImage",
      "ecr:CreateRepository",
      "ecr:DescribeRepositories",
      "ecr:PutLifecyclePolicy",
      "ecs:DescribeTaskDefinition",
      "ecs:RegisterTaskDefinition",
      "ecs:UpdateService",
      "ecs:DescribeServices",
      "iam:PassRole",
      "cloudfront:CreateInvalidation",
      "sts:GetCallerIdentity"
    ],
    "Resource": "*"
  }]
}
```

---

## Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Yes | Your Formspree form ID. Baked into the JS bundle at build time. |

**For local development** — create `.env.local` (gitignored, never committed):

```env
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id_here
```

**For Docker** — pass as a build argument:

```bash
docker build --build-arg NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id .
```

**For Jenkins** — store as a `Secret text` credential with ID `formspree-form-id`. The pipeline injects it automatically via `--build-arg`.

---

## AWS Cost Guide

### Monthly estimate (`us-east-1`)

| Resource | Spec | Est. / month |
|---|---|---|
| ECS Fargate | 256 CPU · 512 MB · always-on · desired-count=1 | ~$9 |
| ECR | ≤ 5 images × ~150 MB | < $0.10 |
| CloudFront | Low-traffic portfolio | ~$1–2 |
| Route 53 | 1 hosted zone | ~$0.50 |
| ALB | **Not used** | $0 |
| **Total** | | **~$11–12 / month** |

### Key cost decisions

- **ECR lifecycle policy** — retains only the 5 most recent images; applied idempotently on every `main` push.
- **`minimumHealthyPercent=0`** — stops the old task before starting the new one (~5 s downtime). Avoids the cost of running two concurrent Fargate tasks during a rolling deploy.
- **No Application Load Balancer** — saves ~$16–18/month. CloudFront handles HTTPS, caching, and DDoS protection instead.
- **Minimum Fargate sizing** — 256 CPU / 512 MB is sufficient for a Next.js standalone portfolio.

```
  DNS (Route 53 / GoDaddy)
          │
          ▼
  CloudFront        ← HTTPS · edge caching · DDoS  (~$1–2/month)
          │
          ▼
  ECS Fargate       ← 256 CPU / 512 MB / desired-count=1  (~$9/month)
          │
          ▼
  Amazon ECR        ← keep last 5 images  (<$0.10/month)
```

**Avoid:**
- ❌ Application Load Balancer — adds ~$16/month for a single-task portfolio
- ❌ NAT Gateway — adds ~$32/month; use a public subnet instead
- ❌ Multi-AZ with desired-count=1 — no availability benefit, doubles data transfer cost

---

## Customisation

| File | What to change |
|---|---|
| `src/app/[locale]/layout.tsx` | Page title, meta description, Open Graph tags |
| `messages/en.json` *(+ other locales)* | All visible copy — headlines, bios, service titles, pricing |
| `src/app/globals.css` | Design tokens for both themes (`--bg-base`, `--text-primary`, etc.) |
| `src/app/components/Contact.tsx` | Contact email, LinkedIn URL |
| `tailwind.config.ts` | Breakpoints, font families, border radii |
| `Jenkinsfile` | `ecrRepository`, `ecsCluster`, `ecsService` — change for a different deployment target |

---

## License

[MIT](./LICENSE)
