// Home.jsx
import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import { TopBar } from "./HomeHeader";
import { LoginSheet } from "../Authentification/LoginSheet";
import { Hero } from "./Hero";
import { Announcements } from "./Anouncements";
import { Projectors } from "./Projector";
import { Papers } from "./Papers";
import { Footer } from "./Footer";

function Home() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#F5F8FF 0%,#FFFFFF 60%)",
      }}
    >
      <TopBar onLogin={() => setOpenLogin(true)} />
      <LoginSheet open={openLogin} onClose={() => setOpenLogin(false)} />

      <Container
  maxWidth="lg"
  sx={{
    pt: 5,
    display: "flex",
    justifyContent: "center",
  }}
>
  <Box sx={{ width: "100%" }}>
    <Hero />

    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={12} md={2}>
        <Announcements />
      </Grid>

      <Grid item xs={12} md={9}>
        <Projectors
        list={[
            {
            prenom: "Samantha",
            nom: "Henry",
            program: "MBDS",
            },
        ]}
    />
      </Grid>
    </Grid>

    <Box mt={5}>
      <Grid container spacing={2} justifyContent="center">
        <Papers papers = {[1,2, 3]}/>
      </Grid>
    </Box>
  </Box>
</Container>

      <Footer />
    </Box>
  );
}

export {Home};
