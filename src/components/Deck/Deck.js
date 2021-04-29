import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Button, fade } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import { StyledColoredCard, StyledFullHeightBox, StyledFullHeightCardActionArea } from './StyledDeck';


/**
 * A deck card.
 * 
 * @param {object} deck - the deck object to display on this card.
 * @param {string} color - the color of this deck card. 
 * @returns jsx of a card representing a deck.
 */
export default function Deck({ deck, color }) {
  return (
    <StyledFullHeightBox>
      <Box display="flex">
        <Box pb={1} flexGrow="1">
          <Button
            fullWidth
            size="large"
            component={Link}
            to={`/edit/${deck.id}`}
            style={{ backgroundColor: `${color}`, height: 60 }}
            style={{backgroundColor: `${fade(color, 0.8)}`}}
            aria-label={`Edit the deck titled: ${deck.title}`}
          >
            Configure deck
            <Box pr={0.5} />
            <SettingsApplicationsIcon fontSize="default" />
          </Button>
        </Box>
      </Box>
      <StyledColoredCard color={color} raised style={{ height: "320px" }}>
        <StyledFullHeightCardActionArea
          component={Link}
          to={`/review/${deck.id}`}
          aria-label={`Review the deck titled: ${deck.title}, and the description: ${deck.description}`}
        >
          <StyledFullHeightBox display="flex" flexDirection="column" >
            <Box px={1.5} pt={2} pb={1} >
              <Typography style={{ fontSize: "1.5rem", fontFamily: "Bebas Neue" }}>{deck.title}</Typography>
            </Box>
            <Box px={1.5} flexGrow="1">
              <Typography variant="body2" color="textSecondary" component="p">{deck.description}</Typography>
            </Box>
            <Box pb={4} display="flex" justifyContent="center">
              <Button style={{backgroundColor: `${fade(color, 0.5)}`}} variant="contained">
                <Typography style={{ fontSize: "1.8rem", fontFamily: "Alatsi" }} align="center">Review deck</Typography>
              </Button>
            </Box>
          </StyledFullHeightBox>
        </StyledFullHeightCardActionArea>
      </StyledColoredCard>
    </StyledFullHeightBox>
  );
}