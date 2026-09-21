import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

// Firebase config is read from environment variables (see .env.example).
// Create a `.env.local` file in the project root with your own Firebase
// project credentials before running the app.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// True once real-looking credentials are present. This lets the UI render
// (and be previewed) even before a Firebase project has been wired up —
// only the "Continue with Google" button needs real credentials to work.
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.apiKey.startsWith("AIza"),
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (err) {
    // Swallow init errors so a bad config never blanks the whole page —
    // useAuth surfaces a friendly message instead when sign-in is attempted.
    console.error("Firebase initialization failed:", err);
  }
}

export { app, auth };
export const googleProvider = new GoogleAuthProvider();
