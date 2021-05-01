import { Button, Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setCurrentDeck } from '../../store/actions/DataActions';

const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;

export default function DeckCardList() {
  const [isEditing, setIsEditing] = useState(0);
  const currentDeck = useSelector(state => state.currentDeck);
  const dispatch = useDispatch();
  const {id} = useParams();

  const maybeDisable = card => {
    setTimeout(() => {
      if (document.activeElement.closest(`.card${card.id}`)) {
        setIsEditing(card.id)
      }
      else {
        setIsEditing(0)
      }
    }, 0)
  }

  const editCard = card => {
    setIsEditing(card.id);
  }

  const deleteCard = card => {
    // TODO - fix
    fetch()
    dispatch(setCurrentDeck(currentDeck.filter(currentCard => currentCard.id !== card.id)));
  }

  useEffect(() => {
    console.log(currentDeck);
  }, [])
  

  return (

    <>
      {currentDeck.map(card => (
        <Grid key={card.id} container spacing={3}>
          <Grid item xs={2}>
            <TextField className={"card" + card.id} variant="outlined"
              onBlur={() => maybeDisable(card)} aria-label="Front" fullWidth
              disabled={isEditing !== card.id} defaultValue={card.frontside} />
          </Grid>
          <Grid item xs={2}>
            <TextField className={"card" + card.id} variant="outlined"
              onBlur={() => maybeDisable(card)} aria-label="Front" fullWidth
              disabled={isEditing !== card.id} defaultValue={card.backside} />
          </Grid>
          <Grid item xs={5}>
            <TextField className={"card" + card.id} variant="outlined"
              onBlur={() => maybeDisable(card)} aria-label="Description" fullWidth
              disabled={isEditing !== card.id} defaultValue={card.description} />
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary"
              onClick={() => editCard(card)}>
              Edit
          </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="secondary"
              onClick={() => deleteCard(card)}>
              Delete
          </Button>
          </Grid>
        </Grid>
      ))}
    </>
  )
}
