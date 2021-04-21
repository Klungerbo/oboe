import {
  Button, Grid, Box,
  Typography
} from '@material-ui/core';
import React from 'react'
import {
  StyledReviewCard, StyledFrontFace, StyledBackFace
} from "./ReviewCardStyled";
import useKeyPress from "react-use-keypress";
import { useHistory } from 'react-router';
import flashcards from "../../data/flashcards";
import decks from "../../data/decks";
import colors from "../../data/colors";
import { useSpring } from "react-spring";

export default function ReviewCard({ deckid }) {

  const [cardQueue, setCardQueue] = React.useState(null);
  const [cardIndex, setCardIndex] = React.useState(0);
  const [cardColor, setCardColor] = React.useState("");
  const [isFlipped, setIsFlipped] = React.useState(false);
  const history = useHistory();
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(400px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 10, tension: 1000, friction: 80 }
  })

  /**
   * Active on frontside. Flips the card to the backside
   */
  useKeyPress(["ArrowLeft", "ArrowRight", " "], () => {
    // Deactivated on backside
    if (isFlipped) {
      return;
    }
    flipCard();
  })

  /**
   * Active on backside. User remembers the card.
   */
  useKeyPress(["ArrowUp"], () => {
    // Deactivated on the frontside
    if (!isFlipped) {
      return;
    }
    // TODO: add logic
    flipCard();
    handleCardProgression(true);
  })

  /**
   * Active on backside. User does not remember the card.
   */
  useKeyPress(["ArrowDown"], () => {
    // Deactivated on the frontside
    if (!isFlipped) {
      return;
    }
    // TODO: add logic
    flipCard();
    handleCardProgression(false);
  })

  useKeyPress(["Escape"], () => {
    history.push("/");
    setIsFlipped(false);
  })


  React.useEffect(() => {
    const deck = decks.find(item => item.id === parseInt(deckid));
    const cards = flashcards.filter(card => card.deck_id === parseInt(deck.id) && card.consecutive_correct < 5);
    
    let finalConsecutive = [];
    for (let i = 0; i < 5; i++) {
      let n = cards.filter(card => card.consecutive_correct === i);
      n.sort((card1, card2) => card1.last_reviewed_at - card2.last_reviewed_at);
      finalConsecutive = finalConsecutive.concat(n);
    }

    setCardQueue(finalConsecutive);
    setCardColor(colors[deck.colorId - 1].color);
  }, [])


  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function handleCardProgression(state) {
    if (cardIndex + 1 < cardQueue.length) {
      setCardIndex(cardIndex + 1);
      flipCard();
    } else {
      history.push("/");
    }
  }

  function CardFront() {
    return (

      <StyledFrontFace style={{
        opacity: opacity - 1,
        transform: transform.to((t) => {
          return `${t} rotateY(0)`
        })
      }} color={cardColor}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box flexGrow={1}>
          {cardQueue && cardQueue[cardIndex].frontside}
            </Box>
          <Typography>Flip</Typography>
        </Box>
      </StyledFrontFace>
    )
  }

  function CardBack() {
    return (
      <StyledBackFace style={{
        opacity,
        transform: transform.to((t) => {
          return `${t} rotateY(180deg)`
        })
      }} color={cardColor}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center">
              {cardQueue && cardQueue[cardIndex].backside}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">{cardQueue && cardQueue[cardIndex].description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Button variant="text" onClick={() => handleCardProgression(false)} color="secondary" fullWidth>Forgot</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={() => handleCardProgression(true)} color="primary" fullWidth>Remembered</Button>
          </Grid>
        </Grid>

      </StyledBackFace>
    )
  }

  return (
    <StyledReviewCard onClick={() => flipCard()}>
      <CardFront />
      <CardBack />
    </StyledReviewCard>
  )
}