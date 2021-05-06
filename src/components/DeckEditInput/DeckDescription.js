import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setCurrentDeck } from "../../store/actions/DataActions"
import { API_DECKS } from '../../utils/oboeFetch';

const MAX_DECK_DESCRIPTION_LENGTH = 150;

function DeckDescription() {
  const {id} = useParams();

  const currentDeck = useSelector(state => state.currentDeck)
  const dispatch = useDispatch();
  const [deckDescriptionText, setDeckDescriptionText] = useState("");

  const handleDescriptionUpdate = () => {
    fetch(API_DECKS, {
      method: "PUT",
      credentials: "include",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        id: id,
        description: deckDescriptionText
      })
    }).then(() => {
      dispatch(setCurrentDeck({ ...currentDeck, description: deckDescriptionText }))
    })
  }

  useEffect(() => {
    if (currentDeck.description) {
      setDeckDescriptionText(currentDeck.description);
    }
  }, [currentDeck.description])

  return (
    <TextField variant="outlined"
      inputProps={{ maxLength: MAX_DECK_DESCRIPTION_LENGTH, "aria-label": `Deck description, ${MAX_DECK_DESCRIPTION_LENGTH-deckDescriptionText.length} characters remaining.` }}
      onChange={e => setDeckDescriptionText(e.target.value)}
      label={`Description (max ${MAX_DECK_DESCRIPTION_LENGTH} characters)`}
      multiline rows={4}
      helperText={`${deckDescriptionText.length} / ${MAX_DECK_DESCRIPTION_LENGTH}`}
      onBlur={() => handleDescriptionUpdate()}
      value={deckDescriptionText} />
  )
}

export default React.memo(DeckDescription);