// Projectors.jsx
import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";

function Projectors({list =[]}) {
   return (
    <Card
      sx={{
        borderRadius: 4,
        color: "white",
        background:
          "linear-gradient(135deg,#FFD10028,#2774AE92)",
      }}
    >
      <CardContent>
        <Typography fontWeight={700}>
          🎉 Anniversaires
        </Typography>

        {list.length === 0 && (
          <Typography mt={2} variant="body2">
            Aucun anniversaire aujourd’hui
          </Typography>
        )}

        {list.map((person, i) => {
          const initials =
            `${person.prenom?.[0] ?? ""}${person.nom?.[0] ?? ""}`;

          return (
            <Stack
              direction="row"
              spacing={2}
              mt={3}
              key={i}
              alignItems="center"
            >
              <Avatar sx={{ bgcolor: "rgba(45, 45, 162, 0.25)" }}>
                {initials.toUpperCase()}
              </Avatar>

              <Typography variant="body2">
                <strong>
                  {person.prenom} {person.nom}
                </strong>{" du programme "}
                {person.program} {" fête un nouveau printemps aujourd'hui. Nous lui souhaitons un joyeux anniversaire! "}
              </Typography>
            </Stack>
          );
        })}
      </CardContent>
    </Card>
  );
}

export { Projectors };
