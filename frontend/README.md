<p style="display: flex; align-items: center">
<span style="font-size: 2rem; font-weight: bold; vertical-align: middle; color: inherit">JobBoard</span>
  <img src="https://i.ibb.co/V0fTXLXd/jb-logo-tran.png" alt="JobBoard Logo" width="60" />
</p>

> A modern, full-stack job platform that connects employers and job seekers.  
Built with **React + TypeScript + Tailwind CSS + ShadCN UI** for the frontend, and **Express + PostgreSQL + Prisma** for the backend.  
This project demonstrates **real-world architecture**, including authentication (JWT & Google OAuth), job listings, bookmarks and dashboards.
---

## Badges

![Monorepo](https://img.shields.io/badge/Monorepo-Structure-3b82f6?style=for-the-badge&labelColor=1e293b&logo=lerna)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-3b82f6?style=for-the-badge&labelColor=1e293b&logo=react)
![Backend](https://img.shields.io/badge/Backend-Express%20%7C%20Prisma-10b981?style=for-the-badge&labelColor=1e293b&logo=node.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=for-the-badge&labelColor=1e293b&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38b2ac?style=for-the-badge&labelColor=1e293b&logo=tailwindcss)
![ShadCN UI](https://img.shields.io/badge/UI-ShadCN%20UI-8b5cf6?style=for-the-badge&labelColor=1e293b&logo=radixui)
![Database](https://img.shields.io/badge/Database-PostgreSQL-4169e1?style=for-the-badge&labelColor=1e293b&logo=postgresql)
![Frontend Hosting](https://img.shields.io/badge/Frontend-Vercel-white?style=for-the-badge&labelColor=1e293b&logo=vercel&logoColor=white)
![Backend Hosting](https://img.shields.io/badge/Backend-Heroku-6c47a5?style=for-the-badge&labelColor=1e293b&logo=heroku)
![Auth](https://img.shields.io/badge/Auth-JWT%20%7C%20Google%20OAuth-fbbc04?style=for-the-badge&labelColor=1e293b&logo=google)
![Resume Upload](https://img.shields.io/badge/Resume%20Upload-Firebase-ffca28?style=for-the-badge&labelColor=1e293b&logo=firebase&logoColor=white)
![Profile Upload](https://img.shields.io/badge/Profile%20Upload-Cloudinary-3448c5?style=for-the-badge&labelColor=1e293b&logo=cloudinary&logoColor=white)




---

## Table of Contents

* [About the Project](#about-the-project)
* [Live Demo](#live-demo)
* [Screenshots](#screenshots)
* [Key Features](#key-features)
* [Architecture Overview](#architecture-overview)

  * [Monorepo](#monorepo)
  * [Backend Services](#backend-services)
  * [Database & ORM](#database--orm)
  * [Authentication Flow](#authentication-flow)
  * [Theming System](#theming-system)
* [Project Structure](#project-structure)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Clone & Install](#clone--install)
  * [Environment Variables](#environment-variables)
  * [Database Setup](#database-setup)
  * [Development Scripts](#development-scripts)
  * [Running Locally](#running-locally)
* [Building for Production](#building-for-production)

  * [Frontend Build](#frontend-build)
  * [Backend Deploy](#backend-deploy)
  * [Environment Notes (Heroku, Vercel)](#environment-notes-heroku-vercel)
* [API Reference](#api-reference)
* [UI/UX Notes & Design System](#uiux-notes--design-system)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Acknowledgements](#acknowledgements)

---

## About the Project

**JobBoard** is a portfolio‑grade project intended to demonstrate real‑world, industry‑style architecture and developer skills. It supports the full job lifecycle: employers post jobs, job seekers search & apply, both roles get dashboards, and media uploading for company logo. The codebase is structured to showcase maintainability, modular design, environment configuration, and modern frontend tooling.

**Why I built this:** As an aspiring full‑stack developer transitioning from a non‑technical job, I wanted to build a project that reflects what real companies expect — not just functionality, but also scalability, maintainability, and clean architecture. I built JobBoard to:

Deeply understand monorepo architecture and modular project structuring

Practice end-to-end development — from database design and authentication to UI/UX and testing

Implement real-world features like dashboard filtering, image uploads to different cloud storages, and role‑based flows

Challenge myself building fullstack development with the integration of many tools like React Query, Prisma, ShadCN UI, and Google OAuth

Overcome self-doubt by completing a polished, portfolio‑ready project I can proudly of myself.

---

## Live Demo

> **Frontend:** *https://job-board-client-phi.vercel.app/*
>
> **API / Backend:** *https://job-board-server-b2676baff177.herokuapp.com/api*


---

## Screenshots

| Landing                             | Company Profile                          |
| ----------------------------------- | ---------------------------------------- |
| ![Landing](https://i.ibb.co/rRTPzWgC/Screenshot-2025-07-24-221321.png) | ![Profile](https://i.ibb.co/GQcZrBNZ/Screenshot-2025-07-24-221404.png) |

| Job Detail                           | Employer Dashboard                                       |
| ------------------------------------ | -------------------------------------------------------- |
| ![Detail](https://i.ibb.co/LdqDH2Qy/Screenshot-2025-07-24-221421.png) | ![Employer Dashboard](https://i.ibb.co/xSGJgGkj/Screenshot-2025-07-24-221348.png) |


---

## Key Features

* 🔍 **Job Search & Filters**: Keyword, location, category, salary range, pagination.
* ⭐ **Save / Bookmark Jobs**: Authenticated users can save jobs for later.
* 📄 **Job Detail View**: Full description, requirements, apply actions.
* 🧑‍💼 **Employer Dashboard**: Post, edit, archive jobs; view applicants.
* 🙋 **Job Seeker Dashboard**: Track applied & saved jobs.
* 🔐 **Authentication**: Email/password, JWT sessions, Google OAuth.
* ⚙️ **Configurable Environments**: Local dev, staging, production (Heroku backend + Vercel frontend suggested).
* 🎨 **Theme System**: Custom CSS variables `--jb-primary`, `--jb-text`, etc., surfaced via Tailwind utilities.
* 🧪 **Testing Ready**: Jest + React Testing Library (frontend); Jest + Supertest + test DB (backend).

*Add or remove features to match the current state of your project.*

---

## Architecture Overview

### Monorepo

The JobBoard project follows a **monorepo architecture**, where both the **frontend (client)** and **backend (server)** applications live in the same repository. This setup promotes:

- ✅ Better organization for full-stack projects
- ✅ Easier coordination between client and server changes
- ✅ Shared tooling, consistent linting, and unified dependency

### Backend Services

A Node.js / Express API written in TypeScript exposes REST endpoints for jobs, users, auth, and applications. Service classes wrap Axios clients on the frontend and map to controller routes on the backend.

### Database & ORM

PostgreSQL + Prisma schema defines Users, Jobs, Applications, SavedJobs, and related lookup tables (categories, locations, etc.).

### Authentication Flow

1. User registers or logs in with email/password → server issues JWT.
2. Optional Google OAuth: user redirected to Google, callback handled by Passport, JWT issued.
3. Client stores JWT (httpOnly cookie preferred; fallback local storage for demo).
4. Protected routes validated via middleware.

### Theming System

Color tokens are defined as CSS custom properties prefixed with `--jb-` (e.g., `--jb-primary`, `--jb-bg`, `--jb-text`, `--jb-text-muted`, `--jb-success`, `--jb-danger`). Tailwind config maps these to utilities like `bg-jb-primary`, `text-jb-text`, etc. All UI components consume these tokens for consistent branding and easy dark/light theming.

---

## Project Structure

### Frontend

```
jobboard/
├── frontend/ # Frontend (React + Vite + Tailwind CSS)
│ └── src/
│ ├── components/ # Reusable UI components
│ ├── contexts/ # React context providers (auth, theme, etc.)
│ ├── hooks/ # Custom hooks (e.g., useJobsData, useAuth)
│ ├── lib/ # Shared libraries or configurations (e.g., axios)
│ ├── pages/ # Page components (Home, Jobs, Profile, etc.)
│ ├── routes/ # Route definitions and layouts
│ ├── schemas/ # Zod/Yup schemas for form validation
│ ├── services/ # API service layers
│ ├── types/ # Global TypeScript types
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main App component
│ └── main.tsx # Entry point

├── backend/ # Backend (Express + Prisma + PostgreSQL)
│ └── src/
│ ├── config/ # App config and environment variables
│ ├── controllers/ # Express route handlers (e.g., auth, jobs)
│ ├── middleware/ # Auth, error, and custom middleware
│ ├── prisma/ # Prisma schema and DB migrations
│ ├── routes/ # API routes grouped by domain
│ ├── services/ # Business logic layer
│ ├── types/ # Shared TypeScript types/interfaces
│ ├── utils/ # Utility functions (token, hashing, etc.)
│ └── index.ts # Entry point of Express server

├── docs/ # Project documentation and assets
├── .env # Root environment file (optional or shared)
├── README.md
└── .
```


---

## Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [Formik](https://formik.org/)
- [Yup]()
- [Axios](https://axios-http.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express Validator](https://express-validator.github.io/docs/)
- [JWT](https://jwt.io/)
- [Passport.js](http://www.passportjs.org/) with [Google OAuth](https://developers.google.com/identity)

### Infrastructure & DevOps
- [Vercel](https://vercel.com/) – Frontend Hosting
- [Heroku](https://www.heroku.com/) – Backend Hosting
- [Neon](https://neon.tech/) – PostgreSQL Hosting

### Testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest](https://github.com/visionmedia/supertest)


---

## Getting Started

### Prerequisites

* Node.js >= 18
* npm 
* PostgreSQL instance (local Docker, Neon, Supabase, etc.)
* Git

*Optional*

* Heroku CLI

---

### Clone & Install

```bash
# Clone
git clone git@github.com:YeHtet214/Job-Board.git
cd Job-Board

# Install deps (monorepo)
cd frontend -> npm install
cd backend -> npm install
```

---

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"

# Auth / Security
JWT_SECRET=supersecret_dev_key_change_me
TOKEN_EXPIRY=1d

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL="https://your-backend.com/api/auth/google/callback"

# Frontend URLs (CORS)
CLIENT_URL="http://localhost:5173"
PUBLIC_FRONTEND_URL="https://your-frontend.vercel.app"

# Server Port
PORT=3000
```

> ⚠️ Never commit real secrets. Use `.env.example` with placeholders.

---

### Database Setup

Using Prisma:

```bash
cd backend/src/prisma
npm prisma migrate dev --name init
npm prisma generate
```

To reset:

```bash
npm prisma migrate reset
```

---

### Running Locally

Start backend:

```bash
cd backend
npm run dev
# -> http://localhost:3000
```

Start a frontend app:

```bash
cd frontend
npm run dev
# -> http://localhost:5173
```

---

## Building for Production

### Frontend Build

```bash
npm run build
# Outputs to /dist per Vite app
```

Upload build to Vercel/Netlify/Static Host.

### Backend Deploy

**Heroku example:**

```bash
heroku create job-board-server
heroku config:set JWT_SECRET=... GOOGLE_CLIENT_ID=... --app job-board-server
heroku config:set DATABASE_URL=... --app job-board-server
git push heroku main
```

### Environment Notes (Heroku, Vercel)

* **Routing / SPA fallback:** Ensure Vercel config rewrites all non‑API paths to `index.html`.
* **OAuth redirect URIs:** Must match Google Cloud Console exactly (protocol, domain, path).
* **CORS:** Set allowed origins for frontend domains.

---

## API Reference

> Below is a categorized list of available REST API endpoints for the Job Platform backend.


### Auth & User Routes

| Method | Endpoint                                | Description                  |
|--------|-----------------------------------------|------------------------------|
| GET    | `/api/users/me`                         | Get current user info        |
| GET    | `/api/users`                            | Get all users                |
| GET    | `/api/users/:id`                        | Get user by ID               |
| POST   | `/api/auth/signup`                      | Sign up new user             |
| POST   | `/api/auth/signin`                      | Sign in                      |
| POST   | `/api/auth/refresh-token`               | Refresh JWT token            |
| GET    | `/api/auth/verify-email/:token`         | Verify email with token      |
| POST   | `/api/auth/logout`                      | Log out                      |
| POST   | `/api/auth/resend-verification`         | Resend email verification    |
| POST   | `/api/auth/forgot-password`             | Forgot password              |
| POST   | `/api/auth/reset-password`              | Reset password               |
| GET    | `/api/auth/google`                      | Google OAuth login           |
| GET    | `/api/auth/google/callback`             | Google OAuth callback        |

---

### Profile Routes

| Method         | Endpoint                                   | Description                    |
|----------------|--------------------------------------------|--------------------------------|
| GET/POST/PUT/DELETE | `/api/profiles/me`                   | Manage your profile            |
| POST           | `/api/profiles/upload-resume`              | Upload resume (📄 Firebase)    |
| POST           | `/api/profiles/upload-profile-image`       | Upload profile image (🖼 Cloudinary) |

---

### Company Routes

| Method         | Endpoint                          | Description                     |
|----------------|-----------------------------------|---------------------------------|
| GET/POST       | `/api/companies`                  | Get all or create company       |
| GET            | `/api/companies/my-company`       | Get your company profile        |
| GET/PUT/DELETE | `/api/companies/:id`              | Manage company by ID            |

---

### Job Routes

| Method         | Endpoint                             | Description                        |
|----------------|--------------------------------------|------------------------------------|
| GET/POST       | `/api/jobs`                          | Get all or create job              |
| GET            | `/api/jobs/suggestions`              | Search suggestions                 |
| GET            | `/api/jobs/company/:companyId`       | Jobs by company                    |
| GET/PUT/DELETE | `/api/jobs/:id`                      | Get or modify job by ID            |
| GET            | `/api/jobs/:id/applications`         | Applications by job ID            |

---

### Application Routes

| Method         | Endpoint                                        | Description                          |
|----------------|-------------------------------------------------|--------------------------------------|
| GET            | `/api/applications/users/:userId`               | Applications by user                 |
| GET/PUT/DELETE | `/api/applications/:id`                         | Application details                  |
| POST           | `/api/applications/jobs/:jobId`                 | Apply to job                         |

---

### Dashboard Routes

| Method | Endpoint                                             | Description                        |
|--------|------------------------------------------------------|------------------------------------|
| GET    | `/api/dashboard/jobseeker`                           | Job seeker dashboard               |
| DELETE | `/api/dashboard/jobseeker/applications/:id`          | Withdraw application               |
| GET    | `/api/dashboard/employer`                            | Employer dashboard                 |
| PUT    | `/api/dashboard/employer/applications/:id`           | Update application status          |
| GET    | `/api/dashboard/employer/profile-completion`         | Company profile progress           |

---

### Saved Jobs

| Method     | Endpoint                                 | Description                       |
|------------|------------------------------------------|-----------------------------------|
| GET/POST   | `/api/saved-jobs`                        | Get or save job                   |
| GET        | `/api/saved-jobs/check/:jobId`           | Check if job is saved             |
| POST       | `/api/saved-jobs/check-batch`            | Batch check saved jobs            |
| DELETE     | `/api/saved-jobs/:savedJobId`            | Remove saved job                  |

## UI/UX Notes & Design System

### Theme Tokens

Color palette is abstracted into CSS variables for consistency and branding. These are exposed through Tailwind utilities so components never hard‑code color values.

**Defined tokens:**

```
--jb-primary
--jb-bg
--jb-surface
--jb-text
--jb-text-muted
--jb-success
--jb-danger
```

**Usage in Tailwind (example):**

```css
:root {
  --jb-primary: 59 130 246;        /* #3b82f6 */
  --jb-bg: 255 255 255;
  --jb-text: 17 24 39;
  --jb-text-muted: 107 114 128;
}
```

Then in `tailwind.config.js` map to theme colors via `rgb(var(--jb-primary) / <alpha-value>)` pattern.

### Shared Components

* `<Header />` and `<Footer />` from `SharedComponent/` consumed across micro frontends.
* Auth provider wraps apps for consistent session state.

---

## Roadmap

* [ ] Complete end‑to‑end test coverage for auth + job posting
* [ ] Add admin moderation tools
* [ ] Add email notifications (Nodemailer / Resend)
* [ ] In app messaging system (Websocket)

---

## Contributing

Contributions welcome! To contribute:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

Please run linting & tests before submitting a PR.

---

## Acknowledgements

* **Mentors & Community:** Thanks to online resources, open‑source community, and AI tooling that helped debug and accelerate development.
* Icons by [Lucide](https://lucide.dev/).
* UI components inspired by \[shadcn/ui].
