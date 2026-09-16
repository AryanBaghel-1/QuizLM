# QuizLM Express API

The Express application is the backend API for QuizLM. It handles authenticated
question and test workflows, analytics, Clerk webhooks, database access through
Prisma, and Gemini-powered embeddings and question generation.

## Prerequisites

- Bun 1.3.5 or newer
- Node.js 18 or newer
- Docker and Docker Compose for the local PostgreSQL and pgvector services
- A configured root `.env` file

## Configuration

The API reads environment variables from the monorepo root. Copy `.env.example`
to `.env` and provide values for the database, Clerk, Gemini, and frontend
configuration:

```env
EXPRESS_PORT=4000
EXPRESS_URL=http://localhost:4000
NEXT_URL=http://localhost:3000
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
DB_HOST=localhost
DB_PORT=5432
DB_URL=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLERK_WEBHOOK_SECRET=...
GEMINI_API_KEY=...
```

Never commit real credentials to the repository.

## Development

From the repository root:

```bash
bun install
docker compose up -d
bun --cwd apps/express dev
```

The development server watches `src/` and listens on `http://localhost:4000`
unless `EXPRESS_PORT` is changed. To run the complete workspace instead, use
`bun dev` from the repository root.

## Production

Build and start the API with:

```bash
bun --cwd apps/express build
bun --cwd apps/express start
```

## API Routes

All routes return the API's standard response shape. Routes marked as
authenticated require a valid Clerk session.

| Base path              | Purpose                                                                | Authentication                    |
| ---------------------- | ---------------------------------------------------------------------- | --------------------------------- |
| `/questions`           | Create and retrieve questions, including semantic search and filtering | Required for protected operations |
| `/tests`               | Create, list, retrieve, edit, start, and attempt tests                 | Required for protected operations |
| `/analytics/dashboard` | Retrieve the signed-in user's dashboard analytics                      | Required                          |
| `/wh/user/new`         | Receive new-user events from Clerk                                     | Clerk webhook signature           |

Question and test endpoints support JSON requests. Multipart requests are also
accepted for upload-backed workflows, with files stored temporarily in
`apps/express/uploads/` during development.

## Project Structure

```text
src/
├── index.ts              # Express app setup and route registration
├── app/
│   ├── question/         # Question creation, retrieval, and generation
│   ├── tests/            # Tests and test attempts
│   ├── analytics/        # Dashboard analytics
│   └── webhooks.ts       # Clerk webhook handlers
└── lib/
	├── middleware.ts     # Authentication, body parsing, and uploads
	├── prisma.ts         # Database client
	└── utils.ts          # Responses, logging, and AI helpers
```

Database schema and generated Prisma client code live in `packages/db`.
