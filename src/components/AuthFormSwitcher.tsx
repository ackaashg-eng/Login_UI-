import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import type { AuthMode } from "@/types/authMode";

// Mirrors the reference project's `@keyframes move` — the incoming panel
// stays invisible and behind (z-index 1) for the first half of the
// transition, then snaps to visible/on-top (z-index 5) at the midpoint.
// This is what makes the crossfade feel like a single continuous swap
// instead of two panels overlapping messily.
const crossfadeIn = keyframes`
  0%, 49.9% { opacity: 0; z-index: 1; }
  50%, 100% { opacity: 1; z-index: 5; }
`;

const TRANSITION = "transform 0.6s ease-in-out";

interface AuthFormSwitcherProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onGoogleSignIn: () => Promise<unknown>;
}

export default function AuthFormSwitcher({ mode, onModeChange, onGoogleSignIn }: AuthFormSwitcherProps) {
  const isRegister = mode === "register";

  return (
    // display: "grid" + placing both panels in the SAME grid cell
    // (gridArea: "1 / 1") makes the container automatically size its
    // height to whichever panel is tallest — no fixed/guessed height,
    // and no vertical overflow, so no scrollbar. Horizontal overflow is
    // still hidden so the sliding panels don't widen the page.
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 360,
        display: "grid",
        overflowX: "hidden",
      }}
    >
      {/* Login panel — slides fully off to the left when register is active. */}
      <Box
        sx={{
          gridArea: "1 / 1",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          transition: TRANSITION,
          transform: isRegister ? "translateX(-100%)" : "translateX(0)",
          zIndex: 2,
        }}
      >
        <LoginForm onSwitchToRegister={() => onModeChange("register")} onGoogleSignIn={onGoogleSignIn} />
      </Box>

      {/* Register panel — starts off-screen to the right, slides in and
          crossfades using the same keyframe idea as the reference's
          `.container.active .sign-up { animation: move 0.6s }`. */}
      <Box
        sx={{
          gridArea: "1 / 1",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          transition: TRANSITION,
          transform: isRegister ? "translateX(0)" : "translateX(100%)",
          opacity: isRegister ? 1 : 0,
          zIndex: isRegister ? 5 : 1,
          animation: isRegister ? `${crossfadeIn} 0.6s` : "none",
        }}
      >
        <RegisterForm onSwitchToLogin={() => onModeChange("login")} onGoogleSignIn={onGoogleSignIn} />
      </Box>
    </Box>
  );
}
