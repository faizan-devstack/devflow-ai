# DevFlow AI — Claude Code Project Memory

## What This Project Is
DevFlow AI is a SaaS productivity platform for small software dev teams and agencies.
It combines two core features:
1. **StandupAI** — async daily standup input → AI summarizes → weekly sprint digests auto-emailed to team/client
2. **Codebase Onboarding Agent** — paste a GitHub repo URL → AI reads the codebase → generates interactive onboarding doc + Q&A chat grounded in real code

Target users: small dev agencies (2–10 devs), freelancers managing clients, junior devs onboarding to new projects.

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
- **Framework**: Next.js latest stable (16.x), App Router, TypeScript strict mode
- **Styling**: Tailwind CSS v4 + DesignRift custom theme (see Color System below)
- **UI Components**: ShadCN — always replace default color classes with DesignRift theme classes
- **Icons**: react-icons/pi (Phosphor Icons) — NEVER use lucide-react or heroicons
- **ORM**: Prisma ORM with NeonDB (PostgreSQL)
- **Vector DB**: pgvector extension on NeonDB (same DB, no separate service)
- **Auth**: Clerk (team/org support, Next.js App Router native)
- **AI**: Claude API — model: `claude-sonnet-4-5` (never change this model)
- **Email**: Resend (free tier — 3k/mo)
- **Animations**: Framer Motion — all interactive elements must have animations
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
```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Clerk auth routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── layout.tsx            # Dashboard shell with sidebar
│   │   ├── page.tsx              # Main dashboard overview
│   │   ├── standup/              # StandupAI feature
│   │   │   ├── page.tsx          # Today's standup + team feed
│   │   │   └── [sprintId]/       # Sprint detail view
│   │   ├── onboarding/           # Codebase onboarding feature
│   │   │   ├── page.tsx          # Repo list
│   │   │   └── [repoId]/         # Onboarding doc + Q&A chat
│   │   └── settings/             # Team settings, notifications
│   └── api/                      # API routes
│       ├── standup/
│       │   ├── submit/route.ts   # POST: submit standup entry
│       │   └── digest/route.ts   # POST: generate sprint digest (also cron)
│       ├── onboarding/
│       │   ├── ingest/route.ts   # POST: ingest GitHub repo
│       │   └── chat/route.ts     # POST: Q&A chat stream
│       └── webhooks/
│           └── clerk/route.ts    # Clerk user sync
├── components/
│   ├── ui/                       # ShadCN base components (theme-overridden)
│   ├── standup/                  # StandupAI components
│   ├── onboarding/               # Onboarding agent components
│   ├── dashboard/                # Dashboard shell components
│   └── shared/                   # Shared: Logo, Nav, ThemeToggle etc
├── lib/
│   ├── db/
│   │   └── prisma.ts             # Prisma client singleton
│   ├── ai/
│   │   ├── standup.ts            # Claude API: standup summarizer chain
│   │   ├── digest.ts             # Claude API: sprint digest generator
│   │   ├── ingest.ts             # Code chunking + embedding logic
│   │   └── chat.ts               # Claude API: codebase Q&A chain
│   ├── github.ts                 # GitHub REST API helpers
│   ├── embeddings.ts             # OpenAI text-embedding-3-small wrapper
│   └── resend.ts                 # Email sending helpers
├── actions/                      # Next.js Server Actions
│   ├── standup.ts
│   ├── onboarding.ts
│   └── team.ts
└── types/
    └── index.ts                  # Shared TypeScript types
prisma/
└── schema.prisma                 # Prisma schema (source of truth for DB)
```

---

## Database Schema (Prisma — source of truth)

```prisma
// Key models — always check prisma/schema.prisma before any DB operation

model User {
  id            String   @id              // Clerk user ID
  email         String   @unique
  name          String?
  teamId        String?
  team          Team?    @relation(fields: [teamId], references: [id])
  standups      StandupEntry[]
  createdAt     DateTime @default(now())
}

model Team {
  id            String   @id @default(cuid())
  name          String
  clerkOrgId    String   @unique
  members       User[]
  sprints       Sprint[]
  repos         Repo[]
  createdAt     DateTime @default(now())
}

model Sprint {
  id            String   @id @default(cuid())
  teamId        String
  team          Team     @relation(fields: [teamId], references: [id])
  name          String
  startDate     DateTime
  endDate       DateTime
  entries       StandupEntry[]
  digest        String?  // AI-generated weekly summary
  digestSentAt  DateTime?
  createdAt     DateTime @default(now())
}

model StandupEntry {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  sprintId      String
  sprint        Sprint   @relation(fields: [sprintId], references: [id])
  didToday      String   // raw input
  doingNext     String   // raw input
  blockers      String?  // raw input
  summary       String   // AI-generated structured summary
  hasBlocker    Boolean  @default(false)
  createdAt     DateTime @default(now())
}

model Repo {
  id            String   @id @default(cuid())
  teamId        String
  team          Team     @relation(fields: [teamId], references: [id])
  githubUrl     String
  name          String
  description   String?
  onboardingDoc String?  // AI-generated markdown doc
  chunks        RepoChunk[]
  sessions      OnboardingSession[]
  ingestedAt    DateTime?
  createdAt     DateTime @default(now())
}

model RepoChunk {
  id            String   @id @default(cuid())
  repoId        String
  repo          Repo     @relation(fields: [repoId], references: [id])
  filePath      String
  content       String
  embedding     Unsupported("vector(1536)")?  // pgvector
  createdAt     DateTime @default(now())
}

model OnboardingSession {
  id            String   @id @default(cuid())
  repoId        String
  repo          Repo     @relation(fields: [repoId], references: [id])
  userId        String
  messages      Json     // [{role, content}] conversation history
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
DATABASE_URL=               # NeonDB connection string
DIRECT_URL=                 # NeonDB direct URL (for Prisma migrations)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=          # Claude API
OPENAI_API_KEY=             # text-embedding-3-small for embeddings
GITHUB_TOKEN=               # GitHub REST API (optional, raises rate limits)
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
```

---

## Commands Reference
```bash
npm run dev                  # Start dev server
npx prisma db push           # Push schema changes to NeonDB
npx prisma generate          # Regenerate Prisma client
npx prisma studio            # Open DB GUI
npx tsc --noEmit             # Type check without building
npx prisma migrate dev       # Create a named migration
```

---

## What's Already Done / What's Not
Track this as you build — update this section when phases complete.

- [ ] Phase 1: Project setup, Clerk auth, Prisma + NeonDB connected
- [ ] Phase 2: DB schema pushed, Clerk webhook syncing users
- [ ] Phase 3: StandupAI — input form, AI summarizer, team feed, sprint digest, email
- [ ] Phase 4: Codebase Onboarding — GitHub ingestion, embeddings, Q&A chat
- [ ] Phase 5: Dashboard, landing page, production deploy
