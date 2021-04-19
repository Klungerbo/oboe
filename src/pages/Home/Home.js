import React from 'react';
import {
  Box, Container, Grid,
  Typography
} from '@material-ui/core'

import Deck from '../../components/Deck/Deck';

import decks from '../../data/decks';
import colors from '../../data/colors';

/**
 * Oboe home page.
 * Changes state based on user login.
 * 
 * @returns jsx of the home page
 */
export default function Home() {
  // TODO: remove test variables
  const userLoggedIn = true;
  const userEmail = "email@email.com";

  /**
   * Oboe home page for a user.
   * 
   * @returns jsx of user home page.
   */
  const homeUser = () => {
    return (
      <Container>
        <Grid container>
          <Grid item>
            <Box pb={3} display="flex" flexDirection="row">
              <Typography variant="h2">My decks</Typography>
              <Box px={1} alignSelf="end">
                <Typography gutterBottom variant="body1" color="textSecondary">({userEmail})</Typography>
              </Box>
            </Box>
          </Grid>
          {mapDecks()}
        </Grid>
      </Container>
    );
  }

  /**
   * Oboe home page for a guest.
   * 
   * @returns jsx of guest home page.
   */
  const homeGuest = () => {
    return (
      <Container>
        <Typography variant="h1">Oboe</Typography>
      </Container>
    );
  }

  if (userLoggedIn) {
    return homeUser();
  }

  return homeGuest();
}

/**
 * Maps Oboe decks.
 * 
 * @returns jsx of Oboe decks.
 */
const mapDecks = () => {
  return (
    <Box pt={4} >
      <Grid container spacing={4} >
        {decks.map(deck => {
          return (
            <Grid key={deck.id} item xs={12} sm={6} lg={4}>
              <Deck deck={deck} color={colors[deck.colorId - 1].color} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
