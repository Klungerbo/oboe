import { Box } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import CardInDeck from './CardInDeck';
import DeleteCardDialog from './DeleteCardDialog';


function DeckCardList() {
  const currentCardFilter = useSelector(state => state.currentCardFilter);

  return (
    <>
      <Box display="flex" gridRowGap={20} flexDirection="column">
        {currentCardFilter.sort((a, b) => b.id - a.id ) && currentCardFilter.map(card => (
          <CardInDeck key={card.id} card={card} />      
        ))}
      </Box>
      <DeleteCardDialog />
    </>
  )
}

export default React.memo(DeckCardList);