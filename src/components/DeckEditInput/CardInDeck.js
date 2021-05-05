import { Box, Button, Grid, TextField } from '@material-ui/core'
import { Delete, Edit, Save } from '@material-ui/icons'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_FLASHCARDS } from '../../data/config'
import { setCurrentCardWithAction, setCurrentCards } from '../../store/actions/DataActions'
import { StyledEditButton } from './EditButtonStyled'
import { StyledEditDeleteContainer } from './EditDeleteContainerStyled'
import { StyledFlashcardInfo } from './FlashcardInfoStyled'

const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;

const CardInDeck = ({
  card,
  handleDelete,
}) => {

  const currentCardWithAction = useSelector(state => state.currentCardWithAction);
  const currentCards = useSelector(state => state.currentCards);
  const dispatch = useDispatch();

  const setFront = e => {
    dispatch(setCurrentCardWithAction({
      ...currentCardWithAction,
      front: e.target.value
    }))
  }
  const setBack = e => {
    dispatch(setCurrentCardWithAction({
      ...currentCardWithAction,
      back: e.target.value
    }))
  }
  const setDescription = e => {
    dispatch(setCurrentCardWithAction({
      ...currentCardWithAction,
      description: e.target.value
    }))
  }

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
  const maybeDisable = useCallback(card => {
    setTimeout(() => {
      if (document.activeElement.closest(`.card${card.id}`)) {
        dispatch(setCurrentCardWithAction({ card, action: "edit" }))
        return;
      }

      const {id, front, back, description, action} = currentCardWithAction;

      fetch(API_FLASHCARDS, {
        method: "PUT",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, front, back, description })
      }).then(() => {
        const cardToUpdate = currentCards.findIndex(currentCard => {
          return currentCard.id === currentCardWithAction.id
        });
        let updatedCurrentCards = currentCards;

        card = {id, front, back, description}

        updatedCurrentCards[cardToUpdate] = card;
        dispatch(setCurrentCards(updatedCurrentCards));
        dispatch(setCurrentCardWithAction({
          id: 0,
          front: "",
          back: "",
          description: "",
          action: ""
        }))
      })
    }, 0)
  }, [])

  const editCard = useCallback(card => {
    dispatch(setCurrentCardWithAction({card, action: "edit"}))
  }, [])

  useEffect(() => {
    console.log("action updated")
  }, [currentCardWithAction.action])

  return (
    <StyledFlashcardInfo display="flex" key={card.id}>
      <Box flexGrow={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField className={"card" + card.id}
              variant="outlined"
              onBlur={() => maybeDisable(card)}
              aria-label="Front"
              fullWidth
              disabled={currentCardWithAction.id !== card.id}
              defaultValue={card.front}
              inputProps={{
                maxLength: MAX_FRONT_LENGTH,
                "aria-label": "Front of the card"
              }}
              onChange={setFront}
              style={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField className={"card" + card.id}
              variant="outlined"
              onBlur={() => maybeDisable(card)}
              aria-label="Front"
              fullWidth
              disabled={currentCardWithAction.id !== card.id}
              defaultValue={card.back}
              inputProps={{
                maxLength: MAX_BACK_LENGTH,
                "aria-label": "Back of the card"
              }}
              onChange={setBack}
              style={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField className={"card" + card.id}
              variant="outlined"
              onBlur={() => maybeDisable(card)}
              aria-label="Description"
              fullWidth
              disabled={currentCardWithAction.id !== card.id}
              defaultValue={card.description}
              inputProps={{
                maxLength: MAX_CARD_DESCRIPTION_LENGTH,
                "aria-label": "Description of the card"
              }}
              onChange={setDescription}
              style={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Box>
      <Box p={1} />
      <Box display="flex">
        <StyledEditDeleteContainer container spacing={1}>
          <Grid item xs={6} sm={12} md={6}>
            <Box display={currentCardWithAction.id === card.id ? "block" : "none"}
              style={{ height: "100%" }}>
              <Button
                color="primary"
                startIcon={<Save />}
                variant="contained"
                fullWidth
                style={{ height: "100%" }}
                aria-label={`Edit ${card.front}`}
                onClick={() => editCard({ id: 0, front: "", back: "", description: "", action: "" })}>
                Save
                    </Button>
            </Box>
            <Box display={currentCardWithAction.id !== card.id ? "block" : "none"}
              style={{ height: "100%" }}>
              <StyledEditButton style={{ height: "100%" }}
                startIcon={<Edit />} variant="contained" fullWidth
                aria-label={`Edit ${card.front}`}
                onClick={() => editCard(card)}>
                Edit
                      </StyledEditButton>
            </Box>
          </Grid>
          <Grid item xs={6} sm={12} md={6}>
            <Button startIcon={<Delete />}
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
  )
}

export default React.memo(CardInDeck);