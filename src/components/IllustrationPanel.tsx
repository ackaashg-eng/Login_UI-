import { keyframes } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import protectionIllustration from "@/assets/protection-enabled.svg";
import type { AuthMode } from "@/types/authMode";

// Gentle float, like the illustration is hovering.
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
`;

const pulseGlow = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
`;

const crossfadeIn = keyframes`
  0%, 49.9% { opacity: 0; z-index: 1; }
  50%, 100% { opacity: 1; z-index: 5; }
`;

const TRANSITION = "transform 0.6s ease-in-out";

interface IllustrationPanelProps {
  mode: AuthMode;
}

export default function IllustrationPanel({ mode }: IllustrationPanelProps) {
  const isRegister = mode === "register";

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Login scene */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: TRANSITION,
          transform: isRegister ? "translateX(-100%)" : "translateX(0)",
          zIndex: 2,
        }}
      >
        <Scene tagline="Your account, secured and ready." />
      </Box>

      {/* Register scene */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: TRANSITION,
          transform: isRegister ? "translateX(0)" : "translateX(100%)",
          opacity: isRegister ? 1 : 0,
          zIndex: isRegister ? 5 : 1,
          animation: isRegister ? `${crossfadeIn} 0.6s` : "none",
        }}
      >
        <Scene tagline="Protection enabled from day one." />
      </Box>
    </Box>
  );
}

function Scene({ tagline }: { tagline: string }) {
  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: 320, textAlign: "center" }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.5) 0%, rgba(168,85,247,0) 70%)",
          filter: "blur(20px)",
          animation: `${pulseGlow} 4s ease-in-out infinite`,
          zIndex: 0,
        }}
      />

      <Box
        component="img"
        src={protectionIllustration}
        alt="Illustration of a shield with a checkmark, representing account protection"
        sx={{
          width: "85%",
          display: "block",
          position: "relative",
          zIndex: 1,
          mx: "auto",
          filter: "drop-shadow(0 20px 40px rgba(168,85,247,0.4))",
          animation: `${float} 5s ease-in-out infinite`,
        }}
      />

      <Typography variant="body2" sx={{ mt: 4, color: "text.secondary", px: 2 }}>
        {tagline}
      </Typography>
    </Box>
  );
}
