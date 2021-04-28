import {
  Box, Container, Grid,
  Link, Paper, Typography
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import styled from 'styled-components';

import { Icon } from '@iconify/react';
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
              Oboe resulted from a mandatory activity at NTNU IDATA2301 
              Webteknologi (2021), where the task was to create a dynamic web 
              page.
            </Typography>

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mx={3}>

            <Typography variant="h2">The team</Typography>
            <Typography variant="body1" gutterBottom>
              The team consists of two developers, Tomas Klungerbo Olsen and 
              Simen Nesse Wiik.
            </Typography> 

            <Grid container spacing={2} style={{maxWidth: "max-content"}}>
              <Grid item container xs={12} sm={12} md={6}>
                <PersonInfoCard
                  avatar={"/assets/snw_avatar.jpg"}
                  name="Simen Nesse Wiik"
                  github={{link: "https://github.com/revosw", name: "revosw"}}
                  soundcloud={{link: "https://soundcloud.com/simenwiik", name: "simenwiik"}}
                  discord={{name: "Revolution#1234"}}
                />
              </Grid>
              <Grid item container xs={12} sm={12} md={6} >
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
              Oboe is a tool that can assist in memorization through decks of 
              flashcards. A deck of flashcards can be created for each subject 
              to be memorized. As with physical flashcards, which consist of a 
              front and backside, the same is true for the flashcards in Oboe. 
              The front side contains a hint for the backside, which holds the 
              item to memorize. 
            </Typography>

            <Typography variant="h3">Spaced repetition system</Typography>
            <Typography variant="body1" gutterBottom>
              Oboe uses review sessions and spaced repetition to aid in more 
              efficient memorization. Review sessions present the flashcards in 
              a queue where the hardest to remember is placed first in line. 
              Spaced repetition is a technique where the item to memorize is 
              visited multiple times with a period of time in-between each 
              repetition. An item that is hard to remember is visited more 
              frequently in review sessions. Oboe automatically balances its 
              spaced repetition review queue, leaving more time for fun and less 
              time planning a review session. 
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
    width: 10vw;
    max-width: 120px;
    min-width: 100px;

    ${theme.breakpoints.up('xs')} {
      width: 25vw;
      min-width: 70px;
    }
    ${theme.breakpoints.up('sm')} {
      min-width: 100px;
    }
    ${theme.breakpoints.up('md')} {
      min-width: 120px;
    }
  `}
`;

const StyledLogo = styled.img`
  width: 40%;
  flex-basis: 400px;
  flex-shrink: 1;
`;

const StyledCard = styled(Paper)`
  max-width: 425px;
`;