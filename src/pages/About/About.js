import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';


export default function About() {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">About</Typography>
          <Box ml={3}>
            <Typography variant="h2">School project</Typography>
            <Typography variant="body1" gutterBottom>
              Oboe resulted from a mandatory activity at NTNU IDATA2301 Webteknologi (2021), where the task was to create a dynamic web page.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box ml={3}>
            <Typography variant="h2">The team</Typography>
            <Typography variant="body1" gutterBottom>The team consists of two developers, Tomas Klungerbo Olsen and Simen Nesse Wiik.</Typography>

            <Box display="flex" flexDirection="row" flexWrap="wrap">
              <Box mb={2} mr={2}><PersonInfoCard avatar={"/assets/tko_avatar.jpg"} name="Simen Nesse Wiik" /></Box>
              <Box mb={2}><PersonInfoCard avatar={"/assets/snw_avatar.jpg"} name="Tomas Klungerbo Olsen"/></Box>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box py={4} />
          <Typography variant="h2">What is Oboe?</Typography>
          <Box ml={3}>
            <Typography variant="h3">Decks and cards</Typography>
            <Typography variant="body1" gutterBottom>
              With Oboe, you can create, manage, and review decks of flashcards.
              Each flashcard has a front and a back, where the front side is the question to which the back holds the answer.
            </Typography>
            <Typography variant="h3">Spaced repetition system</Typography>
            <Typography variant="body1" gutterBottom>
              Oboe automatically balances the review frequency of flashcards through a spaced repetition system (SRS).
              Remembering a flashcard decreases the appearance in a review session, while forgetting it increases the frequency.
              The SRS removes a flashcard from review sessions after enough consecutive recognitions.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
  /*
    return (
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={6}>
            <AboutInfoText />
          </Grid>
          <Grid container alignItems="center" item xs={12} md={6}>
            <Grid item>
              <Box pt={6} />
              <PersonInfoCard name="Simen Nesse Wiik" />
              <Box py={1} />
              <PersonInfoCard name="Tomas Klungerbo Olsen" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )*/
}

const PersonInfoCard = ({ name, avatar }) => {
  return (
    <StyledCard>
      <CardContent>
        <Grid container justify="space-between" direction="row">
          <Grid item xs={12}>{name}</Grid>
          <Grid item xs={12}>
            NTNU
          <CardMedia style={{ height: "40px", width: "40px" }}
              image={avatar}
              title="Contemplative Reptile"
            />
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
}

const AboutInfoText = () => {
  return (
    <>
      <Typography variant="h1">About</Typography>
      <Typography variant="h2">School project</Typography>
      <Typography variant="body1">
        Oboe resulted from a mandatory activity at NTNU IDATA2301 Webteknologi (2021), where the task was to create a dynamic web page.
            </Typography>
      <Typography variant="h2">The team</Typography>
      <Typography variant="body1">The team consists of two developers, Tomas Klungerbo Olsen and Simen Nesse Wiik.</Typography>

      <Box py={4} />

      <Typography variant="h1">What is Oboe?</Typography>
      <Typography variant="h2">Decks and cards</Typography>
      <Typography variant="body1">
        With Oboe, you can create, manage, and review decks of flashcards.
        Each flashcard has a front and a back, where the front side is the question to which the back holds the answer.
            </Typography>
      <Typography variant="h2">Spaced repetition system</Typography>
      <Typography variant="body1">
        Oboe automatically balances the review frequency of flashcards through a spaced repetition system (SRS).
        Remembering a flashcard decreases the appearance in a review session, while forgetting it increases the frequency.
        The SRS removes a flashcard from review sessions after enough consecutive recognitions.
            </Typography>
    </>

  );

}

const StyledCard = styled(Card)`
  height: 200px;
  width: 323px;
`;