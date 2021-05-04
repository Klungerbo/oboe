import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCardFilter } from '../../store/actions/DataActions';
import { srSpeak } from '../../utils/screenReaderSpeak';

export default function DeckCardFilter() {
  const currentCards = useSelector(state => state.currentCards);
  const [cardFilter, setCardFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredCards = currentCards.filter(card => {
      return (card.front.includes(cardFilter)
       || card.back.includes(cardFilter)
       || card.description.includes(cardFilter))
    });

    srSpeak(`${filteredCards.length} matching ${cardFilter}`)

    dispatch(setCurrentCardFilter(filteredCards))
  }, [cardFilter, currentCards, dispatch]);

  return (
    <TextField variant="outlined"
      onChange={e => setCardFilter(e.target.value)}
      value={cardFilter}
      label="Filter"
      inputProps={{
        "aria-label": "Filter cards by front, back or description"
      }} />
  )
}
