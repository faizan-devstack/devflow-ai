# DevFlow AI — Claude Code Project Memory

## What This Project Is
DevFlow AI is a SaaS productivity platform for small software dev teams and agencies.
It combines two core features:
1. **StandupAI** — async daily standup input → AI summarizes → weekly sprint digests auto-emailed to team/client
2. **Codebase Onboarding Agent** — paste a GitHub repo URL → AI reads the codebase → generates interactive onboarding doc + Q&A chat grounded in real code

Target users: small dev agencies (2–10 devs), freelancers managing clients, junior devs onboarding to new projects.

**Current Status:** Phase 1 (auth + landing pages + dashboard layout) ✅ — Phase 2-6 in progress

---

### UI Component Implementation Guidelines (Generic)

When creating or modifying **any UI component** in the project, strictly follow these rules:

#### 1. Styling & Theming (Critical)
- Always use ShadCN UI components as the base (`Card`, `Button`, `Dialog`, `Input`, `Label`, etc.)
- **Never** use default Tailwind color classes (e.g. `bg-primary`, `text-muted-foreground`, `border-input`)
- Replace them with DesignRift theme classes:
  - Card backgrounds: `bg-canvas-bg-subtle`
  - Card borders: `border-canvas-border/50`
  - Card rounding: `rounded-xl`
  - Primary text: `text-canvas-text-contrast`
  - Secondary/muted text: `text-canvas-text`
  - Primary buttons: `bg-primary-solid text-primary-on-primary hover:bg-primary-solid-hover`
  - Destructive buttons: `bg-alert-solid text-alert-on-alert hover:bg-alert-solid-hover`
  - Outline buttons: `border-canvas-border/50 text-canvas-text-contrast hover:bg-canvas-bg`
  - Dialog content: `bg-canvas-base border-canvas-border/50`
  - Muted text in forms: `text-canvas-text`

#### 2. Icons
- Always use Phosphor Icons from `react-icons/pi`
- Import example: `import { PiUser, PiLockKey, PiWarningCircle } from 'react-icons/pi'`
- Never use lucide-react, heroicons, or any other icon library

#### 3. Animations (Required for all interactive elements)
- Wrap main containers with Framer Motion
- Use `motion.div` with these variants:
  - Container: `containerVariants` with `staggerChildren: 0.08`
  - Individual items/cards: `itemVariants` + `whileHover={{ y: -1 }}`
- Cards should have subtle hover lift effect
- Modals/dialogs should have smooth scale + fade animations

#### 4. General Layout Rules
- Main container spacing: `space-y-6`
- Card content padding and alignment should feel spacious and clean
- All pages and sections must be fully responsive (mobile-first)
- Maintain consistent visual hierarchy

#### 5. Component-Specific Patterns
- Personal/Profile sections → Use `PiUser`
- Security/Password sections → Use `PiLockKey`
- Danger/Delete actions → Use `PiWarningCircle` + `alert-*` colors
- Edit actions → Use `PiPencilSimple`
- Sign out actions → Use `PiSignOut`

Follow these guidelines consistently across the entire project to maintain a cohesive, professional DesignRift aesthetic.

---

## Tech Stack (STRICT — do not deviate without asking)
- **Framework**: Next.js 16.2.4, App Router, TypeScript strict mode, React Compiler enabled
- **Styling**: Tailwind CSS v4 + DesignRift custom theme (see Color System below)
- **UI Components**: ShadCN — always replace default color classes with DesignRift theme classes
- **Icons**: react-icons/pi (Phosphor Icons) — NEVER use lucide-react or heroicons
- **Auth**: Better Auth 1.6.9 (email/password + Google OAuth) + Resend for emails
  - Session access: `const session = await auth.api.getSession({ headers: await headers() })`
  - Client hook: `const { data: session } = useSession()` from `@/lib/auth-client`
- **ORM**: Prisma 7.8.0 + @prisma/adapter-pg for PostgreSQL (NeonDB)
  - Prisma client at: `src/generated/prisma/client.ts`
  - Singleton import: `import { prisma } from '@/lib/db/prisma'`
- **Vector DB**: pgvector extension on NeonDB (same DB, to be added in Phase 3)
- **AI**: Claude API — model: `claude-sonnet-4-5` (never change)
- **Embeddings**: OpenAI text-embedding-3-small (1536 dimensions)
- **Email**: Resend 6.12.2 (free tier — 3k/mo)
- **Animations**: Framer Motion 12.38.0
- **Hosting**: Vercel

---

