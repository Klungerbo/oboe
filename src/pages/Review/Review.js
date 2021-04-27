import React, { useEffect } from "react";
import {
  Grid, Box, Hidden,
  Container, useMediaQuery
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import ReviewHelp from '../../components/ReviewHelp/ReviewHelp'
import ReviewStats from '../../components/ReviewStats/ReviewStats'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { ExitToDecksButton } from '../../components/ExitToDecksButton/ExitToDecksButtonStyled';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDeck } from "../../store/actions/DataActions";
import colors from "../../data/colors";

export default function Review() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentDeck = useSelector(state => state.currentDeck);
  const decks = useSelector(state => state.decks)

  const verticalLimit = useMediaQuery("(max-height: 600px)");

  useEffect(() => {
    const deck = decks.find(item => item.id === parseInt(id));

    if (!deck)
      return;

    console.log("Deck");
    console.log(deck);
    if (deck) {
      deck.cardColor = colors[deck.colorId - 1].color;
      dispatch(setCurrentDeck(deck));
    }
  }, [])

  return (
    <Container>
      <Grid container style={{height: "100%"}}>
        <Hidden smDown>
          <Grid item container md={4}>
            <Box display="flex" pl={2} alignSelf="flex-end">
              <ReviewHelp />
            </Box>
          </Grid>
        </Hidden>
        <Grid container item direction="column" alignItems="center"
          justify="center" xs={12} md={4}>
          <Box width={280}>
            <ReviewCard />
            <ReviewStats />
          </Box>
          {!verticalLimit && <Box pt={3} />}
          <ExitToDecksButton component={Link} to="/" variant="contained" endIcon={<SendIcon />}>
            Wrap up session
          </ExitToDecksButton>
        </Grid>
        <Hidden>
          <Grid item md={4}>
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  )
}