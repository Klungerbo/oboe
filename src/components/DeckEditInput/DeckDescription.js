import { TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentDeck} from "../../store/actions/DataActions"

const MAX_DECK_DESCRIPTION_LENGTH = 150;

export function DeckDescription() {

  const currentDeck = useSelector(state => state.currentDeck)
  const dispatch = useDispatch();
  const [deckDescriptionText, setDeckDescriptionText] = useState("");

  return (
    <TextField variant="outlined"
                inputProps={{ maxLength: MAX_DECK_DESCRIPTION_LENGTH }}
                onChange={e => setDeckDescriptionText(e.target.value)}
                label={`Description (max ${MAX_DECK_DESCRIPTION_LENGTH} characters)`}
                multiline rows={4} defaultValue={deckDescriptionText}
                helperText={`${deckDescriptionText.length} / ${MAX_DECK_DESCRIPTION_LENGTH}`}
                onBlur={() => {
                  dispatch(setCurrentDeck({...currentDeck, description: deckDescriptionText}))
                  console.log(currentDeck)
                }} />
  )
}