## Color System (CRITICAL — read before writing any UI)

This project uses a DesignRift custom theme. Colors are available as Tailwind utility classes.
**NEVER hardcode hex values. NEVER use default Tailwind colors (blue-500, gray-200 etc).**
**ALWAYS use the theme classes below.**

### How to use:
```
text-canvas-text-contrast    → primary text (headings)
text-canvas-text             → secondary/muted text
text-primary-text            → teal brand text
text-primary-solid           → strong teal (buttons, highlights)
text-secondary-solid         → pink accent
bg-canvas-base               → page background
bg-canvas-bg-subtle          → subtle card background
bg-canvas-bg                 → card / elevated surface
bg-primary-bg                → teal tinted background
bg-primary-solid             → teal filled button
bg-secondary-solid           → pink filled button
border-canvas-border/50      → default border (always 50% opacity)
border-primary-border/50     → teal border
border-secondary-border/50   → pink border
```

### Full token groups available:
- `canvas-*` — neutral grays (base, bg-subtle, bg, bg-hover, bg-active, line, border, border-hover, solid, solid-hover, text, text-contrast, on-canvas)
- `primary-*` — teal brand color (same pattern)
- `secondary-*` — pink accent color (same pattern)
- `success-*` — green
- `warning-*` — yellow
- `alert-*` — red
- `info-*` — blue

### ShadCN Override Rule:
When installing/using any ShadCN component, replace ALL of its default color classes:
- `bg-primary` → `bg-primary-solid`
- `text-primary-foreground` → `text-primary-on-primary`
- `bg-secondary` → `bg-canvas-bg`
- `text-muted-foreground` → `text-canvas-text`
- `border-input` → `border-canvas-border/50`
- `ring-ring` → `ring-primary-solid`
- `bg-background` → `bg-canvas-base`
- `bg-card` → `bg-canvas-bg-subtle`

---

## Design Principles (FOLLOW ALWAYS)
- **Modern & Minimalist** — professional SaaS aesthetic, clean whitespace
- **Borders**: always add `/50` opacity → `border-canvas-border/50`
- **Animations**: use Framer Motion on ALL interactive elements — cards, modals, list items, page transitions
- **Icons**: always use `react-icons/pi` (Phosphor Icons) — import as `import { PiX } from 'react-icons/pi'`
- **Responsive**: mobile-first, all layouts must work on mobile
- **Dark mode**: theme supports it via `.dark` class — always test mentally

---

## Project File Structure

### CURRENTLY EXISTS:
```
src/
├── app/
│   ├── layout.tsx                # Root layout + theme provider
│   ├── page.tsx                  # Landing page (hero + features + FAQ)
│   ├── globals.css               # DesignRift theme tokens (canvas-*, primary-*, etc.)
│   ├── (auth)/                   # Better Auth routes (public)
│   │   ├── layout.tsx
│   │   ├── sign-in/page.tsx      # Email/password + Google OAuth signin
│   │   ├── sign-up/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (app)/                    # Protected routes (auth required)
│   │   ├── dashboard/
│   │   │   ├── layout.tsx        # SidebarProvider + DashboardSidebar
│   │   │   ├── page.tsx          # Overview cards (standup, onboarding, settings)
│   │   │   ├── standup/          # ❌ NOT YET BUILT
│   │   │   ├── onboarding/       # ❌ NOT YET BUILT
│   │   │   └── settings/         # ❌ NOT YET BUILT
│   │   └── (website)/            # Public pages (about, privacy, terms)
│   │       ├── about/page.tsx
│   │       ├── privacy/page.tsx
│   │       └── terms/page.tsx
│   └── api/
│       ├── auth/[...all]/route.ts       # Better Auth route handler
│       ├── user/update-profile/route.ts # PATCH user profile (needs session)
│       ├── user/update-password/route.ts
│       ├── user/resend-verification/route.ts
│       └── og/route.tsx                 # OG image generation
├── components/
│   ├── ui/                       # ShadCN: accordion, avatar, badge, button, card, dialog, etc. (20+ components)
│   ├── animations/
│   │   ├── TextRotate.tsx
│   │   └── WaveDivider.tsx
│   ├── auth/
│   │   ├── sign-in-card.tsx       # Email/password + Google signin form
│   │   ├── sign-up-card.tsx
│   │   ├── forgot-password-card.tsx
│   │   └── reset-password-card.tsx
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── FAQAndCTA.tsx
│   ├── layout/
│   │   ├── dashboard/
│   │   │   └── dashboard-sidebar.tsx   # Nav with topNav (Standup, Onboarding) + Settings
│   │   ├── header/
│   │   │   └── header.tsx
│   │   ├── footer/
│   │   │   └── footer.tsx
│   │   └── theme/
│   │       └── theme-toggle.tsx
│   ├── pages/
│   │   ├── settings-page.tsx           # ❌ PLACEHOLDER
│   │   └── dashboard/
│   │       └── dashboard-content.tsx   # Cards linking to features
│   ├── providers/
│   │   └── auth-provider.tsx           # Provides useSession hook
│   └── generated/                      # Auto-generated Prisma types
│       └── prisma/
├── lib/
│   ├── auth.ts                   # Better Auth config + Session type export
│   ├── auth-client.ts            # createAuthClient for useSession hook
│   ├── auth-utils.ts             # getAuthSession(), response helpers
│   ├── db/prisma.ts              # Prisma client singleton (adapter-pg)
│   ├── email.ts                  # Resend integration (verification + password reset)
│   ├── metadata.ts               # Metadata helpers
│   ├── password-strength.ts      # Password strength check
│   ├── utils.ts                  # cn(), general utilities
│   ├── ai/                       # ❌ NOT YET BUILT (standup.ts, digest.ts, ingest.ts, chat.ts)
│   ├── embeddings.ts             # ❌ NOT YET BUILT
│   ├── github.ts                 # ❌ NOT YET BUILT
│   └── clerk-appearance.ts       # (Not used, legacy)
└── hooks/
    └── use-mobile.ts             # Mobile breakpoint hook
prisma/
├── schema.prisma                 # Schema (only Better Auth tables currently)
└── migrations/
    └── 20260426144327_init/      # Initial migration (User, Session, Account, Verification tables)
```

