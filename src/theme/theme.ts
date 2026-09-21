import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      contrastText: "#0b0a12",
    },
    secondary: {
      main: "#a855f7",
    },
    background: {
      default: "#0b0a12",
      paper: "#14121f",
    },
    text: {
      primary: "#f4f2ff",
      secondary: "#9d97b8",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.04)",
            color: "#f4f2ff",
            transition: "box-shadow 0.25s ease, background-color 0.25s ease",
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.16)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255,255,255,0.3)",
            },
            "&.Mui-focused": {
              backgroundColor: "rgba(255,255,255,0.06)",
              boxShadow: "0 0 0 4px rgba(168, 85, 247, 0.25)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#a855f7",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#9d97b8",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
  },
});
