import {
  Button, Grid, Box,
  Typography
} from '@material-ui/core';
import {
  useState, useEffect, useRef,
  useCallback
} from 'react'
import { StyledReviewCard, StyledCardFace, StyledFlipOverlay } from "./ReviewCardStyled";
import useKeyPress from "react-use-keypress";
import { useHistory } from 'react-router';
import { useSpring } from "@react-spring/web";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDeck, setReviewStats, setDecks } from '../../store/actions/DataActions';
import { API_DECKS, API_FLASHCARDS, oboeFetch } from '../../utils/oboeFetch';
import { Link } from 'react-router-dom';

export default function ReviewCard({ deckId }) {
  const history = useHistory();

  const [cardQueue, setCardQueue] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

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
   * Active on front. Flips the card to the back
   */
  useKeyPress(["ArrowLeft", "ArrowRight", " "], () => {
    // Deactivated on back
    if (isFlipped) {
      return;
    }
    flipCard();
  })

  /**
   * Active on back. User remembers the card.
   */
  useKeyPress(["ArrowUp"], () => {
    // Deactivated on the front
    if (!isFlipped) {
      return;
    }
    flipCard();
    handleCardProgression(true);
  })

  /**
   * Active on back. User does not remember the card.
   */
  useKeyPress(["ArrowDown"], () => {
    // Deactivated on the front
    if (!isFlipped) {
      return;
    }
    flipCard();
    handleCardProgression(false);
  })

  useKeyPress(["Escape"], () => {
    history.push("/");
    setIsFlipped(false);
  })

  const fetchDecks = useCallback(async () => {
    try {
      const response = await oboeFetch(API_DECKS);
      const receivedDecks = await response.json();
      dispatch(setDecks(receivedDecks));

      const currentDeck = receivedDecks.find(e => e.id === parseInt(deckId));
      if (currentDeck) {
        dispatch(setCurrentDeck(currentDeck));
      }
    } catch (error) { console.log(error) }
  }, [deckId, dispatch]);

  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  useEffect(() => {
    fetch(`${API_FLASHCARDS}/${deckId}`, {
      method: "GET",
      credentials: "include"
    }).then(response => {
      response.json().then(flashcards => {
        const cards = flashcards.filter(card => card.consecutiveCorrect < 5);
        const reviewDelayTimes = [0, 0.166, 48, 168, 720];

        let finalConsecutive = [];
        let currentTime = Date.now();
        for (let i = 0; i < 5; i++) {
          let n = cards.filter(card => {
            let lastReviewedAt = new Date(card.lastReviewedAt).getTime();
            const elapsedMilliseconds = currentTime - lastReviewedAt;
            const elapsedHours = elapsedMilliseconds / 1000 / 60 / 60;

            return card.consecutiveCorrect === i && elapsedHours >= reviewDelayTimes[i];
          });
          n.sort((card1, card2) => card1.lastReviewedAt - card2.lastReviewedAt);
          finalConsecutive = finalConsecutive.concat(n);
        }

        setCardQueue(finalConsecutive);
        dispatch(setReviewStats({
          incorrect: 0,
          correct: 0,
          cardsLeft: finalConsecutive.length
        }));
      }).catch(console.log)
    }).catch(console.log);
  }, [dispatch, currentDeck, deckId])

  useEffect(() => {
    if (!isFlipped) {
      // I have to use setTimeout because if I don't, the else code never runs. Really weird
      setTimeout(() => questionElement.current && questionElement.current.focus(), 0);
    } else {
      setTimeout(() => answerElement.current && answerElement.current.focus(), 0);
    }
  }, [isFlipped])

  function flipCard() {
    setIsFlipped(!isFlipped);
  }

  function handleCardProgression(didRemember) {
    if (!cardQueue)
      return;

    let consecutiveCorrect = cardQueue[cardIndex].consecutiveCorrect;

    if (didRemember) {
      dispatch(setReviewStats({
        ...reviewStats,
        correct: reviewStats.correct + 1,
        cardsLeft: reviewStats.cardsLeft - 1
      }));

      ++consecutiveCorrect;
    } else {
      dispatch(setReviewStats({
        ...reviewStats,
        incorrect: reviewStats.incorrect + 1,
        cardsLeft: reviewStats.cardsLeft - 1
      }));

      consecutiveCorrect = 0;
    }

    const body = {
      ...cardQueue[cardIndex],
      consecutiveCorrect,
      lastReviewedAt: Date.now()
    };

    try {
      oboeFetch(API_FLASHCARDS, "PUT", body);
    } catch (error) { console.log(error) }

    if (cardIndex + 1 < cardQueue.length) {
      setCardIndex(cardIndex + 1);
      flipCard();
    } else {
      history.push("/");
    }
  }

  function CardFront() {
    return (
      <StyledCardFace style={{
        opacity: opacity.to(o => 1 - o),
        transform
      }} color={currentDeck.hexColor}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
            <Typography align="center" ref={questionElement} tabIndex={isFlipped ? -1 : 0}
              style={{
                fontFamily: "Bebas Neue",
                fontSize: "1.8rem"
              }}
              aria-label={cardQueue && cardQueue.length > 0 && cardQueue[cardIndex].front +
                ", front. Left or right arrow key to flip the card."}>
              {cardQueue && cardQueue.length && cardQueue[cardIndex].front}
            </Typography>
          </Box>
          <StyledFlipOverlay py={3} align="center">
            <Typography tabIndex={isFlipped ? -1 : 0}
              aria-label="Space, right arrow or left arrow key to flip the card.">Flip</Typography>
          </StyledFlipOverlay>
        </Box>
      </StyledCardFace>
    )
  }

  function CardBack() {
    return (
      <StyledCardFace style={{
        opacity,
        transform: transform.to((t) => {
          return `${t} rotateY(180deg)`
        })
      }} color={currentDeck.hexColor}>
        <Box display="flex" flexDirection="column" justifyContent="center"
          p={1} height="100%">
          <Box display="flex" flexDirection="column" flexGrow={1} justifyContent="center">
            <Typography tabIndex={isFlipped ? 0 : -1} ref={answerElement} align="center"
              style={{
                fontFamily: "Bebas Neue",
                fontSize: "1.8rem"
              }}
              aria-label={cardQueue && cardQueue.length && cardQueue[cardIndex].back +
                ", back. Up arrow key if remembered, down arrow key if forgotten."}>
              {cardQueue && cardQueue.length && cardQueue[cardIndex].back}
            </Typography>
            <Typography tabIndex={isFlipped && cardQueue && cardQueue[cardIndex] && cardQueue[cardIndex].description ? 0 : -1}
              align="center" style={{ fontFamily: "Mada" }}>
              {cardQueue && cardQueue.length && cardQueue[cardIndex].description}
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={1} direction="row-reverse">
              <Grid item xs={6}>
                <Button tabIndex={isFlipped ? 0 : -1} variant="contained" disabled={!isFlipped}
                  onClick={() => handleCardProgression(true)} color="primary" fullWidth>
                  Remembered
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button tabIndex={isFlipped ? 0 : -1} variant="contained" disabled={!isFlipped}
                  onClick={() => handleCardProgression(false)} color="secondary" fullWidth>
                  Forgot
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </StyledCardFace>
    )
  }

  return (
    <>
      {cardQueue && cardQueue?.length > 0 &&
        <StyledReviewCard onClick={() => { if (!isFlipped) flipCard() }}>
          <CardFront />
          <CardBack />
        </StyledReviewCard>
      }

      {cardQueue && cardQueue?.length === 0 &&
        <>
          <Typography variant="h1">There are no cards left to review!🙌</Typography>
          <Box py={1} />
          <Button variant="contained"
           color="primary"
           component={Link}
           to={`/edit/${deckId}`}>Maybe you want to add a new card?</Button>
          <Box py={4} />
        </>
      }
    </>
  )
}