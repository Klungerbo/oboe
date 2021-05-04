import {
  Box, Divider, InputAdornment,
  TextField
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCardFilter } from '../../store/actions/DataActions';
import { srSpeak } from '../../utils/screenReaderSpeak';
import SearchIcon from '@material-ui/icons/Search';

export default function DeckCardFilter() {
  const currentCards = useSelector(state => state.currentCards);
  const [cardFilter, setCardFilter] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredCards = currentCards.filter(card => {
      return (card.front.toLowerCase().includes(cardFilter.toLowerCase())
        || card.back.toLowerCase().includes(cardFilter.toLowerCase())
        || card.description.toLowerCase().includes(cardFilter.toLowerCase()))
    });

    srSpeak(`${filteredCards.length} matching ${cardFilter}`)

    dispatch(setCurrentCardFilter(filteredCards))
  }, [cardFilter, currentCards, dispatch]);

  return (
    <>
      <TextField variant="outlined"
        onChange={e => setCardFilter(e.target.value)}
        value={cardFilter}
        label={`Search in flashcards`}
        style={{ flexShrink: "1" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        inputProps={{
          "aria-label": "Filter cards by front, back or description"
        }} />
      <Box my={1.5} />
      <Divider />
    </>
  )
}
