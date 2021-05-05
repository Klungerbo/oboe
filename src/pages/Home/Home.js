import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Container, Grid,
  Hidden, Typography
} from '@material-ui/core'

import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpDialog from '../../components/SignUpDialog/SignUpDialog';
import Deck from '../../components/Deck/Deck';

import { setDecks } from '../../store/actions/DataActions';
import { API_DECKS, oboeFetch } from '../../utils/oboeFetch';

/**
 * The home page of Oboe. When logged in, it will display all the user's decks. When logged out,
 * it will show a login prompt.
 * 
 * @returns JSX of guest/user home page
 */
export default function Home() {
  const dispatch = useDispatch();

  const userLoggedIn = useSelector(state => state.loggedIn);
  const userEmail = useSelector(state => state.userEmail);
  const decks = useSelector(state => state.decks);

  const [isSignUpDialogOpen, setIsSignupDialogOpen] = React.useState(false);

  

  /**
   * Maps Oboe decks.
   * 
   * @returns jsx of Oboe decks.
   */
  const mapDecks = () => {
    return (
      <Box pt={4} >
        <Grid container spacing={4} >
          <Grid item xs={12} sm={6} lg={4}>
            <AddDeck />
          </Grid>
          {decks && decks.length > 0 && decks.sort((a, b) => a.id - b.id) && decks.map(deck => {
            return (
              <Grid key={deck.id} item xs={12} sm={6} lg={4}>
                <Deck deck={deck} color={deck.hexColor} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const handleGetDecks = async () => {
    const response = await oboeFetch(API_DECKS)
    if (response.status !== 200) {
      console.log("This shouldn't happen")
      return;
    }
    
    const decks = await response.json();
    dispatch(setDecks(decks));
  }

  useEffect(() => {
    if (userLoggedIn) {
      handleGetDecks();
    }
  }, [userLoggedIn, handleGetDecks]);

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
        </Grid>
        {mapDecks()}
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

              <Box mx={3}>
                <Typography variant="h2">Important!</Typography>
                <Typography variant="body1">
                  Before you start getting invested in Oboe, you should know that
                  this is a school project and that we do not intend to keep this
                  website maintained and running forever.
              </Typography>
                <Box py={1} />
                <Typography variant="h2">Decks and cards</Typography>
                <Typography variant="body1">
                  Oboe is a tool that can assist in memorization through decks of
                  flashcards. A deck of flashcards can be created for each subject
                  to be memorized. As with physical flashcards, which consist of a
                  front and backside, the same is true for the flashcards in Oboe.
                  The front side contains a hint for the backside, which holds the
                  item to memorize.
              </Typography>
                <Box py={2} />
                <Typography variant="h2">Spaced repetition system</Typography>
                <Typography variant="body1">
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
