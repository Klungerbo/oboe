import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, fade } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import { StyledColoredCard, StyledFullHeightBox, StyledFullHeightCardActionArea } from './StyledDeck';
import { setDecks } from '../../store/actions/DataActions';

import { API_DECKS } from '../../data/config';
import {addNewDeckColor} from '../../data/colors';


/**
 * A deck card.
 * 
 * @param {object} deck - the deck object to display on this card.
 * @param {string} color - the color of this deck card. 
 * @returns jsx of a card representing a deck.
 */
export default function AddDeck() {
  const dispatch = useDispatch();
  const decks = useSelector(state => state.decks)
  const color = addNewDeckColor;
  const deck = {
    name: "add deck",
    id: 0,
  };

  const handleAddDeck = () => {
    const newDeck = {
      name: "Deck title",
      description: "Deck description",
      hexColor: "#333"
    };

    fetch(API_DECKS, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newDeck),
      credentials: "include"
    }).then(response => {
      if (response.status !== 200)
        return

      response.json().then(({ id }) => {
        const deckToAdd = { ...newDeck, id };
        if (decks.length > 0) {
          dispatch(setDecks([...decks, deckToAdd]));
        } else {
          dispatch(setDecks([deckToAdd]));
        }
      })
    }).catch(console.log);
  };

  return (
    <StyledFullHeightBox>
      <StyledColoredCard color={color} raised >
        <StyledFullHeightCardActionArea
          onClick={handleAddDeck}

          aria-label={`Review the deck titled: ${deck.name}, and the description: ${deck.description}`}
        >
          <Box pb={4} display="flex" justifyContent="center">
            <Typography style={{ fontWeight: "400", textTransform: "uppercase", fontSize: "1.8rem", color: "white", fontFamily: "Alatsi" }} align="center">Add new deck</Typography>
          </Box>
        </StyledFullHeightCardActionArea>
      </StyledColoredCard>
    </StyledFullHeightBox>
  );
}