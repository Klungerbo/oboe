import React, { useEffect, useRef } from 'react'
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

  const paletteElement = useRef();

  useEffect(() => {
    const paletteButtons = paletteElement.current.querySelectorAll("button");
    const colorNames = Object.keys(colorPalette);
    paletteButtons.forEach((el, index) => {
      el.setAttribute("aria-label", `${colorNames[index]} card color`);
    })
  }, [])

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
    
    <div ref={paletteElement}>
      <ColorPalette onSelect={e => handleUpdateColor(e)} palette={colorPalette} />
    </div>
    
  )
}
