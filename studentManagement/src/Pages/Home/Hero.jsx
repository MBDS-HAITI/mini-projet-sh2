// Hero.jsx
import { Box, Typography, Button } from "@mui/material";

function Hero() {
  return (
    <Box textAlign="center" py={{ xs: 8, md: 12 }}>
      <Typography variant="h3" fontWeight={800} gutterBottom>
        Bienvenue sur le site de MBDS Haiti
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Actualités, vie étudiante et publications
      </Typography>

      <Button
        size="large"
        sx={{
          borderRadius: 6,
          px: 4,
          py: 1.4,
          background:
            "linear-gradient(135deg,#2774AE,#4F9DDE)",
          color: "white",
        }}
      >
        Découvrir le campus
      </Button>
    </Box>
  );
}

export { Hero };
