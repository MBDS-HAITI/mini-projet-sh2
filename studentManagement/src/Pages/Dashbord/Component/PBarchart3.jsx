import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

function PBarChart3({ title, data }) {
  if (!data?.length) return null;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
         {title}
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="min" fill= "#ffa726"/>
                <Bar dataKey="avg" fill="#42a5f5" />
                <Bar dataKey="max" fill="#66bb6a" />
            </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export {PBarChart3};
