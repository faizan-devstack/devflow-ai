---
paths: src/lib/ai/**, src/lib/embeddings.ts, src/lib/github.ts
---

# AI Integration Rules for DevFlow AI

## Model
ALWAYS use `claude-sonnet-4-5`. Never change this.

## Anthropic Client
```ts
import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
```

## StandupAI Summarizer (src/lib/ai/standup.ts)
Transform raw standup input → structured summary:
```ts
system: `You are a standup summarizer for DevFlow AI.
<role>Convert raw developer standup notes into clean, structured summaries.</role>
<rules>
- Be concise — max 3 bullet points per section
- Flag blockers clearly with [BLOCKER] prefix
- Use past tense for completed work, present for in-progress
- Never add information not present in the input
</rules>`

user: `
<task>Summarize this standup entry</task>
<developer>${userName}</developer>
<context>
Did today: ${didToday}
Doing next: ${doingNext}  
Blockers: ${blockers || 'None'}
</context>
<format>Return a concise summary in 2-4 sentences. Start with what was done, then what's next, then flag any blockers.</format>
`
// max_tokens: 256
```

## Sprint Digest Generator (src/lib/ai/digest.ts)
Multi-step chain — aggregate all team entries → generate digest:
```ts
// Step 1: Compile entries into context
// Step 2: Generate digest

system: `You are a sprint digest writer for DevFlow AI.
<role>Create a professional weekly digest from team standup entries to share with clients and stakeholders.</role>
<rules>
- Write in third person (team accomplished X, not we did X)
- Group by theme not by person (avoid naming individuals unless a blocker needs owner)
- Highlight blockers and risks prominently
- Keep tone professional but human
- Max 400 words
</rules>`

user: `
<task>Generate a weekly sprint digest</task>
<sprint>${sprintName} — ${dateRange}</sprint>
<team_entries>${compiledEntries}</team_entries>
<format>
## Sprint Summary
[2-3 sentence overview]

## Completed This Week
[bullet list of key accomplishments]

## In Progress
[bullet list of current work]

## Blockers & Risks
[bullet list, or "None" if clear]

## Next Week Focus
[1-2 sentence forward look]
</format>
`
// max_tokens: 1024
```

## Codebase Onboarding Doc (src/lib/ai/ingest.ts)
After ingesting repo chunks, generate the onboarding doc:
```ts
system: `You are a codebase documentation expert for DevFlow AI.
<role>Generate clear, developer-friendly onboarding documentation from actual source code.</role>
<rules>
- Base everything on the actual code provided — never assume or invent
- Write for a developer joining the project on day 1
- Include specific file paths when referencing code
- Use markdown with clear headings
</rules>`

user: `
<task>Generate a codebase onboarding document</task>
<repo>${repoName}</repo>
<files_analyzed>${fileList}</files_analyzed>
<code_samples>${topChunks}</code_samples>
<format>
## Overview
## Tech Stack
## Project Structure
## Key Files & What They Do
## Data Flow
## How to Run Locally
## Architecture Notes
</format>
`
// max_tokens: 4096
```

## Codebase Q&A Chat (src/lib/ai/chat.ts)
Semantic search → inject relevant chunks → answer:
```ts
// 1. Embed the user question
// 2. Vector search for top 5 relevant chunks
// 3. Build context from chunks
// 4. Stream answer

system: `You are a codebase assistant for DevFlow AI.
<role>Answer developer questions about a specific codebase using only the provided code context.</role>
<rules>
- Only answer based on the code provided in context
- If the answer isn't in the context, say "I couldn't find that in the analyzed code"
- Always cite the file path when referencing code: "In src/lib/auth.ts, line ~45..."
- Be specific and technical — this audience is developers
</rules>`

user: `
<question>${userQuestion}</question>
<code_context>${relevantChunks.map(c => `// ${c.filePath}\n${c.content}`).join('\n\n')}</code_context>
`
// max_tokens: 1024, stream: true
```

## Embeddings (src/lib/embeddings.ts)
```ts
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function embed(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',  // 1536 dimensions, cheap
    input: text.slice(0, 8000),        // trim to avoid token limit
  })
  return response.data[0].embedding
}
```

## Code Chunking Strategy (src/lib/github.ts)
```ts
// Chunk by: file (small files), function/class (large files)
// Max chunk size: ~500 tokens (~2000 chars)
// Include: file path header in every chunk for context
// Skip: node_modules, .git, lock files, images, compiled files
// Prioritize: README, main entry points, schema files, key lib files
const SKIP_PATTERNS = [
  'node_modules', '.git', 'package-lock.json', 'yarn.lock',
  '.next', 'dist', 'build', '.jpg', '.png', '.svg', '.ico'
]
```
