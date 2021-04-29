import React, { useEffect, useState } from 'react'
// import { ColorPalette } from "material-ui-color";
import { colorPalette } from '../../data/colors'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../store/actions/DataActions';
import { Typography } from '@material-ui/core';

export default function DeckColorPalette() {
  
  const [deckColor, setDeckColor] = useState("");
  const currentDeck = useSelector(state => state.currentDeck);
  const dispatch = useDispatch();

  useEffect(() => {
    const colorCode = colorPalette[deckColor];
    dispatch(setCurrentDeck({ ...currentDeck, cardColor: colorCode }))
    console.log(currentDeck)
  }, [deckColor])

  return (
    <Typography>nice</Typography>
    )
  }

{/* <ColorPalette onSelect={e => setDeckColor(e)} palette={colorPalette} /> */}