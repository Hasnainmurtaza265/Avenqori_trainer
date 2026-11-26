# AVENQORI — Trainer Portal (MVP frontend)

A responsive React + Vite trainer dashboard based on the supplied Dashboard, Earnings and Profile reference images. The app includes the trainer-facing MVP screens in one consistent design system.

## Included screens
- Dashboard
- My Classes
- Students
- Earnings (chart, transactions, withdrawal request modal)
- Schedule / weekly availability
- My Courses
- Messages (interactive demo chat layout)
- Notifications (mark as read)
- Resources
- Reviews
- Certificates
- Profile (edit profile modal)
- Settings
- Help & Support

## Run
Requires Node.js 18+.
```bash
npm install
cp .env.example .env
npm run dev
```
Open the localhost URL shown by Vite.

## Backend-ready API layer
The centralized Axios client is `src/services/api.js`. Service methods are in `src/services/trainerService.js`.
The request interceptor reads `avenqori_access_token` from localStorage and adds `Authorization: Bearer <token>` when present.

Set the backend URL and disable mock mode in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK_DATA=false
```

Expected starter endpoints:
- `GET /trainer/dashboard`
- `GET /trainer/profile`
- `PATCH /trainer/profile`
- `GET /trainer/classes`
- `GET /trainer/students`
- `GET /trainer/courses`
- `GET /trainer/earnings`
- `POST /trainer/earnings/withdrawals`
- `GET /trainer/notifications`

Responses may be returned directly or wrapped in `{ "data": ... }`.
The frontend is not connected to a real server yet. Demo mode returns local sample data; forms/actions that need backend routes are clearly demo placeholders. Add authentication, role-based authorization, validation, payment gateway integration, file uploads and real-time messaging on the backend before production.

## Suggested build phases
**MVP:** trainer onboarding/profile, availability, class requests and booking management, student list, messaging/notifications, earnings/withdrawal request, course/resources, reviews and certificates.
**Phase 2:** trial classes, group classes, video sessions, packages, payment gateway and platform commission, parent accounts, multilingual/currency/timezone support.
**Phase 3:** AI tutor matching, learning assistant, quiz generation, AI study planner/notes, learning path and predictive progress insights.

## Structure
```text
src/
  components/       Sidebar, Topbar, reusable UI
  data/             Mock data
  pages/            Dashboard, Earnings, Profile, Management pages
  services/         Axios API client and trainer API methods
  App.jsx
  main.jsx
  styles.css
```
