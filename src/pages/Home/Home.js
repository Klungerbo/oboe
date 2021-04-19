import React from 'react';
import { Box, Card, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Deck from '../../components/Deck/Deck';

export default function Home() {
  const userLoggedIn = true;
  const userEmail = "email@email.com";

  const colors = [
    {
      id: 1,
      name: "tael",
      color: "#009688",
    },
    {
      id: 2,
      name: "red",
      color: "#f44336",
    },
    {
      id: 3,
      name: "indigo",
      color: "#3f51b5",
    },
    {
      id: 4,
      name: "blue",
      color: "#2196f3",
    },
    {
      id: 5,
      name: "green",
      color: "#357a38",
    }
  ];

  const decks = [
    {
      id: 1,
      title: "English to Japanese verbs",
      description: "This deck contains the 200 most common Japanese verbs",
      colorId: 1,
    },
    {
      id: 2,
      title: "Periodic table",
      description: "This deck contains all the elements of the periodic table",
      colorId: 2,
    },
    {
      id: 3,
      title: "Title with max charactersTitle with max characters",
      description: "Description with max charact ersabababa bababababab aba babababa babababa bababababababa bababab abababa bababababa babababa babababababa babababa bab",
      colorId: 3,
    },
    {
      id: 4,
      title: "Periodic table",
      description: "This deck contains all the elements of the periodic table",
      colorId: 4,
    },
  ];

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const cards = () => {
    return (
      <Box pt={4} >
        <Grid container spacing={3} >
          {decks.map(({id, title, colorId, description}) => {
            return (
              <Grid key={id} item xs={12} sm={6} lg={4} >
                <Deck description={description} title={title} color={colors[colorId - 1].color} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };


  const userHome = () => {
    return (
      <>
        <Grid container>
          <Grid item>
            <Box display="flex" flexDirection="row">
              <Typography variant="h2">My decks</Typography>
              <Box px={1} alignSelf="end">
                <Typography gutterBottom variant="body1" color="textSecondary">({userEmail})</Typography>
              </Box>
            </Box>
          </Grid>
          {cards()}
        </Grid>
      </>
    );
  };

  const guestHome = () => {
    return (
      <Typography variant="h1">Oboe</Typography>
    );
  };

  return (
    <Container>
      {userLoggedIn ? userHome() : guestHome()}
    </Container>
  );
}
