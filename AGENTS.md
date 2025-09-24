# AGENTS.md file

## Technology Stack

- Bun
- TypeScript
- Next.js
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Drizzle
- Supabase
- Cloudflare Workers
- ESLint
- Prettier
- Better Auth
- Stripe

## File Length and Structure

Never allow a file to exceed 500 lines.
If a file approaches 400 lines, break it up immediately.
Treat 1000 lines as unacceptable, even temporarily.
Use folders and naming conventions to keep small files logically grouped.

## OOP First

Every functionality should be in a dedicated class, struct, or protocol, even if it's small.
Favor composition over inheritance, but always use object-oriented thinking.
Code must be built for reuse, not just to "make it work."

## Single Responsibility Principle

Every file, class, and function should do one thing only.
If it has multiple responsibilities, split it immediately.
Each view, manager, or utility should be laser-focused on one concern.

## Modular Design

Code should connect like Lego - interchangeable, testable, and isolated.
Ask: "Can I reuse this class in a different screen or project?" If not, refactor it.
Reduce tight coupling between components. Favor dependency injection or protocols.

## Responsibility Separation Patterns

Use the following directory structure for logic separation:
Routing & Pages -> app/ (Next.js App Router)
UI logic -> hooks/, components/
Business logic -> utils/
State management -> providers/
Never mix view logic and business logic directly in page components.
Use dependency injection and clear separation of concerns to avoid tight coupling.

## Function and Class Size

Keep functions under 30-40 lines.
If a class is over 200 lines, assess splitting into smaller helper classes.

## Naming and Readability

All class, method, and variable names must be descriptive and intention-revealing.
Avoid vague names like data, info, helper, or temp.

## Scalability Mindset

Always code as if someone else will scale this.
Include extension points (e.g., protocol conformance, dependency injection) from day one.

## Avoid God Classes

Never let one file or class hold everything (e.g., massive Screen, Hook, or Utils).
Split into app/, hooks/, utils/, providers/, etc.

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signin/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   ├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
├── actions/
├── components/
│   └── ui/
├── db/
│   ├── schemas/
│   └── migrations/
├── hooks/
├── lib/
├── types/
├── zod/
├── constants/
└── providers/
```

## File Naming Conventions

App Router: lowercase, special names

- page.tsx, layout.tsx, template.tsx, loading.tsx, error.tsx
  Components: PascalCase. Suffix with `.client.tsx` or `.server.tsx` if needed for clarity.
- UserProfile.tsx, ProductCard.tsx, SignInButton.client.tsx
  Hooks: camelCase, starting with 'use'
- useAuth.ts, useApi.ts, useLocalStorage.ts
  Types: feature name + purpose
- auth.ts, user.ts, api.ts
  Utils/Lib: camelCase. Group by feature.
- authUtils.ts, validation.ts, dateFormatting.ts
  Providers: PascalCase + Provider
- AuthProvider.tsx, ThemeProvider.tsx
  Actions: camelCase. Suffix with `.actions.ts`
- user.ts, product.ts
  API Routes: route.ts inside `app/api/...` directories.

## Server Action Rules

Server Actions must only be used for data mutations.
Do not use them for data fetching (queries) or GET requests.
Their primary purpose is handling form submissions and state updates via startTransition.
