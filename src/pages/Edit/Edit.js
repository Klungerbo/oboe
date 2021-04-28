import {
  Container, Typography, Box,
  TextField, TextareaAutosize, Grid,
  Paper, Button, useTheme
} from '@material-ui/core'
import { ColorPalette } from "material-ui-color";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../store/actions/DataActions'
import flashcards from '../../data/flashcards'
import colors from '../../data/colors'
import { useParams } from 'react-router';

export default function Edit() {
  const palette = colors
  
  
  
  
  
  
  
  
  
  
  .reduce((_color, curr) => {
    const {name} = _color;
    const {color} = _color;
    curr[name] = color;
    return {..._color, curr};
  });
  console.log(palette)
  const {id} = useParams();
  const dispatch = useDispatch();
  const currentDeck = useSelector(state => state.currentDeck);

  const [isEditing, setIsEditing] = useState(0);

  const editCard = card => {
    setIsEditing(card.id);
  }

  const deleteCard = card => {
    dispatch(setCurrentDeck(flashcards.filter(currentCard => currentCard.id !== card.id)));
  }

  const maybeDisable = card => {
    setTimeout(() => {
      if (document.activeElement.closest(`.-c-${card.id}`)) {
        setIsEditing(card.id)
      }
      else {
        setIsEditing(0)
      }
    }, 0)
  }

  useEffect(() => {
    dispatch(setCurrentDeck(flashcards))

  }, [])

  return (
    <Container>
      <Typography variant="h1">Deck</Typography>
      <Box mb={5}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column">
              <TextField variant="outlined" label="Title" />
              <TextareaAutosize rowsMin={10} />
              <Box display="flex">
                <Typography>Color code: </Typography>
                <ColorPalette palette={palette}></ColorPalette>
                <Box p={4} bgcolor=""></Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={1}>
              <Paper style={{ height: "100%" }}>
                <Box display="flex" flexDirection="column" flexDirection="column"
                  alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                  <Typography variant="h2">Front of current card</Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box height={1}>
              <Paper style={{ height: "100%" }}>
                <Box p={3} display="flex" flexDirection="column" flexDirection="column"
                  alignItems="center" justifyContent="center" style={{ height: "100%" }}>
                  <Typography variant="h2">Back of current card</Typography>
                  <Typography variant="body2">Description of card. Very long description to see if the card can handle it</Typography>
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
        <Grid item xs={3}>
          <TextField variant="outlined" label="Front" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField variant="outlined" label="Back" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField variant="outlined" label="Description" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained">Add card</Button>
        </Grid>
      </Grid>
      <Box px={5} pb={1} pt={5}>
        <Typography variant="h2">Cards in deck</Typography>
      </Box>
      {currentDeck.map(card => (
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField className={"-c-" +card.id} variant="outlined" onBlur={() => maybeDisable(card)} aria-label="Front" disabled={isEditing !== card.id} fullWidth defaultValue={card.frontside}></TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField className={"-c-" +card.id} variant="outlined" onBlur={() => maybeDisable(card)} aria-label="Front" disabled={isEditing !== card.id} fullWidth defaultValue={card.backside}></TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField className={"-c-" +card.id} variant="outlined" onBlur={() => maybeDisable(card)} aria-label="Description" disabled={isEditing !== card.id} fullWidth defaultValue={card.description}></TextField>
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
