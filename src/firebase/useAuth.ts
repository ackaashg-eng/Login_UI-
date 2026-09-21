import { useCallback, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "./config";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!auth) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState((prev) => ({ ...prev, user, loading: false }));
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!auth || !isFirebaseConfigured) {
      const message =
        "Firebase isn't configured yet. Add your project credentials to .env.local to enable Google Sign-In.";
      setState((prev) => ({ ...prev, error: message }));
      throw new Error(message);
    }
    setState((prev) => ({ ...prev, error: null, loading: true }));
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken ?? null;
      if (accessToken) {
        sessionStorage.setItem("accessToken", accessToken);
      }
      setState({
        user: result.user,
        accessToken,
        loading: false,
        error: null,
      });
      return { user: result.user, accessToken };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to sign in with Google.";
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    if (auth) {
      await signOut(auth);
    }
    sessionStorage.removeItem("accessToken");
    setState({ user: null, accessToken: null, loading: false, error: null });
  }, []);

  return { ...state, signInWithGoogle, logout };
}
