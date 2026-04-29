<div align="center">

# MokaSoftware Business

**Portfolio & Client-Facing Marketing Site**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-tested-C21325?style=flat-square&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker&logoColor=white)
![AWS ECS](https://img.shields.io/badge/AWS-ECS-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Jenkins](https://img.shields.io/badge/CI%2FCD-Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white)

Personal freelance portfolio for **Bernard D. Mokalo** — Principal Software Engineer & DevOps/Cloud specialist.  
Available in **5 languages** · **Dark/light theme** · **Containerised** · **CI/CD to AWS**

</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Building for Production](#building-for-production)
- [Docker](#docker)
- [CI/CD — Jenkins → AWS](#cicd--jenkins--aws)
- [AWS Cost Guide](#aws-cost-guide)
- [Environment Variables](#environment-variables)
- [Customisation](#customisation)
- [License](#license)

---

## Overview

MokaSoftware Business is a production-grade SSR portfolio with a full client-facing marketing site. It is built for performance, accessibility, and maintainability.

### Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, key metrics (10+ yrs · 60+ projects · 30+ clients) and primary CTAs |
| **About** | Professional bio, specialisations, and technology tags |
| **Services** | 12 service cards — CI/CD, Cloud Architecture, Kubernetes, Full-Stack, Mobile, and more |
| **Skills** | Technology inventory grouped by category with labelled chips |
| **Projects** | Selected case studies with technology tags and external links |
| **Pricing** | Three-tab table — Quick Fixes · Projects · Hourly retainer |
| **Contact** | Validated form submitted via Formspree (no server-side email infrastructure required) |

### Highlights

- **Dark / light mode** — persisted in `localStorage`, defaults to dark
- **5 languages** — English, French, Spanish, German, Portuguese; switchable from the navbar
- **3D card effect** — mouse-tracking tilt and glare on every card (`Card3D`)
- **Mobile-first** — responsive across all breakpoints with a collapsible drawer nav
- **SSR + standalone output** — `output: 'standalone'` for containerised deployment

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) — App Router, Server-Side Rendering |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 · CSS custom properties (light/dark tokens) |
| Internationalisation | [next-intl 3](https://next-intl-docs.vercel.app) — 5 locales |
| Fonts | Inter · Space Grotesk via `next/font/google` |
| Contact form | [Formspree](https://formspree.io) — zero backend dependency |
| Testing | Jest · React Testing Library · `@testing-library/user-event` |
| Container | Docker — Node 20 Alpine, multi-stage, non-root user |
| CI/CD | Jenkins Declarative Pipeline |
| Image registry | Amazon ECR |
| Hosting | Amazon ECS (Fargate) |

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 20 |
| npm | ≥ 10 |
| Docker *(optional — local image builds)* | ≥ 24 |
| AWS CLI *(optional — manual deployments)* | ≥ 2 |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/mokasofthub/moka-software-busness.git
cd moka-software-busness
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app hot-reloads on every file change.

> Locale routes: `/fr` · `/es` · `/de` · `/pt`  
> English is served at `/` (no prefix required).

### 3. Scripts reference

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Compile a production build (`output: 'standalone'`) |
| `npm start` | Start the compiled production server |
| `npm run lint` | Run ESLint across the entire project |
| `npm test` | Run the full test suite once |
| `npm run test:watch` | Re-run affected tests on every file save |
| `npm run test:coverage` | Run tests and generate a coverage report |

---

## Project Structure

```
moka-software-business/
│
├── messages/                        # Translation files (one per locale)
│   ├── en.json
│   ├── fr.json
│   ├── es.json
│   ├── de.json
│   └── pt.json
│
├── public/                          # Static assets (images, icons, fonts)
│
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           # Per-locale layout — ThemeProvider + NextIntlClientProvider
│   │   │   └── page.tsx             # Root page — assembles all section components
│   │   │
│   │   ├── components/
│   │   │   ├── __tests__/           # Component unit tests
│   │   │   ├── About.tsx
│   │   │   ├── BackToTop.tsx        # Floating scroll-to-top button
│   │   │   ├── BottomNav.tsx        # Mobile floating navigation bar
│   │   │   ├── Card3D.tsx           # Mouse-tracking 3D tilt + glare wrapper
│   │   │   ├── Contact.tsx          # Validated form → Formspree
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx           # Sticky nav · theme toggle · language switcher · mobile drawer
│   │   │   ├── Pricing.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── ThemeProvider.tsx    # React context — dark/light state + localStorage persistence
│   │   │
│   │   ├── globals.css              # CSS custom property tokens · Tailwind layers · utilities
│   │   └── layout.tsx               # Root layout
│   │
│   ├── lib/
│   │   └── utils.ts                 # Shared pure helpers (e.g. isValidEmail)
│   │
│   ├── __tests__/
│   │   └── utils.test.ts
│   │
│   ├── i18n.ts                      # next-intl configuration (locales, defaultLocale)
│   └── middleware.ts                # next-intl routing middleware
│
├── Dockerfile                       # Multi-stage production container image
├── .dockerignore
├── Jenkinsfile                      # Declarative CI/CD pipeline (lint → build → ECR → ECS)
├── jest.config.ts
├── jest.setup.ts
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Testing

The project uses **Jest** with **React Testing Library** and **`@testing-library/user-event`** for full user-interaction simulation.

### Run all tests

```bash
npm test
```

### Watch mode

```bash
npm run test:watch
```

Only the tests affected by your latest change are re-run — fast feedback during development.

### Coverage report

```bash
npm run test:coverage
```

A summary table is printed to the terminal. A detailed, line-by-line HTML report is written to `coverage/lcov-report/index.html`:

```bash
# macOS — open the report directly in the browser
npm run test:coverage && open coverage/lcov-report/index.html
```

### Scoped runs

```bash
# Single component
npm test -- --testPathPattern="Contact"

# All component tests
npm test -- --testPathPattern="components"

# Coverage scoped to source files only
npm test -- --coverage --collectCoverageFrom="src/**/*.{ts,tsx}"
```

### Test coverage map

| File | What is covered |
|---|---|
| `utils.test.ts` | `isValidEmail` — valid addresses, malformed addresses, edge cases |
| `ThemeProvider.test.tsx` | Default dark theme, `localStorage` restore on mount, dark↔light toggle, multi-toggle persistence |
| `Card3D.test.tsx` | Renders children, applies perspective transform on `mouseMove`, resets on `mouseLeave`, glare overlay visibility |
| `Hero.test.tsx` | Availability badge, both headline lines, CTA `href` attributes, all four stat values and labels |
| `Contact.test.tsx` | Field rendering, all client-side validation paths, successful submission, Formspree server error, network failure, loading/disabled state, exact POST payload |
| `Navbar.test.tsx` | Logo anchor, all nav link `href` values, Hire Me link, theme toggle button, mobile hamburger open/close, language dropdown appearance |

---

## Building for Production

```bash
npm run build
```

Next.js compiles the application into `.next/standalone/` — a self-contained Node.js server with only the files needed at runtime. No `node_modules` copy is required in the production image.

---

## Docker

### Build the image

```bash
docker build -t moka-software-business .
```

The `Dockerfile` uses a three-stage build to minimise the final image size:

| Stage | Base image | Responsibility |
|---|---|---|
| `deps` | `node:20-alpine` | Install production and dev dependencies via `npm ci` |
| `builder` | `node:20-alpine` | Compile the Next.js standalone output |
| `runner` | `node:20-alpine` | Minimal runtime — copies only the compiled artefact, runs as non-root `nextjs` user |

> The final image is approximately **150 MB** — no dev dependencies, no build cache, Alpine base.

### Run locally

```bash
docker run -p 3000:3000 moka-software-business
```

Open [http://localhost:3000](http://localhost:3000).

---

## CI/CD — Jenkins → AWS

The complete pipeline is defined in [`Jenkinsfile`](./Jenkinsfile). Every push to any branch triggers a build. Deployment to AWS only happens on merges to `main`.

### Pipeline flow

```
 Developer
     │
     │  git push origin <branch>
     ▼
 GitHub Repository
     │
     │  Webhook  POST /github-webhook/
     ▼
 Jenkins
     │
     ├── Stage 1 · Checkout ────────────── Clone repo · log branch + commit SHA
     ├── Stage 2 · Install ──────────────── npm ci
     ├── Stage 3 · Lint ─────────────────── npm run lint
     ├── Stage 4 · Build ────────────────── npm run build        (all branches)
     │
     │  ┌──────────────────────────────────────────────────────────┐
     │  │  main branch only                                        │
     │  ├──────────────────────────────────────────────────────────┤
     ├── Stage 5 · Docker Build & Push                             │
     │       Authenticate to Amazon ECR                            │
     │       Create ECR repository if absent  (idempotent)         │
     │       docker build → tag as <commit-sha> and latest         │
     │       docker push both tags                                  │
     │                                                              │
     └── Stage 6 · Deploy to ECS                                   │
             Fetch current task definition                          │
             Inject new image URI into container definition         │
             Register new task definition revision                  │
             aws ecs update-service  (rolling deployment)           │
             aws ecs wait services-stable                           │
             └──────────────────────────────────────────────────────┘
```

> Pull request branches execute **stages 1–4 only** (CI validation). Nothing is pushed to ECR or deployed to AWS.

---

### Jenkins setup

#### 1. Store AWS credentials

Navigate to **Manage Jenkins → Credentials → Global** and add two **Secret text** entries:

| Credential ID | Value |
|---|---|
| `aws-access-key-id` | Your IAM access key ID |
| `aws-secret-access-key` | Your IAM secret access key |

#### 2. Install required plugins

| Plugin | Purpose |
|---|---|
| **GitHub** | Receives webhook events · provides `GIT_BRANCH` / `GIT_COMMIT` |
| **Pipeline** | Declarative pipeline support (pre-installed on most Jenkins) |
| **Credentials Binding** | Exposes secrets as environment variables inside `withCredentials` |

#### 3. Create the job

1. **New Item** → choose **Pipeline** (single branch) or **Multibranch Pipeline**
2. Set **Source** to GitHub and provide your repository URL
3. Set **Script path** to `Jenkinsfile`
4. Enable **"GitHub hook trigger for GITScm polling"**

#### 4. Configure the GitHub webhook

In your GitHub repository → **Settings → Webhooks → Add webhook**:

| Field | Value |
|---|---|
| Payload URL | `http://<your-jenkins-host>/github-webhook/` |
| Content type | `application/json` |
| Trigger | **Just the push event** |

#### 5. Agent requirements

The Jenkins build agent must have the following installed:

- `node` ≥ 20 and `npm`
- `docker` (daemon must be accessible by the Jenkins user)
- `aws` CLI v2
- `python3`

#### 6. Update pipeline environment variables

Edit the `environment {}` block at the top of `Jenkinsfile`:

```groovy
AWS_REGION     = 'us-east-1'              // Target AWS region
ECR_REPOSITORY = 'moka-software-business' // ECR repository name
ECS_CLUSTER    = 'moka-cluster'           // ECS cluster name
ECS_SERVICE    = 'moka-service'           // ECS service name
```

---

### IAM policy

The IAM user whose keys are stored in Jenkins requires the following minimum permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
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
        "ecs:DescribeTaskDefinition",
        "ecs:RegisterTaskDefinition",
        "ecs:UpdateService",
        "ecs:DescribeServices",
        "iam:PassRole"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## AWS Cost Guide

This section documents how the pipeline and AWS resources are configured to keep costs as low as possible for a portfolio / low-traffic site.

### Monthly cost estimate

| Resource | Spec | Est. cost / month |
|---|---|---|
| ECS Fargate task | 256 CPU · 512 MB · always-on | ~$9 |
| ECR storage | ≤ 5 images × ~150 MB | < $0.10 |
| CloudFront | Low-traffic portfolio | ~$1–2 |
| Route 53 hosted zone | 1 zone | ~$0.50 |
| ALB | **Not used** | $0 |
| **Total** | | **~$11–12 / month** |

> Prices based on `us-east-1` (Virginia) as of 2025. Actual charges depend on traffic volume and AWS pricing changes.

---

### Cost decisions baked into the pipeline

#### 1. ECR lifecycle policy — automatic image expiry

Old container images accumulate at **$0.10 / GB / month**. The pipeline applies a lifecycle policy that retains only the **5 most recent images** and expires everything older, keeping storage costs negligible.

This is applied idempotently on every `main` push — no manual setup required.

#### 2. Single-task rolling deployment

With `desired count = 1`, the default ECS deployment config (`minimumHealthyPercent=100`) forces ECS to spin up a **second task** alongside the old one during every deploy, briefly doubling Fargate compute cost.

The pipeline uses:

```
--deployment-configuration minimumHealthyPercent=0,maximumPercent=100
```

This tells ECS to **stop the old task first**, then start the new one. The portfolio experiences ~5 seconds of downtime per deploy, which is an acceptable trade-off for a personal site.

#### 3. No Application Load Balancer

An ALB costs a flat **~$16–18 / month** regardless of traffic — nearly twice the Fargate compute cost for this setup. The recommended architecture avoids one entirely:

```
Internet → CloudFront → ECS public IP  (direct, no ALB)
```

CloudFront handles HTTPS termination, caching, and DDoS protection. For a static or low-dynamic portfolio this is sufficient and far cheaper.

> If you need sticky sessions or multiple tasks in the future, add an ALB then. For a single-task portfolio, CloudFront → ECS IP is the right choice.

#### 4. Minimum Fargate task sizing

Configure your ECS task definition with the **minimum Fargate allocation**. Next.js standalone with ~150 MB RAM idle is well within limits:

| CPU units | Memory | vCPU | Cost / month |
|---|---|---|---|
| 256 | 512 MB | 0.25 | ~$9 |
| 512 | 1 GB | 0.5 | ~$18 |
| 1024 | 2 GB | 1 | ~$36 |

Use **256 CPU / 512 MB** unless profiling shows higher memory usage.

---

### Recommended AWS setup (cheapest viable architecture)

```
Route 53 (DNS)
    │
    ▼
CloudFront distribution  ←  HTTPS, caching, DDoS protection  (~$1–2/month)
    │
    ▼
ECS Fargate task         ←  256 CPU / 512 MB / desired-count=1  (~$9/month)
    │  (public subnet, security group: allow 80/443 from CloudFront prefix list)
    ▼
Amazon ECR               ←  lifecycle policy: keep last 5 images  (~$0.10/month)
```

**What to avoid:**
- ❌ Application Load Balancer — adds ~$16/month for a single-task portfolio
- ❌ NAT Gateway — ~$32/month; use a public subnet instead
- ❌ Multiple AZs for desired-count=1 — no benefit, just doubles data transfer

---

### Alternative: AWS App Runner (~$1–5 / month)

If you want to go even cheaper, **AWS App Runner** is a fully-managed service that:

- Requires no ECS cluster, no task definitions, no networking setup
- Scales **to zero** when idle (no traffic = near-zero compute cost)
- Provides built-in HTTPS with a managed certificate
- Deploys directly from an ECR image

Switching to App Runner requires replacing the `Deploy to ECS` stage in the `Jenkinsfile` with a single App Runner deploy command. The Docker image and ECR push stages remain unchanged.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local overrides. This file is gitignored and never committed.

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Yes | Your Formspree form ID (e.g. `xabcdefg`). Injected at build time via Docker `--build-arg`. For local dev, add to `.env.local`. |

Create `.env.local` for local development (gitignored):

```bash
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_form_id_here
```

---

## Customisation

| File | What to change |
|---|---|
| `src/app/[locale]/layout.tsx` | Page title, meta description, Open Graph tags |
| `messages/en.json` *(and other locales)* | All visible copy — headlines, bios, service titles, pricing |
| `src/app/globals.css` | Design tokens (`--bg-base`, `--text-primary`, etc.) for both themes |
| `src/app/components/Contact.tsx` | Contact email address, LinkedIn URL, Formspree form ID |
| `tailwind.config.ts` | Breakpoints, font families, border radii |
| `Jenkinsfile` | `AWS_REGION`, `ECR_REPOSITORY`, `ECS_CLUSTER`, `ECS_SERVICE` |

---

## License

[MIT](./LICENSE) — free to use and adapt for your own portfolio.

