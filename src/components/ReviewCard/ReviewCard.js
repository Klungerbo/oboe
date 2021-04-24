import {
  Button, Grid, Box,
  Typography
} from '@material-ui/core';
import { useState, useEffect, useRef } from 'react'
import {
  StyledReviewCard, StyledFrontFace, StyledBackFace
} from "./ReviewCardStyled";
import useKeyPress from "react-use-keypress";
import { useHistory } from 'react-router';
import flashcards from "../../data/flashcards";
import decks from "../../data/decks";
import colors from "../../data/colors";
import { useSpring } from "@react-spring/web";

export default function ReviewCard({ deckid, cardColor, setCardColor, reviewStats, setReviewStats }) {

  const [cardQueue, setCardQueue] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();
  const answerElement = useRef();
  const questionElement = useRef();
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(700px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 3, tension: 1000, friction: 80 }
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


  useEffect(() => {
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

  useEffect(() => {
    if (!isFlipped) {
      // I have to use setTimeout because if I don't, the else code never runs. Really weird
      setTimeout(() => questionElement.current.focus(), 0);
    } else {
      setTimeout(() => answerElement.current.focus(), 0);
    }
  }, [isFlipped])


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

  function CardFront() {
    return (
      <StyledFrontFace style={{
        opacity: opacity.to(o => 1 - o),
        transform
      }} color={cardColor}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
            <Typography ref={questionElement} tabIndex={0} variant="h2">
              {cardQueue && cardQueue[cardIndex].frontside}
            </Typography>
          </Box>
          <Box py={3} align="center"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px"
            }}>
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
        <Box display="flex" flexDirection="column" justifyContent="center"
          p={1} height="100%">
          <Box display="flex" flexDirection="column" flexGrow={1} justifyContent="center">
            <Typography tabIndex={0} ref={answerElement} variant="h3" align="center">
              {cardQueue && cardQueue[cardIndex].backside}
            </Typography>
            <Typography tabIndex={0} align="center">
              {cardQueue && cardQueue[cardIndex].description}
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={1} direction="row-reverse">
              <Grid item xs={6}>
                <Button tabIndex={isFlipped ? 0 : -1} variant="contained"
                  onClick={() => handleCardProgression(true)} color="primary" fullWidth>
                  Remembered
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button tabIndex={isFlipped ? 0 : -1} variant="contained"
                  onClick={() => handleCardProgression(false)} color="secondary" fullWidth>
                  Forgot
                </Button>
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