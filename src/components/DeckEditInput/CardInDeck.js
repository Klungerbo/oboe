import { Box, Button, Grid, TextField } from '@material-ui/core'
import { Delete, Edit, Save } from '@material-ui/icons'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCard, promptDeleteCard } from '../../store/actions/DataActions'
import { API_FLASHCARDS, oboeFetch } from '../../utils/oboeFetch'
import { StyledEditButton } from './EditButtonStyled'
import { StyledEditDeleteContainer } from './EditDeleteContainerStyled'
import { StyledFlashcardInfo } from './FlashcardInfoStyled'

const MAX_FRONT_LENGTH = 100;
const MAX_BACK_LENGTH = 100;
const MAX_CARD_DESCRIPTION_LENGTH = 100;

const CardInDeck = ({ card }) => {

  const [cardFront, setCardFront] = useState(card.front);
  const [cardBack, setCardBack] = useState(card.back);
  const [cardDescription, setCardDescription] = useState(card.description);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const handleFrontChange = e => {
    setCardFront(e.target.value)
  }

  const handleBackChange = e => {
    setCardBack(e.target.value)
  }

  const handleDescriptionChange = e => {
    setCardDescription(e.target.value)
  }

  const handleSave = useCallback(async () => {
    oboeFetch(API_FLASHCARDS, "PUT", card)
    const cardToUpdate = {
      id: card.id,
      front: cardFront,
      back: cardBack,
      description: cardDescription
    }

    oboeFetch(API_FLASHCARDS, "PUT", cardToUpdate)
    dispatch(updateCard(card))
    setIsEditing(false)
  }, [setIsEditing, card, cardBack, cardDescription, cardFront, dispatch])

  const handleEdit = useCallback(async () => {
    setIsEditing(true)
  }, [setIsEditing])

  const handleDelete = useCallback(() => {
    dispatch(promptDeleteCard(card));
  }, [dispatch, card])

  return (
    <StyledFlashcardInfo display="flex" key={card.id}>
      <Box flexGrow={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField className={"card" + card.id}
              variant="outlined"
              aria-label="Front"
              fullWidth
              disabled={!isEditing}
              value={cardFront}
              inputProps={{
                maxLength: MAX_FRONT_LENGTH,
                "aria-label": "Front of the card"
              }}
              onChange={handleFrontChange}
              style={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField className={"card" + card.id}
              variant="outlined"
              aria-label="Front"
              fullWidth
              disabled={!isEditing}
              value={cardBack}
              inputProps={{
                maxLength: MAX_BACK_LENGTH,
                "aria-label": "Back of the card"
              }}
              onChange={handleBackChange}
              style={{ height: "100%" }} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField className={"card" + card.id}
              variant="outlined"
              aria-label="Description"
              fullWidth
              disabled={!isEditing}
              value={cardDescription}
              inputProps={{
                maxLength: MAX_CARD_DESCRIPTION_LENGTH,
                "aria-label": "Description of the card"
              }}
              onChange={handleDescriptionChange}
              style={{ height: "100%" }} />
          </Grid>
        </Grid>
      </Box>
      <Box p={1} />
      <Box display="flex">
        <StyledEditDeleteContainer container spacing={1}>
          <Grid item xs={6} sm={12} md={6}>
            <Box display={isEditing ? "block" : "none"}
              style={{ height: "100%" }}>
              <Button
                color="primary"
                startIcon={<Save />}
                variant="contained"
                fullWidth
                style={{ height: "100%" }}
                aria-label={`Edit ${card.front}`}
                onClick={handleSave}>
                Save
                    </Button>
            </Box>
            <Box display={!isEditing ? "block" : "none"}
              style={{ height: "100%" }}>
              <StyledEditButton style={{ height: "100%" }}
                startIcon={<Edit />} variant="contained" fullWidth
                aria-label={`Edit ${card.front}`}
                onClick={handleEdit}>
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
              onClick={handleDelete}>
              Delete
                  </Button>
          </Grid>
        </StyledEditDeleteContainer>
      </Box>
    </StyledFlashcardInfo>
  )
}

export default React.memo(CardInDeck);