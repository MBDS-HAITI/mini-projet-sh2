import {Card, CardContent, Typography} from "@mui/material";

const StatCard = ({ title, value, color }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderLeft: `6px solid ${color}`,
        boxShadow: 3
      }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export {StatCard};