### TO BE BUILT:
```
src/
├── app/(app)/dashboard/
│   ├── standup/
│   │   ├── page.tsx              # Standup form + team feed
│   │   └── [sprintId]/
│   │       └── page.tsx          # Sprint detail + digest view
│   ├── onboarding/
│   │   ├── page.tsx              # Repo list
│   │   └── [repoId]/
│   │       └── page.tsx          # Onboarding doc + Q&A chat
│   └── settings/
│       └── page.tsx              # Team settings, RBAC, notifications
├── api/
│   ├── standup/
│   │   ├── submit/route.ts       # POST: standup entry
│   │   └── digest/route.ts       # POST: generate + email digest
│   ├── onboarding/
│   │   ├── ingest/route.ts       # POST: ingest repo, chunk, embed, store
│   │   ├── chat/route.ts         # POST: RAG Q&A (streaming)
│   │   └── scan-status/route.ts  # GET: progress of repo ingestion
│   └── webhooks/
│       └── health/route.ts       # Health check for cron jobs
├── components/
│   ├── standup/
│   │   ├── standup-form.tsx
│   │   ├── standup-entry-card.tsx
│   │   ├── team-feed.tsx
│   │   ├── sprint-digest-view.tsx
│   │   └── blocker-badge.tsx
│   ├── onboarding/
│   │   ├── repo-list.tsx
│   │   ├── onboarding-doc.tsx
│   │   ├── qa-chat.tsx
│   │   ├── code-block.tsx
│   │   └── ingest-dialog.tsx
├── lib/
│   ├── ai/
│   │   ├── standup.ts            # Claude: summarize standup
│   │   ├── digest.ts             # Claude: generate weekly digest
│   │   ├── ingest.ts             # Code chunking + semantic upload
│   │   └── chat.ts               # Claude: RAG Q&A chain
│   ├── embeddings.ts             # OpenAI embed function
│   ├── github.ts                 # Clone + parse repos
│   └── code-language.ts          # HuggingFace language detection
├── actions/
│   ├── standup.ts                # Server actions for standup
│   ├── onboarding.ts             # Server actions for repo onboarding
│   └── team.ts                   # Team RBAC actions
└── types/
    └── index.ts                  # Types for all models + enums (Role enum)
prisma/
├── schema.prisma                 # Extended with Team, Sprint, StandupEntry, Repo, RepoChunk, OnboardingSession
└── migrations/
    ├── 20260426144327_init/      # Current init
    └── [NEXT_DATE]_add_features/ # Phase 3: add feature tables + pgvector
```

---

## Current Database Schema (Prisma)

```prisma
// Currently deployed — only Better Auth tables

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]

  @@map("user")
}

model Session {
  id        String   @id @default(cuid())
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("session")
}

model Account {
  id                    String    @id @default(cuid())
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@map("account")
}

model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("verification")
}
```

