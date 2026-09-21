import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const drift1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(60px, 40px) scale(1.15); }
`;

const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-50px, -30px) scale(1.1); }
`;

export default function AmbientBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        bgcolor: "#0b0a12",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.55) 0%, rgba(168,85,247,0) 70%)",
          filter: "blur(40px)",
          animation: `${drift1} 12s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          right: "0%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,28,135,0.6) 0%, rgba(88,28,135,0) 70%)",
          filter: "blur(50px)",
          animation: `${drift2} 14s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          right: "20%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,70,239,0.35) 0%, rgba(217,70,239,0) 70%)",
          filter: "blur(60px)",
          animation: `${drift1} 16s ease-in-out infinite`,
          animationDelay: "2s",
        }}
      />
    </Box>
  );
}
