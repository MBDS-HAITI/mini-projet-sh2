import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

function Papers({papers}) {
 return (
   <>
      {papers.map((_, i) => (
        <Grid item xs={12} md={12} key={i}>
          <Card sx={{ borderRadius: 4, height: "100%" }}>
            <Box
              component="img"
              src="/mbds_logo_transparent.svg"
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography fontWeight={700}>
                Vie étudiante & innovation
              </Typography>
              <Typography variant="body2">
                Découvrez les initiatives du campus
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}


export {Papers}