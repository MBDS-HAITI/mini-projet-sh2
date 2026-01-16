import {
  LineChart,
  CartesianGrid,
  Line,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

function PLineChart({ title, data }) {
  if (!data?.length) return null;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
         {title}
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis dataKey="value"/>
                <Tooltip />
                <Legend />
                {/* <Line type="monotone" dataKey="session" stroke="#1976d2" /> */}
            </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export {PLineChart};
