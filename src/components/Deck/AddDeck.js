import { Box, Typography } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { addNewDeckColor } from '../../data/colors';
import { addDeck } from '../../store/actions/DataActions';
import { API_DECKS, oboeFetch } from '../../utils/oboeFetch';
import { srSpeak } from '../../utils/screenReaderSpeak';
import { StyledColoredCard, StyledFullHeightBox, StyledFullHeightCardActionArea } from './StyledDeck';

export default function AddDeck() {

  const dispatch = useDispatch();

  const handleAddDeck = async () => {
    const partialDeck = {
      name: "New deck",
      description: "Deck description",
      hexColor: addNewDeckColor
    };
    
    try {
      const response = await oboeFetch(API_DECKS, "POST", partialDeck);
      if (response.status !== 200) {
        return;
      }
      
      const { id } = await response.json()
      const newDeck = { ...partialDeck, id };
      
      dispatch(addDeck(newDeck));
      srSpeak("Deck created.")
    } catch (error) { console.log(error) }
  };

  return (
    <StyledFullHeightBox>
      <Box display="flex">
        <Box py={4.3} flexGrow="1" />
      </Box>
      <StyledColoredCard color={addNewDeckColor} raised style={{ height: "320px" }}>
        <StyledFullHeightCardActionArea
          aria-label={`Create deck`}
          onClick={handleAddDeck}>
          <StyledFullHeightBox display="flex" flexDirection="column" >
            <Box px={1.5} display="flex" flexGrow={1} justifyContent="center" alignItems="center">
              <Typography style={{ fontSize: "3.5rem", fontFamily: "Bebas Neue" }}>Create deck</Typography>
            </Box>{ }
          </StyledFullHeightBox>
        </StyledFullHeightCardActionArea>
      </StyledColoredCard>
    </StyledFullHeightBox>
  )
}

