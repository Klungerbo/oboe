import React from 'react';
import {
  Box, Container, Grid,
  Hidden, Typography
} from '@material-ui/core'

import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpDialog from '../../components/SignUpDialog/SignUpDialog';
import Deck from '../../components/Deck/Deck';

import decks from '../../data/decks';
import colors from '../../data/colors';

/**
 * The home page of Oboe. When logged in, it will display all the user's decks. When logged out,
 * it will show a login prompt.
 * 
 * @returns JSX of guest/user home page
 */
export default function Home() {
  // TODO: remove test variables
  const userLoggedIn = false;
  const userEmail = "email@email.com";

  const [isSignUpDialogOpen, setIsSignupDialogOpen] = React.useState(false);

  /**
   * Oboe home page for a user.
   * 
   * @returns jsx of user home page.
   */
  const homeUser = () => {
    return (
      <Container maxWidth="lg">
        <Grid container>
          <Grid item>
            <Box pb={3} display="flex" flexDirection="row">
              <Typography variant="h1">My decks</Typography>
              <Box px={1} alignSelf="flex-end">
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
      <>
        <Container>
          <Grid container justify="space-between" spacing={4}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="h1">Oboe</Typography>
              <Box py={1} />
              <Typography variant="h2">Decks and cards</Typography>
              <Typography variant="body1">With Oboe, you can create, manage, and review decks of flashcards.
              Each card has a front and backside, where the front is the question to which the back holds the answer.
            </Typography>
            <Box py={2} />
              <Typography variant="h2">Spaced repetition system</Typography>
              <Typography variant="body1">Oboe automatically balances the frequency of a card’s presence in a review.
              Cards that have been forgotten will show up more frequently than those that were remembered.
            </Typography>
            </Grid>
            <Grid container justify="flex-end" alignItems="center" item xs={12} sm={12} md={6}>
              <Hidden smDown >
                <Box maxWidth={400} flexGrow={1}>
                  <LoginForm onOpen={setIsSignupDialogOpen} />
                </Box>
              </Hidden>
              <Hidden mdUp >
                <Box maxWidth={400} pt={3} flexGrow={1} mx="auto">
                  <LoginForm onOpen={setIsSignupDialogOpen} />
                </Box>
              </Hidden>
            </Grid>
          </Grid>
        </Container>
        <SignUpDialog open={isSignUpDialogOpen} onClose={setIsSignupDialogOpen} />
      </>
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

