# 🧠 Quiz Platform

A full-stack quiz platform where users can create, view, and manage quizzes with multiple question types.

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, MUI (Material UI)
- **Backend:** Node.js, Express, TypeORM, PostgreSQL

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/JaoConquista/QUIZ_jaoconquista.git
cd quiz-platform

```

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd backend
npm install
```

### 3. Config Enviroment Variable

Create a .env file in the root of the backend directories and insert , make sure your .env file matches the credentials defined in the docker-compose.yml.

### 4. Start the Project

Postgres:

```bash
docker compose up postgres
```

Backend:

```bash
npm run start
```

Frontend:

```bash
npm run start
```
