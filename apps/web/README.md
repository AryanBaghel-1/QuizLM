# QuizLM Web

The QuizLM web app is the Next.js frontend for creating, taking, and reviewing
AI-assisted quizzes. It uses the App Router, TypeScript, Clerk authentication,
and shared packages from the QuizLM monorepo.

## App Areas

- `/dashboard` - overview of learning activity
- `/questions` - browse and manage the question bank
- `/questions/create` - create a question
- `/tests` - browse available tests
- `/tests/create` - create a test
- `/tests/attempt` - take a test and submit answers
- `/analytics` - review performance analytics
- `/settings` - manage account and application settings

## Prerequisites

- Bun 1.3.5 or newer
- Node.js 18 or newer
- Docker and Docker Compose for the local database and supporting services
- The environment variables described in the repository setup instructions

## Development

From the repository root, install dependencies and start the workspace:

```bash
bun install
bun dev
```

To run only the web app:

```bash
bun --cwd apps/web dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

## Useful Commands

Run these from `apps/web` or use the equivalent `bun --cwd apps/web` command
from the repository root:

```bash
bun run dev      # Start the development server
bun run lint     # Check the frontend with ESLint
bun run build    # Create a production build
bun run start    # Serve the production build
```

The frontend calls the Express API in `apps/express` and consumes the shared
database and type packages in `packages/db` and `packages/shared`. Start the
supporting services from the repository root before using data-backed pages.

## Project Structure

```text
src/
├── app/          # Routes and layouts
├── components/   # Shared UI and feature components
├── hooks/        # Reusable React hooks
└── lib/          # API clients and frontend utilities
public/           # Static assets
```
