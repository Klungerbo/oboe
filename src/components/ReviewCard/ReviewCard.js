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

export default function ReviewCard({ deckid, cardColor, setCardColor, reviewStats, setReviewStats }) {

  const [cardQueue, setCardQueue] = React.useState(null);
  const [cardIndex, setCardIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const history = useHistory();
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(700px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 3, tension: 1000, friction: 80 }
  })

  console.log(transform, opacity)

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
    setReviewStats({ ...reviewStats, ...{ cardsLeft: finalConsecutive.length } })
    setCardColor(colors[deck.colorId - 1].color);
  }, [])


  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function handleCardProgression(didRemember) {
    if (didRemember) {
      setReviewStats({
        ...reviewStats,
        ...{
          correct: reviewStats.correct + 1,
          cardsLeft: reviewStats.cardsLeft - 1
        }
      })
    } else {
      setReviewStats({
        ...reviewStats,
        ...{
          incorrect: reviewStats.incorrect + 1,
          cardsLeft: reviewStats.cardsLeft - 1
        }
      })
    }

    if (cardIndex + 1 < cardQueue.length) {
      setCardIndex(cardIndex + 1);
      flipCard();
    } else {
      history.push("/");
    }
  }

  function handlenan(opacity) {
    const result = opacity - 1
    if (result === NaN) {
      console.log("not a number");
      return 0;
    }
    else {
      return result;
    }
  }

  function CardFront() {
    return (
      <StyledFrontFace  style={{
        opacity: handlenan(opacity),
        transform
      }} color={cardColor}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h2">
              {cardQueue && cardQueue[cardIndex].frontside}
            </Typography>
          </Box>
          <Box py={3} align="center" style={{ backgroundColor: "rgba(0,0,0,0.3)", borderBottomLeftRadius: "5px", borderBottomRightRadius: "2%" }}>
            <Typography>Flip</Typography>
          </Box>
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
        <Box display="flex" flexDirection="column" justifyContent="center" p={1} height="100%">
          <Box display="flex" flexDirection="column" flexGrow={1} justifyContent="center">
            <Typography variant="h3" align="center">
              {cardQueue && cardQueue[cardIndex].backside}
            </Typography>
            <Typography align="center">{cardQueue && cardQueue[cardIndex].description}</Typography>
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button variant="contained" onClick={() => handleCardProgression(false)} color="secondary" fullWidth>Forgot</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" onClick={() => handleCardProgression(true)} color="primary" fullWidth>Remembered</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </StyledBackFace>
    )
  }

  return (
    <StyledReviewCard onClick={() => { if (!isFlipped) flipCard() }}>
      <CardFront />
      <CardBack />
    </StyledReviewCard>
  )
}