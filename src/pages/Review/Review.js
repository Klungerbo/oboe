import React from "react";
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
import { useSelector } from "react-redux";

export default function Review() {
  let { id } = useParams();
  const currentDeck = useSelector(state => state.currentDeck);
  const verticalLimit = useMediaQuery("(max-height: 600px)");

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
            <ReviewCard deckid={id} />
            <ReviewStats />
          </Box>
          {!verticalLimit && <Box pt={3} />}
          <ExitToDecksButton component={Link} to="/"
          exitbuttoncolor={currentDeck.cardColor} variant="contained"
          endIcon={<SendIcon />}>
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