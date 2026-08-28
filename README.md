# Smaran Caregiver 🌼

A colourful, bubbly frontend prototype for **Smaran Caregiver**, based on the problem statement:

> AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in the North Eastern Region (NER)

This version is **frontend only**. It uses mock data and local React state, so there is no backend, database, authentication, Vercel, or API integration yet.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code or a terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the localhost URL shown by Vite.

## Build for production

```bash
npm run build
npm run preview
```

## GitHub

Create a new GitHub repository, then:

```bash
git init
git add .
git commit -m "Initial Smaran Caregiver prototype"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Where to change things later

The easiest prototype data is at the top of `src/main.jsx`:

- `patient` → patient/caregiver information
- `games` → memory games
- `reminders` → reminders
- `activity` → recent activity

When a backend is added later, these objects can be replaced with API/database calls without redesigning the UI.

### Suggested future modules

- Firebase/Supabase for authentication + database
- Patient profiles and caregiver accounts
- Real memory-game logic
- Reminder notifications
- AI-generated cognitive exercises
- Progress analytics
- Regional language support for NER languages
- Voice interaction for elderly users
- Emergency/contact workflow

## Design direction

The UI intentionally uses large controls, short labels, soft colours, rounded cards, friendly illustrations and encouraging language rather than a clinical dashboard aesthetic.
