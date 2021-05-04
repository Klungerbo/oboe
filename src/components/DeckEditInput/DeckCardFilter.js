import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCardFilter } from '../../store/actions/DataActions';

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

    console.log(filteredCards);
    console.log(currentCards);

    dispatch(setCurrentCardFilter(filteredCards))
  }, [cardFilter, currentCards]);

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
