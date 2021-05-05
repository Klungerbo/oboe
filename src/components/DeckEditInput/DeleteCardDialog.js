import { Button, CardContent, Dialog, Grid } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCardWithAction } from '../../store/actions/DataActions';
import { API_FLASHCARDS, oboeFetch } from '../../utils/oboeFetch';
import { StyledDialogTitle } from '../SignUpDialog/SignupDialogStyled';

export default function DeleteCardDialog() {
  

  const dispatch = useDispatch();
  const currentCardWithAction = useSelector(state => state.currentCardWithAction);

  if (currentCardWithAction.action === "delete") {
    console.log("Deleting")
  }

  const cancel = () => {
    dispatch(setCurrentCardWithAction({
      id: 0,
      front: "",
      back: "",
      description: "",
      action: ""
    }))
  }

  const deleteCard = () => {
    const { id } = currentCardWithAction;
    oboeFetch(API_FLASHCARDS, "DELETE", id);
  }

  return (
    <Dialog open={currentCardWithAction.action === "delete"} >
      <CardContent>
        <Grid
          container
          spacing={2}
          justify="flex-start"
          align="center">
          <Grid item xs={12}>
            <StyledDialogTitle variant="h2">Are you sure?</StyledDialogTitle>
            <StyledDialogTitle variant="body1">
              {`Are you sure you want to delete the card "${currentCardWithAction.front}"?`}
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
              onClick={deleteCard}
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