### TO BE ADDED IN PHASE 3:

```prisma
// Roles enum for RBAC
enum Role {
  OWNER       // Can invite, RBAC, delete team, manage all features
  MEMBER      // Can submit standups, view team feed, use onboarding
  VIEWER      // Read-only access to standup feed and digests
}

// Team & Sprint
model Team {
  id            String   @id @default(cuid())
  name          String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  deletedAt     DateTime?
  members       TeamMember[]
  sprints       Sprint[]
  repos         Repo[]
}

model TeamMember {
  id       String  @id @default(cuid())
  userId   String
  teamId   String
  role     Role    @default(MEMBER)
  user     User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  team     Team    @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@unique([userId, teamId])
}

model Sprint {
  id            String   @id @default(cuid())
  teamId        String
  team          Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  name          String
  startDate     DateTime
  endDate       DateTime
  entries       StandupEntry[]
  digest        String?  // AI-generated HTML
  digestSentAt  DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  deletedAt     DateTime?
}

model StandupEntry {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  sprintId      String
  sprint        Sprint   @relation(fields: [sprintId], references: [id], onDelete: Cascade)
  didToday      String   // Raw user input
  doingNext     String   // Raw user input
  blockers      String?  // Raw user input
  summary       String?  // AI-generated structured summary
  hasBlocker    Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Codebase Onboarding
model Repo {
  id            String   @id @default(cuid())
  teamId        String
  team          Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  githubUrl     String
  name          String
  description   String?
  onboardingDoc String?  // AI-generated markdown
  ingestStatus  String   @default("pending") // pending, ingesting, complete, error
  ingestError   String?
  chunks        RepoChunk[]
  sessions      OnboardingSession[]
  ingestedAt    DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  deletedAt     DateTime?
}

model RepoChunk {
  id            String   @id @default(cuid())
  repoId        String
  repo          Repo     @relation(fields: [repoId], references: [id], onDelete: Cascade)
  filePath      String
  content       String   // max ~2000 chars
  language      String?  // programming language (auto-detected)
  embedding     Unsupported("vector(1536)")? // pgvector for semantic search
  createdAt     DateTime @default(now())
}

model OnboardingSession {
  id            String   @id @default(cuid())
  repoId        String
  repo          Repo     @relation(fields: [repoId], references: [id], onDelete: Cascade)
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  messages      Json     // [{role: "user"|"assistant", content: string}]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## Key Implementation Rules

### API Routes
- Always validate request body before processing
- Always call `auth()` from Clerk before any DB operation
- Return proper status codes: 200, 201, 400, 401, 403, 500
- Wrap everything in try/catch — return `{ error: message }` on failure
- Stream AI responses using `StreamingTextResponse` from `ai` package

### Server Actions
- Use `'use server'` directive
- Validate with Zod before DB writes
- Revalidate paths with `revalidatePath()` after mutations

### Prisma Rules
- Always use `prisma` singleton from `src/lib/db/prisma.ts`
- Use `prisma.$transaction()` for multi-step writes
- Soft deletes: add `deletedAt DateTime?` — never use `prisma.X.delete()`
- After schema changes: run `npx prisma db push` then `npx prisma generate`

### Claude API Rules
- Model: always `claude-sonnet-4-5`
- Max tokens: 1024 for summaries, 2048 for digests, 4096 for onboarding docs
- Always use system + user message structure
- Use XML tags in prompts for structure: `<task>`, `<context>`, `<format>`
- Stream responses for any user-facing AI call

### Framer Motion Rules
- Page transitions: use `AnimatePresence` + `motion.div` with `initial/animate/exit`
- Cards: `whileHover={{ y: -2 }}` + `transition={{ duration: 0.2 }}`
- List items: stagger children with `variants` + `staggerChildren: 0.05`
- Modals: scale from 0.95 + fade in
- Loading states: subtle pulse animation

---

## Environment Variables Required
```
# Database — NeonDB
DEVFLOW_AI_DATABASE_URL=postgresql://user:password@host/dbname?schema=public
DIRECT_URL=postgresql://user:password@host/dbname  # Direct (no pooling) for migrations

# Better Auth
BETTER_AUTH_SECRET=<random-secret-key>
NEXT_PUBLIC_APP_URL=http://localhost:3000           # or https://yourapp.com in prod

# Google OAuth
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>

# Email — Resend
RESEND_API_KEY=<resend-api-key>

