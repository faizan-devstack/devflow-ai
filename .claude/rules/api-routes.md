---
paths: src/app/api/**
---

# API Route Rules for DevFlow AI

## Standard Route Structure
Every route must follow this exact pattern:
```ts
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({ ... })

export async function POST(req: NextRequest) {
  try {
    const { userId, orgId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

    // ... logic

    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    console.error('[ROUTE_NAME]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Streaming AI Routes
For any route that streams Claude API responses:
```ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  // auth + validation first...

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
    system: systemPrompt,
  })

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    }
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
```

## Auth Pattern
- Single user routes: use `userId` from `auth()`
- Team routes: always fetch `user.teamId` from DB after auth check
- Never trust client-sent teamId — always derive from DB

## Claude API Prompt Pattern
Always use this XML-tagged structure for prompts:
```ts
const systemPrompt = `You are a specialized assistant for DevFlow AI.
<role>...</role>
<rules>
- Be concise and structured
- Return valid markdown when formatting is needed
- Never make up information
</rules>`

const userPrompt = `
<task>${taskDescription}</task>
<context>${contextData}</context>
<format>${outputFormat}</format>
`
```
