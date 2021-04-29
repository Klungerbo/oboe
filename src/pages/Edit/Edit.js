import {
  Container, Typography, Box,
  TextField, Grid, Paper,
  Button
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../store/actions/DataActions'
import flashcards from '../../data/flashcards'
import { useParams } from 'react-router';
import { DeckDescription } from "../../components/DeckEditInput/DeckDescription"
import DeckTitle from '../../components/DeckEditInput/DeckTitle';
import DeckColorPalette from '../../components/DeckEditInput/DeckColorPalette';
import DeckCardList from '../../components/DeckEditInput/DeckCardList';
import "../../data/config"
import { API_AUTH_SIGNIN, API_AUTH_SIGNUP, API_DECKS, API_FLASHCARDS } from '../../data/config';

const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;

const actions = async () => {
  

  return 10;
}

export default function Edit() {

  const { id } = useParams();
  const currentDeck = useSelector(state => state.currentDeck);
  const dispatch = useDispatch();

  const [cardDescriptionText, setCardDescriptionText] = useState("")
  const [cardFrontText, setCardFrontText] = useState("")
  const [cardBackText, setCardBackText] = useState("")

  console.log(currentDeck)

  const addCard = () => {
    dispatch(setCurrentDeck({
      ...currentDeck,
      a: {
        a: ""
      }
    }))
  }

  useEffect(() => {
    // TODO: setCurrentDeck the actual selected deck
    dispatch(setCurrentDeck(flashcards))

    const cardJson = {
      front: "testing",
      back: "testing even more",
      description: "very nice",
      last_reviewed_at: Date.now(),
      consecutive_correct: 3
    }
  
    const deckJson = {
      title: "nice",
      description: "desc",
      cardColor: "#FF0000",
      colorId: 1
    }
  
    const userJson = {
      email: "a@a.com",
      password: "123"
    }
  
    // 1. CREATE USER
    console.log("USER DATA")
    fetch(API_AUTH_SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-custom": "true" },
      credentials: "include",
      body: JSON.stringify(userJson)
    }).then(res => res.json().then(console.log));
  
    // 2. LOG IN
    console.log("LOGIN DATA")
    fetch(API_AUTH_SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userJson)
    }).then(res => res.json().then(console.log));
  
    // 3. MAKE DECK
    console.log("DECK DATA")
    fetch(API_DECKS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(deckJson)
    }).then(res => res.json().then(console.log));
  
    // 4. MAKE FLASHCARD
    console.log("CARD DATA")
    fetch(API_FLASHCARDS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(cardJson)
    }).then(res => res.json().then(console.log));

    console.log("running ")
  }, [])

  return (
    <Container>
      <Typography variant="h1">Deck</Typography>
      <Box mb={5}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column">
              <DeckTitle />
              <Box p={1} />
              <DeckDescription />
              <Box display="flex">
                <Typography>Color code: </Typography>
                <DeckColorPalette />
                <Box p={4} bgcolor=""></Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={1}>
              <Paper style={{ height: "100%", backgroundColor: currentDeck.cardColor }}>
                <Box display="flex" flexDirection="column" flexDirection="column"
                  alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                  <Typography variant="h2">{cardFrontText}</Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={1}>
              <Paper style={{ height: "100%", backgroundColor: currentDeck.cardColor }}>
                <Box p={3} display="flex" flexDirection="column" flexDirection="column"
                  alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                  <Typography variant="h2">{cardBackText}</Typography>
                  <Typography variant="body2">{cardDescriptionText}</Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h1">Cards</Typography>
      <Box px={5} py={1}>
        <Typography variant="h2">Add card</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <TextField onChange={e => setCardFrontText(e.target.value)} variant="outlined" label="Front" fullWidth value={cardFrontText} />
        </Grid>
        <Grid item xs={2}>
          <TextField onChange={e => setCardBackText(e.target.value)} variant="outlined" label="Back" fullWidth />
        </Grid>
        <Grid item xs={5}>
          <TextField onChange={e => setCardDescriptionText(e.target.value)} variant="outlined" label="Description" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <Button color="primary" variant="contained"
            onClick={() => addCard()}>
            Add card
            </Button>
        </Grid>
      </Grid>
      <Box px={5} pb={1} pt={5}>
        <Typography variant="h2">Cards in deck</Typography>
      </Box>
      <DeckCardList />
    </Container>
  )
}