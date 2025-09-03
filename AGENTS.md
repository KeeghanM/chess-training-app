# 🧠 AGENTS.md

## 💬 Comments

- Explain the why, not the what. The code itself should describe what it's doing.
- Use comments to break up long blocks of code into logical sections using headers (e.g., // --- Form validation ---).
- Avoid over-commenting; prioritize writing self-descriptive code.

## 📏 Component Size & DRY Principles

- **Apply the DRY-3 rule**: Refactor code into a reusable function or component once it's written for the third time.
- Keep components under 300 lines as a general rule of thumb.
  - If a component exceeds the size limit, break it down into smaller sub-components or extract logic into custom hooks.

## 🛡️ Guard Clauses & Validation

- Prefer early returns to reduce nesting and improve readability.
  - This applies to both conditional rendering in components and error handling in functions.
- For input validation, use Zod as high up the function call stack as possible.
- Validate inputs immediately and use a guard clause to handle invalid data.

## 🎁 Destructuring

- Always use destructuring for objects and arrays to make the code cleaner.
- Destructure objects and arrays directly in function parameters.
- Only make exceptions when there's a strong, justifiable reason, and document it with a comment.

## 📛 Naming Conventions

- **Components**: PascalCase (UserProfile)
- **Files**: kebab-case (user-profile.tsx)
- **Variables**/Functions: camelCase (getUserProfile)
- **Constants**: SCREAMING_SNAKE_CASE (API_BASE_URL)

## 🏗️ Component Structure

- **Imports**:
  - External imports first, alphabetized.
  - Internal imports next, alphabetized and grouped by type (@components, @db, etc.).
- **Types**: Define types near where they're used.
- **Component Logic**:
  - Place React hooks at the top of the component.
  - Follow with guard clauses for loading or error states.
  - Place the main component logic below the early returns.
- **Export**: Use export default function with a descriptive name.

## 📂 Import Path Aliases

Use the following aliases for clean imports:

- @components/\* (UI and app components)
- @db/\* (Database schema)
- @auth/\* (Authentication)
- @hooks/\* (React Query hooks)
- @stores/\* (Zustand stores)
- @utils/\* (Utility functions)

## 🚀 Data Fetching

- Use React Query for all data fetching.
- Organize hooks by domain within a dedicated file in the @hooks directory.
- Follow the naming convention: use[Entity]Queries().
- Use factory functions for queries that require parameters (e.g., usePuzzleQuery(arcId)).
- Destructure the data and isLoading properties from the query hook results.
- Use mutations with a consistent pattern, e.g., modifyPuzzle.mutate(updatedPuzzle).
- Zustand is for client-side state only; do not use it for server state.
  - Things like which screens are open, user preferences, etc., can go in Zustand.
  - Use React Query for server state (data from the backend).

## Documentation Philosophy

:::note[Our Approach to Documentation]
We believe that good documentation starts with well-written code. Documentation should complement the code, not replace it.
:::

As developers, we believe that good documentation starts with well-written code. If your code is clean, well-structured, and follows best practices, it will be easier to understand and maintain. Documentation should complement the code, not replace it.

We write documentation not for ourselves or our current team, but for future developers who weren't there when we first wrote this code. Documentation is a living document that should be updated as the code changes.
