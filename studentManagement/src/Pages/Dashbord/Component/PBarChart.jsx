import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

function PBarChart({ title, data, layout = "vertical" }) {
  if (!data?.length) return null;

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
         {title}
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} layout={layout}>
            <XAxis type ="number" allowDecimals="false"/>
            <YAxis dataKey="name" type="category"/>
            <Tooltip />
            <Bar dataKey="value" fill="#3c19d6ff" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export {PBarChart};
