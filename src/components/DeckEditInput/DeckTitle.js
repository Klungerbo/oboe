import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setCurrentDeck } from '../../store/actions/DataActions';
import { API_DECKS } from '../../utils/oboeFetch';

const MAX_DECK_TITLE_LENGTH = 50;

export default function DeckTitle() {
  const {id} = useParams();

  const currentDeck = useSelector(state => state.currentDeck)
  const dispatch = useDispatch();
  const [deckTitleText, setDeckTitleText] = useState("");

  const handleTitleUpdate = () => {
    fetch(API_DECKS, {
      method: "PUT",
      credentials: "include",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        id: id,
        name: deckTitleText
      })
    }).then(() => {
      dispatch(setCurrentDeck({ ...currentDeck, name: deckTitleText }))
    })
  }

  useEffect(() => {
    if (currentDeck.name) {
      setDeckTitleText(currentDeck.name);
    }
  }, [currentDeck.name])

  return (
    <TextField variant="outlined"
      autoFocus
      label={`Title (max ${MAX_DECK_TITLE_LENGTH} characters)`}
      inputProps={{ maxLength: MAX_DECK_TITLE_LENGTH, "aria-label": `Deck title, ${MAX_DECK_TITLE_LENGTH-deckTitleText.length} characters remaining.` }}
      onChange={e => setDeckTitleText(e.target.value)}
      helperText={`${deckTitleText.length} / ${MAX_DECK_TITLE_LENGTH}`}
      onBlur={() => handleTitleUpdate()}
      value={deckTitleText} />
  )
}
