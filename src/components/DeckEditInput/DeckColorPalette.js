import React from 'react'
import { ColorPalette } from "material-ui-color";
import { colorPalette } from '../../data/colors'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck } from '../../store/actions/DataActions';
import { API_DECKS } from '../../data/config';
import { useParams } from 'react-router';

export default function DeckColorPalette() {
  const currentDeck = useSelector(state => state.currentDeck);
  const dispatch = useDispatch();
  const {id} = useParams();

  const handleUpdateColor = e => {
    const paletteColor = colorPalette[e];
    fetch(API_DECKS, {
      method: "PUT",
      credentials: "include",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        id: id,
        hexColor: paletteColor
      })
    }).then(() => {
      dispatch(setCurrentDeck({ ...currentDeck, hexColor: paletteColor }))
    })
  }

  return (
    <>
      <ColorPalette onSelect={e => handleUpdateColor(e)} palette={colorPalette} />
    </>
  )
}
