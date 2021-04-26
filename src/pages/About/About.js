import {
  Box, Button, Card, CardContent,
  CardMedia, Container, Divider, Grid,
  GridListTileBar,
  Hidden, Link, Paper, Typography
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
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
              Oboe resulted from a mandatory activity at NTNU IDATA2301 Webteknologi (2021),
              where the task was to create a dynamic web page.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box ml={3}>
            <Typography variant="h2">The team</Typography>
            <Typography variant="body1" gutterBottom>
              The team consists of two developers, Tomas Klungerbo Olsen and Simen Nesse Wiik.
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              <Box mb={2} mr={2}>
                <PersonInfoCard
                  avatar={"/assets/snw_avatar.jpg"}
                  name="Simen Nesse Wiik"
                  github={{link: "https://github.com/revosw", name: "revosw"}}
                />
              </Box>
              <Box mb={2}>
                <PersonInfoCard
                  avatar={"/assets/tko_avatar.jpg"}
                  name="Tomas Klungerbo Olsen"
                  github={{link: "https://github.com/Klungerbo", name: "Klungerbo"}}
                  mail={{link: "mailto:tomas@klungerbo.com", name: "tomas@klungerbo.com"}}
                />
              </Box>
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
}

const PersonInfoCard = ({ name, avatar, github, mail }) => {
  return (
    <StyledCard>
      <Box
        mx={1.5} py={1.5} minHeight="100%"
        display="flex" flexDirection="column" justifyContent="space-between"
      >
        <Box flexGrow="1">
          <Typography gutterBottom style={{ fontSize: "1.5rem", fontFamily: "Bebas Neue" }}>
            {name}
          </Typography>
        </Box>
        <Box display="flex" direction="row" flexWrap="wrap">
          <Box flexGrow="1">
            {github && github.link && github.name &&
              <Typography variant="body2" style={{fontSize: "0.85rem"}}>
                <GitHubIcon fontSize="inherit" /> GitHub:
                <Link style={{ color: "#00D1B9" }} href={github.link}> {github.name}</Link>
              </Typography>
            }
            {mail && mail.link && mail.name &&
              <Typography variant="body2" style={{fontSize: "0.85rem"}}><EmailIcon fontSize="inherit" /> Mail:
                <Link style={{ color: "#00D1B9" }} href={mail.link}> {mail.name}</Link>
              </Typography>
            }
          </Box>
          <StyledAvatar src={avatar} />
        </Box>
        <Box flexGrow="1" />
        <Box pt={1}><StyledLogo src="/assets/ntnu-logo.png" /></Box>
      </Box>
    </StyledCard>
  );
}

const StyledAvatar = styled.img`
  ${({ theme }) => `
    width: 100px;
    heigh: 100px;

    ${theme.breakpoints.down('xs')} {
      width: 75px;
      heigh: 75px;
    }
  `}
`;

const StyledLogo = styled.img`
  ${({ theme }) => `
    width: 300px;

    ${theme.breakpoints.down('xs')} {
      width: 266px;
    }
  `}
`;

const StyledCard = styled(Paper)`
  ${({ theme }) => `
    min-width: 323px;
    height: 100%;

    ${theme.breakpoints.down('xs')} {
      width: 290px;
      height: {290 * 0.618}px;
    }
  `}
`;