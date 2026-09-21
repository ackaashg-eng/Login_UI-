import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import AmbientBackground from "@/components/AmbientBackground";
import { useAuth } from "@/firebase/useAuth";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
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
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              bgcolor: "rgba(20, 18, 31, 0.7)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              p: 4,
            }}
          >
            <Stack spacing={3} alignItems="center" textAlign="center">
              <Avatar
                src={user.photoURL ?? undefined}
                alt={user.displayName ?? "User"}
                sx={{ width: 72, height: 72 }}
              />
              <Box>
                <Typography variant="h5" fontWeight={700} color="#fff">
                  Welcome, {user.displayName ?? "there"}!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>

              <Box sx={{ width: "100%", textAlign: "left" }}>
                <Typography variant="subtitle2" fontWeight={700} color="#fff" gutterBottom>
                  Google OAuth Access Token
                </Typography>
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 2,
                    p: 2,
                    wordBreak: "break-all",
                    fontFamily: "monospace",
                    fontSize: 13,
                    color: "#f4f2ff",
                  }}
                >
                  {accessToken ?? "No access token found for this session."}
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ borderRadius: 28, px: 4 }}
              >
                Log out
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
