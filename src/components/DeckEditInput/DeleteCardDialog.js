import {
  Button, CardContent, Dialog,
  Grid
} from '@material-ui/core';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCard, promptDeleteCard } from '../../store/actions/DataActions';
import { API_FLASHCARDS, oboeFetch } from '../../utils/oboeFetch';
import { StyledDialogTitle } from '../SignUpDialog/SignupDialogStyled';

export default function DeleteCardDialog() {
  

  const dispatch = useDispatch();
  const cardToDelete = useSelector(state => state.cardToDelete);

  const cancel = () => {
    dispatch(promptDeleteCard({}))
  }

  const deleteCardAction = useCallback(() => {

    const { id } = cardToDelete;
    oboeFetch(API_FLASHCARDS, "DELETE", {id});
    dispatch(deleteCard(cardToDelete));
    dispatch(promptDeleteCard({}))
  }, [cardToDelete, dispatch])

  return (
    <Dialog open={Object.keys(cardToDelete).length !== 0} >
      <CardContent>
        <Grid
          container
          spacing={2}
          justify="flex-start"
          align="center">
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
              onClick={cancel}
              type="submit">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained"
              onClick={deleteCardAction}
              color="secondary"
              fullWidth>
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Dialog>
  )
}