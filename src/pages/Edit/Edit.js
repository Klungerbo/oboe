import {
  Container, Typography, Box,
  TextField, Grid, Button,
  Dialog, CardContent
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCards, setCurrentDeck, setDecks } from '../../store/actions/DataActions'
import { useHistory, useParams } from 'react-router';
import { DeckDescription } from "../../components/DeckEditInput/DeckDescription"
import DeckTitle from '../../components/DeckEditInput/DeckTitle';
import DeckColorPalette from '../../components/DeckEditInput/DeckColorPalette';
import DeckCardList from '../../components/DeckEditInput/DeckCardList';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import "../../data/config"
import { API_DECKS, API_FLASHCARDS } from '../../data/config';
import { StyledFlashcardInfo } from '../../components/DeckEditInput/FlashcardInfoStyled';
import { StyledAddButton, StyledAddButtonContainer } from '../../components/DeckEditInput/AddButtonStyled';
import { Add, Delete } from '@material-ui/icons';
import { StyledFlashcardPaper } from '../../components/DeckEditInput/FlashcardPaperStyled';
import { StyledDialogTitle } from '../../components/SignUpDialog/SignupDialogStyled';

const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;

export default function Edit() {

  const { id: deckId } = useParams();
  const history = useHistory();
  const currentDeck = useSelector(state => state.currentDeck);
  const decks = useSelector(state => state.decks);
  const currentCards = useSelector(state => state.currentCards);
  const dispatch = useDispatch();

  const [cardFrontText, setCardFrontText] = useState("")
  const [cardBackText, setCardBackText] = useState("")
  const [cardDescriptionText, setCardDescriptionText] = useState("")

  const [inputFrontError, setinputFrontError] = useState(false)
  const [inputBackError, setinputBackError] = useState(false)

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleAddFlashcard = () => {
    
    if (!cardFrontText.trim()) {
      setinputFrontError(true)
    } else {
      setinputFrontError(false)
    }
    
    if (!cardBackText.trim()) {
      setinputBackError(true)
    } else {
      setinputBackError(false)
    }
    
    if (!cardFrontText.trim() || !cardBackText.trim()) {
      return;
    }

    const newFlashcard = {
      front: cardFrontText,
      back: cardBackText,
      description: cardDescriptionText,
      consecutiveCorrect: 0,
      lastReviewedAt: Date.now(),
      deckId: deckId
    }

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
        dispatch(setCurrentCards([...currentCards, newFlashcard]));
        setCardFrontText("");
        setCardBackText("");
        setCardDescriptionText("");
      }).catch(console.log);
    }).catch(console.log);
  };

  useEffect(() => {
    if (decks.length === 0) {
      fetch(API_DECKS, {
        credentials: "include"
      }).then(response => {
        response.json().then(response => {
          const foundDeck = response.find(deck => deck.id === parseInt(deckId))
          if (!foundDeck) {
            history.push("/");
            return;
          }
          dispatch(setCurrentDeck(foundDeck));
        })
      })
    } else {
      const _currentDeck = decks.find(deck => deck.id === parseInt(deckId))
      if (!_currentDeck) {
        history.push("/");
        return;
      }

      dispatch(setCurrentDeck(_currentDeck));
    }

    fetch(`${API_FLASHCARDS}/${deckId}`, {
      credentials: "include"
    }).then(response => {
      response.json().then(res => {
        dispatch(setCurrentCards(res))
      })
    })
  }, [deckId, decks, dispatch, history])

  const showCardsIfPresent = () => {
    if (currentCards.length !== 0) {
      return <DeckCardList />
    } else {
      return (
        <>
          <Box display="flex" alignItems="center" >
            <InfoOutlinedIcon fontSize="large" />
            <Box px={0.5} />
            <Typography variant="body2">There are no cards in the deck. You can start by adding a card in the section right above.</Typography>
          </Box>
        </>
      )
    }
  }

  const handleDeleteDeck = () => {
    setDeleteConfirmationOpen(true);
  }

  const deleteDeck = ({ id }) => {
    fetch(API_DECKS, {
      method: "DELETE",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id })
    }).then(() => {
      dispatch(setDecks(decks.filter(deck => currentDeck.id !== deck.id)));
      history.push("/");
    })
  }

  return (
    <>
      <Container>
        <Typography variant="h1">Deck</Typography>
        <Box mt={2} mb={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection="column">
                <DeckTitle />
                <Box p={1} />
                <DeckDescription />
                <Box alignSelf="flex-end">
                  <DeckColorPalette />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box height={1}>
                <StyledFlashcardPaper bgcolor={currentDeck?.hexColor}>
                  <Box p={3} display="flex" flexDirection="column"
                    alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                    <Typography variant="h2">{cardFrontText || "Front"}</Typography>
                  </Box>
                </StyledFlashcardPaper>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box height={1}>
                <StyledFlashcardPaper bgcolor={currentDeck?.hexColor}>
                  <Box p={3} display="flex" flexDirection="column"
                    alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                    <Typography variant="h2">{cardBackText || "Back"}</Typography>
                    <Typography variant="body2">{cardDescriptionText || "Description"}</Typography>
                  </Box>
                </StyledFlashcardPaper>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h1">Cards</Typography>
        <Box pb={2}>
          <Typography variant="h2">Add card</Typography>
        </Box>
        <StyledFlashcardInfo display="flex">
          <Box flexGrow={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <TextField onChange={e => setCardFrontText(e.target.value)}
                  variant="outlined"
                  label="Front"
                  fullWidth
                  value={cardFrontText}
                  error={inputFrontError}
                  inputProps={{
                    maxLength: MAX_FRONT_LENGTH,
                    "aria-label": "Text on frontside of flashcard"
                  }} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField onChange={e => setCardBackText(e.target.value)}
                  variant="outlined"
                  label="Back"
                  fullWidth
                  value={cardBackText}
                  error={inputBackError}
                  inputProps={{
                    maxLength: MAX_BACK_LENGTH,
                    "aria-label": "Text on backside of flashcard"
                  }} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField onChange={e => setCardDescriptionText(e.target.value)}
                  variant="outlined"
                  label="Description (optional)"
                  fullWidth
                  value={cardDescriptionText}
                  inputProps={{
                    maxLength: MAX_CARD_DESCRIPTION_LENGTH,
                    "aria-label": "Description on backside of flashcard"
                  }} />
              </Grid>
            </Grid>
          </Box>
          <Box p={1} />
          <StyledAddButtonContainer>
            <StyledAddButton color="primary" variant="contained" fullWidth
              onClick={() => handleAddFlashcard()}>
              <Add />
              Add card
            </StyledAddButton>
          </StyledAddButtonContainer>
        </StyledFlashcardInfo>
        <Box pb={1} pt={3}>
          <Typography variant="h2">Cards in deck</Typography>
        </Box>
        {showCardsIfPresent()}
        <Box pt={7}>
          <Button variant="contained" color="secondary" startIcon={<Delete />} onClick={handleDeleteDeck}>Delete deck</Button>
        </Box>
      </Container >
      <Dialog aria-labelledby="cancel-confirm-title" aria-describedby="cancel-confirm-description" open={deleteConfirmationOpen} >
        <CardContent>
          <Grid
            container
            spacing={2}
            justify="flex-start"
            align="center"
          >
            <Grid item xs={12}>
              <StyledDialogTitle variant="h2" id="cancel-confirm-title">Are you sure?</StyledDialogTitle>
              <StyledDialogTitle variant="body1" id="cancel-confirm-description">
                Are you sure you want to delete the deck "{currentDeck.name}"?
                </StyledDialogTitle>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setDeleteConfirmationOpen(false)}
                type="submit"
              >
                Cancel
          </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained"
                onClick={() => { deleteDeck(currentDeck); setDeleteConfirmationOpen(false) }} color="secondary" fullWidth>Delete</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Dialog>
    </>
  )
}