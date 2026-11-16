# ProjectBoard

ProjectBoard is a full-stack collaboration hub where builders can publish software ideas, discover projects, and manage collaborator applications.

## Stack

- Node.js and Express
- PostgreSQL via `pg`
- EJS templates, CSS, and vanilla JavaScript
- Session authentication with `express-session` and `bcrypt`

## Setup

1. Create a PostgreSQL database named `projectboard`.
2. Copy `.env.example` to `.env`, then enter the database connection string and a long session secret.
3. Install dependencies with `npm install`.
4. Run `npm run db:init` to create the tables from `database/init.sql`.
5. Start the app with `npm run dev` and visit `http://localhost:3000`.

## Key routes

- Browser: `/`, `/projects`, `/my-projects`, `/my-applications`
- Projects API: `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id`
- Applications API: `POST /api/projects/:id/applications`, `GET /api/projects/:id/applications`, `PUT /api/applications/:id`

## Security model

The session stores only the authenticated user's ID and username. Every mutation derives the actor from the session; owner and applicant IDs are never trusted from the request. Project update/deletion and application decisions are checked server-side, and the schema protects foreign-key integrity and duplicate applications.
