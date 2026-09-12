# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Commemorative website for Iria e Ari's 50th wedding anniversary (November 8, 2025, 6:30 PM). Family and friends can leave messages (moderated guestbook) and browse photo galleries.

**Audience**: Visitors (family/friends, ages 20-80) + Admin (content moderation)

**Tech Stack**: Next.js (App Router) + React + TypeScript + Tailwind CSS + Shadcn/ui + Neon PostgreSQL + Drizzle ORM + ImageKit CDN + PostHog

## Development Commands

```bash
pnpm dev           # Start development server (Turbopack)
pnpm build         # Build for Vercel CI
pnpm build:prod    # Local production build (1Password)
pnpm lint          # Format and lint code (Biome)
pnpm check         # TypeScript type checking
pnpm test          # Run all tests
pnpm test:watch    # Run tests in watch mode
```

### Database Commands

```bash
pnpm db:push       # Push schema changes to Neon
pnpm db:studio     # Open Drizzle Studio
pnpm db:generate   # Generate migrations
pnpm db:seed       # Seed database with sample data
```

### Single Test Execution

```bash
pnpm test src/actions/messages.spec.ts      # Run specific test file
pnpm test:watch src/actions/login.spec.ts   # Watch specific file
```

## Architecture (MVVM)

```
src/
├── actions/         # Model - Server actions with business logic (co-located .spec.ts)
├── hooks/           # ViewModel - TanStack Query wrappers, state management
├── components/
│   ├── app/         # View - Application sections (Header, Gallery, Guestbook, etc.)
│   └── ui/          # Shadcn/ui components
├── lib/
│   ├── database/    # Drizzle schemas + Neon client
│   ├── auth/        # JWT + bcrypt utilities
│   └── images/      # ImageKit client + blur placeholders
├── providers/       # React Query + PostHog providers
└── schemas/         # Zod validation schemas

tests/
├── mocks/           # Database (PGlite), ImageKit, Next.js mocks
└── utils/           # Test helpers and database utilities
```

### Data Flow Pattern

1. **Components** call hooks from `hooks/` for data fetching/mutations
2. **Hooks** use TanStack Query wrapping server actions from `actions/`
3. **Actions** interact with database via Drizzle and return typed responses
4. **Error tracking** via `useErrorTracking` hook captures errors to PostHog before toast display

## Testing

- **Framework**: Vitest + React Testing Library + jsdom
- **Database**: PGlite (in-memory PostgreSQL) - reset between tests via `cleanTestDatabase()`
- **Location**: Co-located specs in `src/**/*.spec.ts`
- **Mocking pattern**:
  ```typescript
  vi.mock("~/lib/database/client", () => ({ db: testDb }));
  vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
  ```
- **Aliases**: `~` for `src/`, `~tests` for `tests/`

## Key Conventions

### Design System

- Golden theme: `gold-50` through `gold-950` (OKLCH)
- Typography: Inter (body), Playfair Display (headings), Dancing Script (special)
- Minimum contrast ratio: 4.5:1

### Database & Auth

- Drizzle ORM with schemas: `users`, `messages`, `photos`
- JWT authentication with httpOnly cookies
- Middleware validates JWT and user existence
- Environment validation via `@t3-oss/env-nextjs`

### Images

- ImageKit for storage/CDN with automatic optimizations
- Blur placeholders via plaiceholder + ImageKit
- Always use Next.js Image component

### Error Monitoring

- All data hooks use `useErrorTracking` for PostHog capture
- Error events: `apiError`, `mutationError`, `queryError`

## Environments

| Environment | Branch       | Database | Domain               |
| ----------- | ------------ | -------- | -------------------- |
| Production  | main         | main     | bodas-iria-ai.com.br |
| Preview     | pull request | main     | Vercel preview URL   |

```bash
pnpm deploy:prd    # Deploy to production
```

### Deploy Workflow

1. Create feature branch from `main` (`feat/DEV-XX-description`)
2. Make changes and test locally (`pnpm check && pnpm lint && pnpm test`)
3. Open a PR targeting `main`
4. Validate changes at the Vercel preview URL
5. After merge, GitHub Actions auto-deploys to Vercel production

## Git Conventions

### Pull Requests

- **Always create PRs targeting `main` branch** from a feature branch
- Validate the Vercel preview before merging

**Title**: `type(scope): description` (scope is required)

```markdown
## Summary

Brief description of changes.

## Changes

- Feature/change 1
- Feature/change 2

## Test Plan

- [x] Test case 1
- [x] Test case 2

Closes DEV-XX
```

### Commit Messages

```
feat: add user profile management

- Create profile edit form with validation
- Add avatar upload with image optimization
```

- Use Conventional Commits (feat, fix, refactor, etc.)
- **Do NOT use scope in commits** - format is always `type: description`
- **Do NOT mention package versions** if a package is updated
- Imperative mood, focus on WHAT not HOW
- Body optional, 3-4 list items max

## Code Guidelines

- Do what has been asked; nothing more, nothing less
- Prefer editing existing files over creating new ones
- Keep solutions simple - three similar lines > premature abstraction
- Do not add features, refactoring, or "improvements" beyond what was asked

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
