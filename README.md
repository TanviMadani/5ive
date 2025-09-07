# 5ive

AI-powered microlearning platform for professionals. 5ive helps learners practice in short, focused sessions with flashcards, lessons, quizzes, and progress tracking. The platform is built with a modern React frontend and a Node.js/Express backend using MongoDB and Redis.

## Key Features

- Short, focused learning flows (lessons, flashcards, quizzes)
- User authentication with JWT and refresh tokens
- Progress tracking and leaderboard
- Admin content management endpoints
- Optimistic, responsive UI built with React, React Router, and Tailwind
- Caching/session support via Redis

## Tech Stack

- Frontend: React + Vite, React Router, Tailwind CSS, Axios, Recharts, Framer Motion
- Backend: Node.js, Express, Mongoose
- Data: MongoDB (primary store), Redis (cache/session/ratelimits)
- Auth: JWT access + refresh tokens

## Monorepo Structure

```
5ive/
  backend/          Node.js + Express API
    src/
      config/       Redis/Mongo configuration
      middleware/   Auth and common middleware
      models/       Mongoose models (User, Lesson, Quiz, etc.)
      routes/       Express route modules (auth, lessons, quiz, ...)
  frontend/         React app (Vite)
    src/
      components/   Reusable UI components
      pages/        Routed pages (Dashboard, Lessons, Flashcards, ...)
      services/     API client (Axios)
```

## Getting Started (Windows/macOS/Linux)

Prerequisites:

- Node.js v18+ recommended (backend requires v14+ minimum)
- MongoDB running locally (default: `mongodb://localhost:27017/5ive`)
- Redis running locally (default: `localhost:6379`)

### 1) Clone and install

```bash
# from repository root (this folder)
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2) Configure backend environment

```bash
cd backend
npm run setup
# This creates a .env with defaults; review and update as needed
```

Required backend environment variables:

- `JWT_SECRET` (string; strong random secret)
- `JWT_EXPIRES_IN` (default `7d`)
- `MONGODB_URI` (default `mongodb://localhost:27017/5ive`)
- `REDIS_HOST` (default `localhost`)
- `REDIS_PORT` (default `6379`)
- `PORT` (default `5000`)

Ensure MongoDB and Redis are running before starting the server.

### 3) Run the apps (two terminals)

Terminal A (backend):

```bash
cd backend
npm run dev
```

Terminal B (frontend):

```bash
cd frontend
npm run dev
```

By default:

- Backend: `http://localhost:5000`
- Frontend dev server: `http://localhost:5173`

The frontend expects the backend API at an environment-configured base URL inside `frontend/src/services/api.js` (or via `.env`/proxy depending on your setup). Update as needed.

## API Overview (Backend)

Auth:

- `POST /api/auth/register` – Create account
- `POST /api/auth/login` – Obtain access/refresh tokens
- `POST /api/auth/logout` – Invalidate refresh token
- `GET  /api/auth/me` – Current user
- `POST /api/auth/refresh-token` – Rotate access token

Content and Learning (representative):

- `GET/POST /api/lessons` – Lessons list/create
- `GET/POST /api/flashcards` – Flashcards list/create
- `GET/POST /api/quiz` – Quiz generation/submission
- `GET  /api/progress` – User progress
- `GET  /api/leaderboard` – Leaderboard data
- `GET/POST /api/admin/...` – Admin content management

Models (selected): `User`, `Lesson`, `Quiz`, `Flashcard`, `Progress`, `AdminContent`.

## Frontend

- React + Vite app in `frontend/`
- Pages: `Dashboard`, `Lessons`, `Flashcards`, `Quizzes`, `Progress`, `Profile`, `Login`, `Register`
- Routing via `react-router-dom`
- API wrapper in `src/services/api.js`

Common scripts:

```bash
# frontend
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build

# backend
npm run dev       # start dev server with nodemon
npm run start     # start server
npm run setup     # generate .env defaults
npm run check-deps # optional: verify Mongo/Redis availability
```

## Troubleshooting

- 400s on auth/register or auth/login: verify MongoDB/Redis are running and `.env` is set
- JWT errors: ensure `JWT_SECRET` is configured and strong
- Database connection issues: validate `MONGODB_URI` and service status

## Production Notes

- Use managed MongoDB/Redis services where possible
- Configure CORS and secure cookies as needed
- Set strong `JWT_SECRET` and rotate regularly
- Serve the frontend via a static host or reverse proxy; point it to the backend API

## License

ISC (see per-package metadata). Update as needed for your distribution.
