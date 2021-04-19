import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import { StyledFullHeightBox, StyledFullHeightCardActionArea } from './StyledDeck';


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
        <Box flexGrow="1" />
        <Box pb={0.5}>
          <Button
            size="small"
            component={Link}
            to={`/edit-deck/${deck.id}`}
            style={{ backgroundColor: `${color}` }}
            aria-label={`Edit the deck titled: ${deck.title}`}
          >
            Configure deck
            <Box pr={0.5} />
            <SettingsApplicationsIcon fontSize="default" />
          </Button>
        </Box>
      </Box>
      <Card raised style={{ backgroundColor: `${color}`, height: "240px" }}>
        <StyledFullHeightCardActionArea
          component={Link}
          to={`/review-deck/${deck.id}`}
          aria-label={`Review the deck titled: ${deck.title}, and the description: ${deck.description}`}
        >
          <StyledFullHeightBox display="flex" flexDirection="column" >
            <Box px={1.5} pt={2} pb={1} >
              <Typography variant="h5">{deck.title}</Typography>
            </Box>
            <Box px={1.5} flexGrow="1">
              <Typography variant="body2" color="textSecondary" component="p">{deck.description}</Typography>
            </Box>
            <Box pb={1.5}>
              <Typography variant="h4" align="center">Review deck</Typography>
            </Box>
          </StyledFullHeightBox>
        </StyledFullHeightCardActionArea>
      </Card>
    </StyledFullHeightBox>
  );
}