# Tuga's App — Login Page

## Live Demo
https://tuga-login-app.web.appclear


A dark, glassmorphic login/register page built with **React + Vite + TypeScript**, styled with **Material UI (MUI)**, with a sliding Login/Register toggle and **Firebase Authentication (Google Sign-In)**.

## Features

- Responsive, dark "glow" UI with a sliding Login/Register toggle (CSS transform + transition, no extra libraries).
- Client-side form validation (required fields, email format, password rules, confirm-password match). No backend login is implemented, per spec.
- "Continue with Google" via Firebase Authentication, available on both the Login and Register forms. Apple/Facebook buttons are shown for visual parity but are disabled (not implemented).
- After a successful Google sign-in, the user is redirected to `/dashboard`, which displays the Google OAuth **access token** for the session.

## Project structure

```
login-app/
├── src/
│   ├── assets/            # Illustration SVG
│   ├── components/        # AuthFormSwitcher, LoginForm, RegisterForm, IllustrationPanel, Navbar, AmbientBackground
│   ├── firebase/          # Firebase app init + useAuth hook
│   ├── pages/              # LoginPage, DashboardPage
│   ├── theme/              # MUI dark theme
│   ├── types/               # Shared AuthMode type
│   ├── App.tsx               # Router
│   └── main.tsx               # App entry point
├── .env.example            # Firebase config template
├── firebase.json            # Firebase Hosting config
├── .firebaserc                # Firebase project alias (fill in your project ID)
└── package.json
```

## 1. Install dependencies

```bash
npm install
```

## 2. Configure Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) → create a project.
2. Add a **Web app** to the project (`</>` icon) and copy the config values.
3. In **Authentication → Sign-in method**, enable **Google** as a provider.
4. Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

The app still renders fully without this file — only the Google Sign-In button needs real credentials to actually work.

## 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`.

## 4. Deploy to Firebase Hosting

```bash
npm install -g firebase-tools   # if not already installed
firebase login
```

Update `.firebaserc` with your actual Firebase project ID (replace `YOUR_FIREBASE_PROJECT_ID`), then:

```bash
npm run build
firebase deploy --only hosting
```

Firebase CLI will print your hosting URL (e.g. `https://your-project-id.web.app`).

> **Important:** In the Firebase Console, under **Authentication → Settings → Authorized domains**, add your hosting domain (e.g. `your-project-id.web.app`) so Google Sign-In works in production.

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: project scaffold"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Notes on assumptions

- The "Not a member? Register now" and "Already have an account? Sign in" links toggle between the Login and Register forms with a sliding animation — no page navigation.
- Apple/Facebook buttons are rendered for visual fidelity but are disabled — only Google Sign-In is wired to Firebase, per the requirements.
- The Google OAuth **access token** (not the Firebase ID token) is shown on the dashboard, since Firebase only exposes the OAuth access token at the moment of sign-in (via `GoogleAuthProvider.credentialFromResult`), so it's cached in `sessionStorage` for display after redirect.
