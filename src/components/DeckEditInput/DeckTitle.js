import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../store/actions/DataActions';

const MAX_DECK_TITLE_LENGTH = 50;

export default function DeckTitle() {

  const currentDeck = useSelector(state => state.currentDeck)
  const dispatch = useDispatch();
  const [deckTitleText, setDeckTitleText] = useState("");

  return (
    <TextField variant="outlined"
      label={`Title (max ${MAX_DECK_TITLE_LENGTH} characters)`}
      inputProps={{ maxLength: MAX_DECK_TITLE_LENGTH }}
      onChange={e => setDeckTitleText(e.target.value)} defaultValue={deckTitleText}
      helperText={`${deckTitleText.length} / ${MAX_DECK_TITLE_LENGTH}`}
      onBlur={() => dispatch(setCurrentDeck({ ...currentDeck, title: deckTitleText }))} />
  )
}
