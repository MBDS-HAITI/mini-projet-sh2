import { Container, Box } from "@mui/material";
import { Carousel } from "./Carrousel";
import {Anouncements} from "./Anouncements";
import {Projectors} from "./Projector";
import {Papers} from "./Papers";

function HomeContent() {
  return (
    <Container maxWidth="100%" sx={{ py: 1 }}>
      <Carousel/>
      <Anouncements />
      <Projectors />
      <Papers />
    </Container>
  );
}

export {HomeContent};
