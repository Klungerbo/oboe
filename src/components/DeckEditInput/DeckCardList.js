import {
  Box, Button, CardContent,
  Dialog, Grid
} from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCards, setCurrentCardWithAction } from '../../store/actions/DataActions';
import { StyledDialogTitle } from '../SignUpDialog/SignupDialogStyled';
import CardInDeck from './CardInDeck';


export default React.memo(() => {
  const currentCards = useSelector(state => state.currentCards);
  const currentCardWithAction = useSelector(state => state.currentCardWithAction);
  const currentCardFilter = useSelector(state => state.currentCardFilter);
  const dispatch = useDispatch();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});

  const handleDelete = useCallback(card => {
    setCardToDelete(card);
    setDeleteConfirmationOpen(true);
  }, [])

  const deleteCard = useCallback(card => {
    fetch(API_FLASHCARDS, {
      method: "DELETE",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: card.id })
    }).then(() => {
      dispatch(setCurrentCards(currentCards.filter(currentCard => currentCard.id !== card.id)));
    })
  }, [dispatch, currentCards])

  return (
    <>
      <Box display="flex" gridRowGap={20} flexDirection="column">
        {currentCardFilter.sort((a, b) => b.id - a.id ) && currentCardFilter.map(card => (
          <CardInDeck key={card.id} card={card} />      
        ))}
      </Box>
      <Dialog open={deleteConfirmationOpen} >
        <CardContent>
          <Grid
            container
            spacing={2}
            justify="flex-start"
            align="center"
          >
            <Grid item xs={12}>
              <StyledDialogTitle variant="h2">Are you sure?</StyledDialogTitle>
              <StyledDialogTitle variant="body1">
                {`Are you sure you want to delete the card "${cardToDelete.front}"?`}
              </StyledDialogTitle>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setDeleteConfirmationOpen(false)}
                type="submit"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained"
                onClick={() => {
                  deleteCard(cardToDelete);
                  setDeleteConfirmationOpen(false)
                }}
                color="secondary"
                fullWidth>
                Delete
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Dialog>
    </>
  )
})