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
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck, setReviewStats } from '../../store/actions/DataActions';

export default function ReviewCard({ deckid }) {

  const [cardQueue, setCardQueue] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();
  const answerElement = useRef();
  const questionElement = useRef();
  const dispatch = useDispatch();
  const currentDeck = useSelector(state => state.currentDeck);
  const reviewStats = useSelector(state => state.reviewStats);
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
    deck.cardColor = colors[deck.colorId - 1].color;
    dispatch(setCurrentDeck(deck));
    // if (deck == null) {
    //   return;
    // }
    const cards = flashcards.filter(card => card.deck_id === parseInt(deck.id) && card.consecutive_correct < 5);

    let finalConsecutive = [];
    for (let i = 0; i < 5; i++) {
      let n = cards.filter(card => card.consecutive_correct === i);
      n.sort((card1, card2) => card1.last_reviewed_at - card2.last_reviewed_at);
      finalConsecutive = finalConsecutive.concat(n);
    }

    setCardQueue(finalConsecutive);
  }, [deckid]);

  useEffect(() => {
    if (!isFlipped) {
      // I have to use setTimeout because if I don't, the else code never runs. Really weird
      setTimeout(() => questionElement.current.focus(), 0);
    } else {
      setTimeout(() => answerElement.current.focus(), 0);
    }
    
    dispatch(
      setReviewStats(
        oldReviewStats => {
          console.log("jwojifjewi")
          const newReviewStats = {
            ...oldReviewStats,
            cardsLeft: "" + cardQueue.length.toString()
          };
          console.log(oldReviewStats, newReviewStats);
          return newReviewStats;
        })
        )
  }, [dispatch, isFlipped])


  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function handleCardProgression(didRemember) {
    if (didRemember) {
      dispatch(setReviewStats({
        ...reviewStats,
        correct: reviewStats.correct + 1,
        cardsLeft: reviewStats.cardsLeft - 1
      }))
    } else {
      dispatch(setReviewStats({
        ...reviewStats,
        incorrect: reviewStats.incorrect + 1,
        cardsLeft: reviewStats.cardsLeft - 1
      }))
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
      }} color={currentDeck.cardColor}>
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
      }} color={currentDeck.cardColor}>
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