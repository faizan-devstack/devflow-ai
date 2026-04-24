---
paths: prisma/**, src/lib/db/**, src/actions/**
---

# Database & Prisma Rules for DevFlow AI

## Prisma Client Singleton
Always import from the singleton — never instantiate directly:
```ts
import { prisma } from '@/lib/db/prisma'
```

The singleton file (src/lib/db/prisma.ts):
```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## pgvector Queries
For semantic search over RepoChunk embeddings:
```ts
// Raw query required for vector similarity search
const chunks = await prisma.$queryRaw<RepoChunk[]>`
  SELECT id, "filePath", content,
    1 - (embedding <=> ${embedding}::vector) AS similarity
  FROM "RepoChunk"
  WHERE "repoId" = ${repoId}
  ORDER BY embedding <=> ${embedding}::vector
  LIMIT ${limit}
`
```

## Schema Change Workflow
1. Edit `prisma/schema.prisma`
2. Run `npx prisma db push` (dev) or `npx prisma migrate dev --name description` (migration)
3. Run `npx prisma generate`
4. Update `CLAUDE.md` schema section if model changed

## Soft Delete Pattern
Never hard delete user-owned data:
```ts
// WRONG
await prisma.repo.delete({ where: { id } })

// RIGHT
await prisma.repo.update({
  where: { id },
  data: { deletedAt: new Date() }
})

// Always filter soft-deleted in queries
await prisma.repo.findMany({
  where: { teamId, deletedAt: null }
})
```

## Transaction Pattern
Use transactions for any multi-step write:
```ts
await prisma.$transaction(async (tx) => {
  const sprint = await tx.sprint.create({ data: sprintData })
  await tx.team.update({ where: { id: teamId }, data: { activeSprint: sprint.id } })
})
```

## Server Actions Pattern
```ts
'use server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({ ... })

export async function createStandup(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) throw new Error('Invalid data')

  await prisma.standupEntry.create({ data: { userId, ...parsed.data } })
  revalidatePath('/standup')
}
```
