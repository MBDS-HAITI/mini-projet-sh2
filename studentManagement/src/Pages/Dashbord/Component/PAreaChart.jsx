import {
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

function PAreaChart({ title, data }) {
  if (!data?.length) return null;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
         {title}
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" fill="#90caf9" stroke="#1976d2" />
            </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export {PAreaChart};
