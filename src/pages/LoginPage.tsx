import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Fade, Grid, Grow } from "@mui/material";
import AuthFormSwitcher from "@/components/AuthFormSwitcher";
import IllustrationPanel from "@/components/IllustrationPanel";
import AmbientBackground from "@/components/AmbientBackground";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/firebase/useAuth";
import type { AuthMode } from "@/types/authMode";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    navigate("/dashboard");
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      <AmbientBackground />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Fade in={mounted} timeout={800}>
            <Box
              sx={{
                bgcolor: "rgba(20, 18, 31, 0.7)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
                overflow: "hidden",
              }}
            >
              <Navbar />
              <Grid container spacing={4} alignItems="center" sx={{ px: { xs: 2, md: 4 }, pb: { xs: 4, md: 6 } }}>
                <Grid item xs={12} md={6}>
                  <Grow in={mounted} timeout={700}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <AuthFormSwitcher mode={mode} onModeChange={setMode} onGoogleSignIn={handleGoogleSignIn} />
                    </Box>
                  </Grow>
                </Grid>
                <Grid item xs={12} md={6} sx={{ height: { md: 480 } }}>
                  <IllustrationPanel mode={mode} />
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}
