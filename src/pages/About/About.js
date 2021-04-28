import {
  Box, Button, Card, CardContent,
  CardMedia, Container, Divider, Grid,
  GridListTileBar,
  Hidden, Link, Paper, Typography
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import styled from 'styled-components';

import { Icon, InlineIcon } from '@iconify/react';
import soundcloudIcon from '@iconify-icons/zmdi/soundcloud';
import discordIcon from '@iconify-icons/bi/discord';



export default function About() {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h1">About</Typography>
          <Box mx={3}>
            <Typography variant="h2">School project</Typography>
            <Typography variant="body1" gutterBottom>
              Oboe resulted from a mandatory activity at NTNU IDATA2301 Webteknologi (2021),
              where the task was to create a dynamic web page.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mx={3}>
            <Typography variant="h2">The team</Typography>
            <Typography variant="body1" gutterBottom>
              The team consists of two developers, Tomas Klungerbo Olsen and Simen Nesse Wiik.
            </Typography>
            <Grid container spacing={2} style={{maxWidth: "max-content"}}>
              <Grid item container xs={12} sm={6} >
                <PersonInfoCard
                  avatar={"/assets/snw_avatar.jpg"}
                  name="Simen Nesse Wiik"
                  github={{link: "https://github.com/revosw", name: "revosw"}}
                  soundcloud={{link: "https://soundcloud.com/simenwiik", name: "simenwiik"}}
                  discord={{name: "Revolution#1234"}}
                />
              </Grid>
              <Grid item container xs={12} sm={6} >
                <PersonInfoCard
                  avatar={"/assets/tko_avatar.jpg"}
                  name="Tomas Klungerbo Olsen"
                  github={{link: "https://github.com/Klungerbo", name: "Klungerbo"}}
                  discord={{name: "Nopsa#6931"}}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box py={4} />
          <Typography variant="h2">What is Oboe?</Typography>
          <Box mx={3}>
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

const PersonInfoCard = ({ name, avatar, github, mail, soundcloud, discord }) => {
  return (
    <StyledCard>
      <Box
        style={{height: "100%", flexShrink: 1}} flexBasis={323} p={1.5} 
        display="flex" flexDirection="column" 
      >
        <Box>
          <Typography gutterBottom style={{ fontSize: "1.5rem", fontFamily: "Bebas Neue" }}>
            {name}
          </Typography>
        </Box>
        <StyledMediaContainer flexBasis={100} flexGrow="0" display="flex" direction="row" flexWrap="wrap">
          <Box flexGrow="1" pb={1.5}>
            {github && github.link && github.name &&
              <Typography variant="body2" style={{fontSize: "1rem"}}>
                <GitHubIcon fontSize="inherit" /> GitHub:
                <Link style={{ color: "#00D1B9" }} href={github.link}> {github.name}</Link>
              </Typography>
            }
            {mail && mail.link && mail.name &&
              <Typography variant="body2" style={{fontSize: "1rem"}}><EmailIcon fontSize="inherit" /> Mail:
                <Link style={{ color: "#00D1B9" }} href={mail.link}> {mail.name}</Link>
              </Typography>
            }
            {soundcloud?.link && soundcloud?.name &&
              <Typography variant="body2" style={{fontSize: "1rem"}}><Icon icon={soundcloudIcon} fontSize="inherit" /> Soundcloud:
                <Link style={{ color: "#00D1B9" }} href={soundcloud.link}> {soundcloud.name}</Link>
              </Typography>
            }
            {discord?.name &&
              <Typography variant="body2" style={{fontSize: "1rem"}}><Icon icon={discordIcon} fontSize="inherit" /> Discord: {discord.name}
              </Typography>
            }
          </Box>
          <StyledAvatar src={avatar} />
        </StyledMediaContainer>
        <Box flexGrow="1"/>
        <Box display="flex" pt={1}>
          <StyledLogo src="/assets/ntnu-logo.png" />
        </Box>
      </Box>
    </StyledCard>
  );
}

const StyledMediaContainer = styled(Box)`
  ${({ theme }) => `
    flex-direction: row;

    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
    }
  `}
`;

const StyledAvatar = styled.img`
  ${({ theme }) => `
    ${theme.breakpoints.up('xs')} {
      width: 25vw;
      height: 25vw;
    }
    ${theme.breakpoints.up('sm')} {
      width: 11vw;
      height: 11vw;
    }
    ${theme.breakpoints.up('md')} {
      width: 10vw;
      height: 10vw;
    }
    ${theme.breakpoints.up('lg')} {
      width: 10vw;
      height: 10vw;
    }
    ${theme.breakpoints.up('xl')} {
      width: 7vw;
      height: 7vw;
    }
  `}
`;

const StyledLogo = styled.img`
  ${({ theme }) => `
    width: 40%;
    flex-basis: 400px;
    flex-shrink: 1;

    ${theme.breakpoints.down('xs')} {
    }
  `}
`;

const StyledCard = styled(Paper)`
  ${({ theme }) => `
    height: 100%;
    max-width: 425px;

    ${theme.breakpoints.down('xs')} {
    }
  `}
`;