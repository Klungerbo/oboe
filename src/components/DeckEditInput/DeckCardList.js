import {
  Box, Button, CardContent,
  Dialog, Grid, TextField
} from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCards } from '../../store/actions/DataActions';
import { StyledEditButton } from './EditButtonStyled';
import { StyledEditDeleteContainer } from './EditDeleteContainerStyled';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { StyledFlashcardInfo } from './FlashcardInfoStyled';
import { StyledDialogTitle } from '../SignUpDialog/SignupDialogStyled';
import { Save } from '@material-ui/icons';
import { API_FLASHCARDS } from '../../utils/oboeFetch';

const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;

export default function DeckCardList() {
  const [isEditing, setIsEditing] = useState(0);
  const currentCards = useSelector(state => state.currentCards);
  const currentCardFilter = useSelector(state => state.currentCardFilter);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});

  /**
   * If you are in the edit state, there are two outcomes when clicking somewhere
   * else. You either click in a TextField in the same row, which means you should
   * continue to edit. If you click somewhere else, you're considered to be
   * done editing, and the input fields get disabled.
   * There is a setTimeout because checking whether you clicked a text field
   * or not happens after disabling the fields. This prevents that.
   * 
   * @param {Flashcard} card 
   */
  const maybeDisable = card => {
    setTimeout(() => {
      if (document.activeElement.closest(`.card${card.id}`)) {
        setIsEditing(card.id)
      }
      else {
        setIsEditing(0)
        fetch(API_FLASHCARDS, {
          method: "PUT",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: card.id,
            front: front,
            back: back,
            description: description
          })
        }).then(() => {
          const cardToUpdate = currentCards.findIndex(currentCard => currentCard.id === card.id)
          let updatedCurrentCards = currentCards;

          card = { ...card, front, back, description }

          updatedCurrentCards[cardToUpdate] = card;
          dispatch(setCurrentCards(updatedCurrentCards));
        })
      }
    }, 0)
  }

  const editCard = card => {
    setFront(card.front);
    setBack(card.back);
    setDescription(card.description);
    setIsEditing(card.id);
  }

  const handleDelete = card => {
    setCardToDelete(card);
    setDeleteConfirmationOpen(true);
  }

  const deleteCard = card => {
    fetch(API_FLASHCARDS, {
      method: "DELETE",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: card.id })
    }).then(() => {
      dispatch(setCurrentCards(currentCards.filter(currentCard => currentCard.id !== card.id)));
    })
  }

  return (
    <>
      <Box display="flex" gridRowGap={20} flexDirection="column">
        {currentCardFilter.sort((a, b) => b.id - a.id ) && currentCardFilter.map(card => (
          <StyledFlashcardInfo display="flex" key={card.id}>
            <Box flexGrow={1}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={3}>
                  <TextField className={"card" + card.id}
                    variant="outlined"
                    onBlur={() => maybeDisable(card)}
                    aria-label="Front"
                    fullWidth
                    disabled={isEditing !== card.id}
                    defaultValue={card.front}
                    inputProps={{
                      maxLength: MAX_FRONT_LENGTH,
                      "aria-label": "Front of the card"
                    }}
                    onChange={e => setFront(e.target.value)}
                    style={{ height: "100%" }} />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <TextField className={"card" + card.id}
                    variant="outlined"
                    onBlur={() => maybeDisable(card)}
                    aria-label="Front"
                    fullWidth
                    disabled={isEditing !== card.id}
                    defaultValue={card.back}
                    inputProps={{
                      maxLength: MAX_BACK_LENGTH,
                      "aria-label": "Back of the card"
                    }}
                    onChange={e => setBack(e.target.value)}
                    style={{ height: "100%" }} />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField className={"card" + card.id}
                    variant="outlined"
                    onBlur={() => maybeDisable(card)}
                    aria-label="Description"
                    fullWidth
                    disabled={isEditing !== card.id}
                    defaultValue={card.description}
                    inputProps={{
                      maxLength: MAX_CARD_DESCRIPTION_LENGTH,
                      "aria-label": "Description of the card"
                    }}
                    onChange={e => setDescription(e.target.value)}
                    style={{ height: "100%" }} />
                </Grid>
              </Grid>
            </Box>
            <Box p={1} />
            <Box display="flex">
              <StyledEditDeleteContainer container spacing={1}>
                <Grid item xs={6} sm={12} md={6}>
                  <Box display={isEditing === card.id ? "block" : "none"}
                    style={{ height: "100%" }}>
                    <Button
                      color="primary"
                      startIcon={<Save />}
                      variant="contained"
                      fullWidth
                      style={{ height: "100%" }}
                      aria-label={`Edit ${card.front}`}
                      onClick={() => editCard({ id: 0 })}>
                      Save
                    </Button>
                  </Box>
                  <Box display={isEditing !== card.id ? "block" : "none"}
                    style={{ height: "100%" }}>
                    <StyledEditButton style={{ height: "100%" }}
                      startIcon={<EditIcon />} variant="contained" fullWidth
                      aria-label={`Edit ${card.front}`}
                      onClick={() => editCard(card)}>
                      Edit
                      </StyledEditButton>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={12} md={6}>
                  <Button startIcon={<DeleteIcon />}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    style={{ height: "100%" }}
                    aria-label={`Delete ${card.front}`}
                    onClick={() => handleDelete(card)}>
                    Delete
                  </Button>
                </Grid>
              </StyledEditDeleteContainer>
            </Box>
          </StyledFlashcardInfo>
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
}
