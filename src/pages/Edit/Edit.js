import {
  Container, Typography, Box,
  TextField, Grid, Paper,
  Button
} from '@material-ui/core'
import { ColorPalette } from "material-ui-color";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../store/actions/DataActions'
import flashcards from '../../data/flashcards'
import { colorPalette } from '../../data/colors'
import { useParams } from 'react-router';

const dispatch = useDispatch();
const MAX_DECK_DESCRIPTION_LENGTH = 150;
const MAX_TITLE_LENGTH = 50;
const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;
const currentDeck = useSelector(state => state.currentDeck);


export default function Edit() {
  
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(0);
  const [deckDescriptionText, setDeckDescriptionText] = useState("");
  const [deckTitleText, setDeckTitleText] = useState("");
  const [deckColor, setDeckColor] = useState("");

  const [cardDescriptionText, setCardDescriptionText] = useState("")
  const [cardFrontText, setCardFrontText] = useState("")
  const [cardBackText, setCardBackText] = useState("")

  useEffect(() => {
    const colorCode = colorPalette[deckColor];
    dispatch(setCurrentDeck({ ...currentDeck, cardColor: colorCode }))
    console.log(currentDeck)
  }, [deckColor])
  const editCard = card => {
    setIsEditing(card.id);
  }

  const deleteCard = card => {
    dispatch(setCurrentDeck(flashcards.filter(currentCard => currentCard.id !== card.id)));
  }

  const maybeDisable = card => {
    setTimeout(() => {
      if (document.activeElement.closest(`card${card.id}`)) {
        setIsEditing(card.id)
      }
      else {
        setIsEditing(0)
      }
    }, 1000)
  }

  console.log("running outside")

  useEffect(() => {
    dispatch(setCurrentDeck(flashcards))
    console.log("running ")
  }, [])

  return (
    <Container>
      <Typography variant="h1">Deck</Typography>
      <Box mb={5}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column">
              <TextField variant="outlined"
                label={`Title (max ${MAX_TITLE_LENGTH} characters)`}
                inputProps={{ maxLength: MAX_TITLE_LENGTH }}
                onChange={e => setDeckTitleText(e.target.value)} defaultValue={deckTitleText}
                helperText={`${deckTitleText.length} / ${MAX_TITLE_LENGTH}`} />
              <Box p={1} />
              <TextField variant="outlined"
                inputProps={{ maxLength: MAX_DECK_DESCRIPTION_LENGTH }}
                onChange={e => setDeckDescriptionText(e.target.value)}
                label={`Description (max ${MAX_DECK_DESCRIPTION_LENGTH} characters)`}
                multiline rows={4} defaultValue={deckDescriptionText}
                helperText={`${deckDescriptionText.length} / ${MAX_DECK_DESCRIPTION_LENGTH}`} />
              <Box display="flex">
                <Typography>Color code: </Typography>
                <ColorPalette onSelect={e => setDeckColor(e)} palette={colorPalette}></ColorPalette>
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
          <TextField onChange={e => setCardFrontText(e.target.value)} variant="outlined" label="Front" fullWidth />
        </Grid>
        <Grid item xs={2}>
          <TextField onChange={e => setCardBackText(e.target.value)} variant="outlined" label="Back" fullWidth />
        </Grid>
        <Grid item xs={5}>
          <TextField onChange={e => setCardDescriptionText(e.target.value)} variant="outlined" label="Description" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <Button color="primary" variant="contained">Add card</Button>
        </Grid>
      </Grid>
      <Box px={5} pb={1} pt={5}>
        <Typography variant="h2">Cards in deck</Typography>
      </Box>
      {flashcards.map(card => (
        <Grid key={card.id} container spacing={3}>
          <Grid item xs={2}>
            <TextField className={"card" + card.id} variant="outlined" onBlur={() => maybeDisable(card)} aria-label="Front" disabled={isEditing !== card.id} fullWidth defaultValue={card.frontside}></TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField inputProps className={"card" + card.id} variant="outlined" onBlur={() => maybeDisable(card)} aria-label="Front" disabled={isEditing !== card.id} fullWidth defaultValue={card.backside}></TextField>
          </Grid>
          <Grid item xs={5}>
            <TextField className={"card" + card.id} variant="outlined" onBlur={() => maybeDisable(card)} aria-label="Description" disabled={isEditing !== card.id} fullWidth defaultValue={card.description}></TextField>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" onClick={() => editCard(card)}>Edit</Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="secondary" onClick={() => deleteCard(card)}>Delete</Button>
          </Grid>
        </Grid>
      ))}
    </Container>
  )
}