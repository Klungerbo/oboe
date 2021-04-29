import { Container, Grid, Typography } from "@material-ui/core";
import PersonInfoCard from "../../components/PersonInfoCard/PersonInfoCard";

export default function Contact() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1">Contact</Typography>
      <Grid container spacing={2} style={{ maxWidth: "max-content" }}>
        <Grid item container xs={12} sm={12} md={6}>
          <PersonInfoCard
            avatar={"/assets/snw_avatar.jpg"}
            name="Simen Nesse Wiik"
            github={{ link: "https://github.com/revosw", name: "revosw" }}
            soundcloud={{ link: "https://soundcloud.com/simenwiik", name: "simenwiik" }}
            discord={{ name: "Revolution#1234" }}
          />
        </Grid>
        <Grid item container xs={12} sm={12} md={6} >
          <PersonInfoCard
            avatar={"/assets/tko_avatar.jpg"}
            name="Tomas Klungerbo Olsen"
            github={{ link: "https://github.com/Klungerbo", name: "Klungerbo" }}
            discord={{ name: "Nopsa#6931" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
