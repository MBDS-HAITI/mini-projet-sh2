import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        py: 6,
        textAlign: "center",
        opacity: 0.6,
      }}
    >
      <Typography variant="body2">
        © 2026 MBDS|Haiti · Port-au-Prince · contact@campus.ht
      </Typography>
    </Box>
  );
}

export { Footer };