# AI APIs
ANTHROPIC_API_KEY=<claude-api-key>
OPENAI_API_KEY=<openai-api-key>

# Optional: GitHub (for higher rate limits)
GITHUB_TOKEN=<github-personal-access-token>
```

---

## Commands Reference
```bash
# Development
npm run dev                  # Start dev server (http://localhost:3000)
npm run build               # Build for production (runs prisma generate first)

# Database
npx prisma db push          # Push schema changes to dev database
npx prisma migrate dev --name description  # Create + apply migration
npx prisma generate         # Regenerate Prisma client types
npx prisma studio           # Open database GUI
npx prisma db seed          # Seed database (if seed.ts exists)

# Type checking
npx tsc --noEmit            # Check for TypeScript errors
npm run lint                # Run ESLint

# Production
npm run start                # Run production server
```

---

## What's Already Done / What's Not

### ✅ PHASE 1 — AUTH & LANDING (COMPLETE)
- [x] Better Auth setup (email/password + Google OAuth)
- [x] Prisma ORM with PostgreSQL (NeonDB) + adapter-pg
- [x] User/Session/Account/Verification tables deployed
- [x] Email verification + password reset (Resend)
- [x] Sign-in/sign-up pages with validated forms
- [x] Landing page (hero, features, how-it-works, FAQ)
- [x] DesignRift theme fully configured in globals.css
- [x] ShadCN UI components installed and themed
- [x] React Compiler enabled
- [x] Dashboard layout with sidebar navigation
- [x] Dashboard main page with feature cards
- [x] Resend email templates working

### ❌ PHASE 2 — FRONTEND WITH MOCK DATA (NOT STARTED)
- [ ] /dashboard/standup/page.tsx — standup form + team feed
- [ ] /dashboard/standup/[sprintId]/page.tsx — sprint digest view
- [ ] /dashboard/onboarding/page.tsx — repo list
- [ ] /dashboard/onboarding/[repoId]/page.tsx — onboarding doc + Q&A chat UI
- [ ] Standup components (form, entry card, team feed, blocker badge)
- [ ] Onboarding components (repo list, doc viewer, chat UI, code block)
- [ ] Mock data for standup entries (10+ entries per sprint)
- [ ] Mock data for repos (GitHub repos with chunked code)
- [ ] Mock onboarding sessions
- [ ] Settings page (placeholder) → team settings UI
- [ ] RBAC-aware UI (show different content based on role)

### ❌ PHASE 3 — DATABASE SCHEMA & MIGRATIONS (NOT STARTED)
- [ ] Extended Prisma schema (Team, TeamMember, Sprint, StandupEntry, Repo, RepoChunk, OnboardingSession)
- [ ] Role enum (OWNER, MEMBER, VIEWER)
- [ ] Create migration: `add_features_tables`
- [ ] Deploy pgvector extension to NeonDB
- [ ] Update RepoChunk model with Unsupported("vector(1536)")
- [ ] Run `npx prisma db push` + `npx prisma generate`
- [ ] Verify User, Team, and relationship models work

### ❌ PHASE 4 — CORE API ROUTES (NOT STARTED)
- [ ] POST /api/standup/submit — submit standup entry
- [ ] POST /api/standup/digest — generate + email sprint digest
- [ ] POST /api/onboarding/ingest — ingest GitHub repo
- [ ] POST /api/onboarding/chat — RAG Q&A chat (streaming)
- [ ] GET /api/onboarding/scan-status — ingest progress
- [ ] Auth middleware for all routes
- [ ] Zod validation schemas for all routes

### ❌ PHASE 5 — AI FEATURES (NOT STARTED)
- [ ] src/lib/ai/standup.ts — Claude standup summarizer
- [ ] src/lib/ai/digest.ts — Claude sprint digest generator
- [ ] src/lib/ai/ingest.ts — Code chunking + GitHub integration
- [ ] src/lib/ai/chat.ts — Claude RAG Q&A chain
- [ ] src/lib/embeddings.ts — OpenAI embed function
- [ ] src/lib/github.ts — GitHub REST API helpers
- [ ] Semantic search with pgvector

### ❌ PHASE 6 — SERVER ACTIONS & EMAIL (NOT STARTED)
- [ ] Server actions for standup form submission
- [ ] Server actions for repo ingestion
- [ ] Cron job setup for digest generation (Vercel)
- [ ] Email template for sprint digest (Resend)
- [ ] Send digest emails to team
- [ ] Real-time progress updates for repo ingestion
