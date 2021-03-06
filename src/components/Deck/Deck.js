import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, fade } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import {
  StyledColoredCard,
  StyledFullHeightBox,
  StyledFullHeightCardActionArea
} from './StyledDeck';


/**
 * A deck card.
 * 
 * @param {object} deck - the deck object to display on this card.
 * @param {string} color - the color of this deck card. 
 * @returns jsx of a card representing a deck.
 */
function Deck({ deck, color }) {

  return (
    <StyledFullHeightBox>
      <Box display="flex">
        <Box pb={1} flexGrow="1">
          <Card raised style={{ backgroundColor: color }}>
            <CardActionArea color={color}
              component={Link}
              to={`/edit/${deck.id}`}
              style={{ backgroundColor: `${fade(color, 0.5)}`, height: 60 }}
              aria-label={`Edit the deck titled: ${deck.name}`}
            >
              <Box display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%">
                <Typography>Configure deck</Typography>
                <Box pr={0.5} />
                <SettingsApplicationsIcon fontSize="default" />
              </Box>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
      <StyledColoredCard color={color} raised style={{ height: "320px" }}>
        <StyledFullHeightCardActionArea
          component={Link}
          to={`/review/${deck.id}`}
          aria-label={`Review the deck titled: ${deck.name}, and the description: ${deck.description}`}
        >
          <StyledFullHeightBox display="flex" flexDirection="column" >
            <Box px={1.5} pt={2} pb={1} >
              <Typography style={{
                fontSize: "1.5rem",
                fontFamily: "Bebas Neue"
              }}>
                {deck.name}
              </Typography>
            </Box>
            <Box px={1.5} flexGrow="1">
              <Typography variant="body2" color="textSecondary" component="p">{deck.description}</Typography>
            </Box>
            <Box pb={4} display="flex" justifyContent="center">
              <Button style={{ backgroundColor: `${fade(color, 0.5)}` }} variant="contained">
                <Typography
                  style={{
                    fontSize: "1.8rem",
                    color: "white",
                    fontFamily: "Alatsi"
                  }}
                  align="center">
                  Review deck
                  </Typography>
              </Button>
            </Box>
          </StyledFullHeightBox>
        </StyledFullHeightCardActionArea>
      </StyledColoredCard>
    </StyledFullHeightBox>
  );
}

export default React.memo(Deck)