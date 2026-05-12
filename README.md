# QuizLM

QuizLM is an AI-assisted quiz generation and learning platform designed to create semantically meaningful quizzes from educational content. It leverages advanced vector search and AI workflows to enable intelligent retrieval, topic-based organization, and adaptive assessment behavior.

## 🚀 Features

- **AI-Assisted Processing**: Automatically classifies questions into subjects, topics, and difficulty levels.
- **Semantic Search**: Uses vector embeddings for intelligent retrieval of related concepts and dynamic quiz assembly.
- **Dynamic Difficulty**: Question difficulty evolves over time based on real user performance analytics.
- **Shared Knowledge Base**: Contribute to and explore a community-generated question database.
- **Personalized Learning**: Tracks user performance to identify weak areas and provide adaptive quiz experiences.
- **Content Extraction (Coming Soon)**: AI-powered extraction of questions and correct MCQ options from uploaded PDFs and images.

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **Backend**: [Express.js](https://expressjs.com/) (TypeScript)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Vector Search**: [pgvector](https://github.com/pgvector/pgvector)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI/LLM**: Google Gemini (via `@google/genai`) (would be changed later to using locally trained models)
- **Monorepo Management**: [Turborepo](https://turbo.build/repo)

## 📂 Project Structure

```text
├── apps/
│   ├── express/          # Backend API services
│   └── web/              # Next.js frontend application
├── packages/
│   ├── db/               # Shared database schema and Prisma client
│   ├── shared/           # Common types and server utilities
│   ├── typescript-config/# Shared TS configurations
│   └── eslint-config/    # Shared linting rules
├── docker-compose.yml    # Infrastructure orchestration
└── turbo.json             # Build system configuration
```

## 🚦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.3.5 or higher)
- Docker & Docker Compose
- Node.js (v18 or higher)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/QuizLM.git
   cd QuizLM
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Environment Setup**:
   Create `.env` file in the monorepo root and both the systems would be fetching variables from the same file automatically. would be needed to pass these separately in deployement

4. **Spin up Infrastructure**:
   ```bash
   docker-compose up -d
   ```

5. **Run Database Migrations**:
   ```bash
   cd packages/db
   bunx prisma generate
   ```

6. **Start Development Servers**:
   ```bash
   bun dev
   ```

## 🧠 Core Concepts

### Semantic Retrieval
Questions are stored as 768-dimensional vectors using AI embeddings. This allows QuizLM to find questions that are conceptually related even if they don't share exact keywords.

### Adaptive Assessment
The system tracks `TestAttempt` and `AttemptAnswer` metrics. Over time, the difficulty level of a question is adjusted dynamically based on the ratio of correct to incorrect responses from the community.