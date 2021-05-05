import {
  Box, Button, CardContent,
  Dialog, Grid
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCards, setCurrentCardWithAction } from '../../store/actions/DataActions';
import { API_FLASHCARDS } from '../../utils/oboeFetch';
import { StyledDialogTitle } from '../SignUpDialog/SignupDialogStyled';
import CardInDeck from './CardInDeck';
import DeleteCardDialog from './DeleteCardDialog';


export default React.memo(() => {
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
})