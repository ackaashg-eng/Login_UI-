import { useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onGoogleSignIn: () => Promise<unknown>;
}

export default function RegisterForm({ onSwitchToLogin, onGoogleSignIn }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const isValid = validate();
    if (isValid) {
      // No backend integration required per spec — just acknowledge success.
      alert("Form is valid! (No backend registration is implemented.)");
    }
  };

  const handleGoogleClick = async () => {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      await onGoogleSignIn();
    } catch (err) {
      setGoogleError(err instanceof Error ? err.message : "Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: 360 }}
    >
      <Typography variant="h4" sx={{ fontSize: { xs: 32, sm: 40 }, mb: 1 }}>
        Create account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Join <b>Tuga's App</b> and start organizing your work today.
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Full Name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={validate}
          error={submitted && Boolean(errors.name)}
          helperText={submitted && errors.name}
          autoComplete="name"
        />
        <TextField
          fullWidth
          label="Email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validate}
          error={submitted && Boolean(errors.email)}
          helperText={submitted && errors.email}
          autoComplete="email"
        />
        <TextField
          fullWidth
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validate}
          error={submitted && Boolean(errors.password)}
          helperText={submitted && errors.password}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                  size="small"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          placeholder="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validate}
          error={submitted && Boolean(errors.confirmPassword)}
          helperText={submitted && errors.confirmPassword}
          autoComplete="new-password"
        />
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        sx={{
          mt: 3,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        }}
      >
        Sign Up
      </Button>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ my: 3 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="caption" color="text.secondary">
          or sign up with
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>

      {googleError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {googleError}
        </Alert>
      )}

      {/* Only Google is wired to Firebase — Apple/Facebook are visual-only. */}
      <Stack direction="row" spacing={2} justifyContent="center">
        <IconButton
          onClick={handleGoogleClick}
          disabled={googleLoading}
          sx={{
            bgcolor: "rgba(255,255,255,0.06)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.16)",
            transition: "transform 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.14)",
              transform: "translateY(-3px) scale(1.08)",
            },
          }}
          aria-label="Sign up with Google"
        >
          {googleLoading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : <GoogleIcon fontSize="small" />}
        </IconButton>
        <IconButton
          disabled
          sx={{
            bgcolor: "rgba(255,255,255,0.06)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
          aria-label="Sign up with Apple (not implemented)"
        >
          <AppleIcon fontSize="small" />
        </IconButton>
        <IconButton
          disabled
          sx={{
            bgcolor: "rgba(255,255,255,0.06)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
          aria-label="Sign up with Facebook (not implemented)"
        >
          <FacebookIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        Already have an account?{" "}
        <Link
          component="button"
          type="button"
          onClick={onSwitchToLogin}
          underline="hover"
          sx={{ color: "#c084fc", fontWeight: 600 }}
        >
          Sign in
        </Link>
      </Typography>
    </Box>
  );
}
