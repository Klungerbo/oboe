import React from 'react'
import { addNewDeckColor } from '../../data/colors';

export default function AddDeck() {
  
  const decks = useSelector(state => state.decks);

  const handleAddDeck = () => {
    const newDeck = {
      name: "New deck",
      description: "Deck description",
      hexColor: addNewDeckColor
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

        srSpeak("Deck created.")
      })
    }).catch(console.log);
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
