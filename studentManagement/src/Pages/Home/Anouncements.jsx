// Announcements.jsx
import { Card, CardContent, Typography, Stack } from "@mui/material";

function Announcements() {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography fontWeight={700} mb={2}>
          📢 Annonces
        </Typography>

        <Stack spacing={2}>
          <Typography variant="body2">
            
          </Typography>
          <Typography variant="body2">
            Nouvelle bibliothèque disponible
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export { Announcements };
