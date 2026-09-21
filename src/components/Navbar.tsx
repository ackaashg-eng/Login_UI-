import { Box, Stack, Typography } from "@mui/material";

const NAV_LINKS = ["Home", "About", "Contacts", "Support"];

export default function Navbar() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: { xs: 2, md: 4 }, py: 2 }}
    >
      <Typography variant="subtitle1" fontWeight={700} color="#fff">
        Tuga's App
      </Typography>
      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
        {NAV_LINKS.map((link) => (
          <Typography
            key={link}
            component="a"
            href="#"
            variant="body2"
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              transition: "color 0.2s ease",
              "&:hover": { color: "#fff" },
            }}
          >
            {link}
          </Typography>
        ))}
      </Box>
    </Stack>
  );
}
