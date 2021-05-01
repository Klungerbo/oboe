import {
  Container, Typography, Box,
  TextField, Grid, Paper,
  Button
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../store/actions/DataActions'
import { useHistory, useParams } from 'react-router';
import { DeckDescription } from "../../components/DeckEditInput/DeckDescription"
import DeckTitle from '../../components/DeckEditInput/DeckTitle';
import DeckColorPalette from '../../components/DeckEditInput/DeckColorPalette';
import DeckCardList from '../../components/DeckEditInput/DeckCardList';
import "../../data/config"
import { API_DECKS, API_FLASHCARDS } from '../../data/config';

const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;

export default function Edit() {

  const { id: deckId } = useParams();
  const history = useHistory();
  const currentDeck = useSelector(state => state.currentDeck);
  const decks = useSelector(state => state.decks);
  const dispatch = useDispatch();

  const [cardDescriptionText, setCardDescriptionText] = useState("")
  const [cardFrontText, setCardFrontText] = useState("")
  const [cardBackText, setCardBackText] = useState("")

  const handleAddFlashcard = () => {

    const newFlashcard = {
      front: cardFrontText,
      back: cardBackText,
      description: cardDescriptionText,
      consecutiveCorrect: 0,
      lastReviewedAt: Date.now(),
      deckId: deckId
    }

    // const newFlashcard = {
    //   front: flashcards.front[Math.floor(Math.random() * flashcards.front.length)],
    //   back: flashcards.back[Math.floor(Math.random() * flashcards.back.length)],
    //   description: flashcards.description[Math.floor(Math.random() * flashcards.description.length)],
    //   lastReviewedAt: new Date("2019-04-20"),
    //   consecutiveCorrect: Math.round(Math.random() * 5),
    //   deckId: decks[Math.floor(Math.random() * decks.length)].id
    // };

    fetch(API_FLASHCARDS, {
      credentials: "include",
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newFlashcard)
    }).then(res => {
      if (res.status !== 200)
        return;

      res.json().then(({ id }) => {
        newFlashcard.id = id;
        currentDeck[id] = newFlashcard;
        dispatch(setCurrentDeck(currentDeck));
        console.log(currentDeck)
      }).catch(console.log);
    }).catch(console.log);
  };




  useEffect(() => {
    if (decks.length === 0) {
      fetch(API_DECKS, {
        credentials: "include"
      }).then(response => {
        response.json().then(response => {
          const _currentDeck = response.find(deck => deck.id === parseInt(deckId))
          if (!_currentDeck) {
            history.push("/");
            return;
          }
          dispatch(setCurrentDeck(_currentDeck));
          console.log(_currentDeck);
        })
      })
    } else {
      const _currentDeck = decks.find(deck => deck.id === parseInt(deckId))
      if (!_currentDeck) {
        history.push("/");
        return;
      }

      dispatch(setCurrentDeck(_currentDeck));
      console.log(_currentDeck)
    }

    fetch(`${API_FLASHCARDS}/${deckId}`, {
      credentials: "include"
    }).then(response => {
      response.json().then(res => {
        dispatch(setCurrentDeck({ ...currentDeck, ...res }))
      })
    })
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
              <Paper style={{ height: "100%", backgroundColor: currentDeck && currentDeck.cardColor }}>
                <Box display="flex" flexDirection="column"
                  alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                  <Typography variant="h2">{cardFrontText}</Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={1}>
              <Paper style={{ height: "100%", backgroundColor: currentDeck && currentDeck.cardColor }}>
                <Box p={3} display="flex" flexDirection="column"
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
            onClick={() => handleAddFlashcard()}>
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