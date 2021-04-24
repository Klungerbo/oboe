import React from "react";
import {
  Grid, Box, Hidden,
  Dialog
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import ReviewHelp from '../../components/ReviewHelp/ReviewHelp'
import ReviewStats from '../../components/ReviewStats/ReviewStats'
import ReviewCard from '../../components/ReviewCard/ReviewCard'
import { ExitToDecksButton } from '../../components/ExitToDecksButton/ExitToDecksButtonStyled';
import { useParams, Link } from 'react-router-dom';

export default function Review() {

  let { id } = useParams();
  const [color, setColor] = React.useState("");
  const [reviewStats, setReviewStats] = React.useState({ correct: 0, incorrect: 0, cardsLeft: 0 });

  return (
    <Grid container>
      <Hidden smDown>
        <Grid item container md={2}>
          <Box display="flex" alignSelf="flex-end">
            <ReviewHelp></ReviewHelp>
          </Box>
        </Grid>
      </Hidden>
          <Box width={280}>
        <ReviewCard deckid={id} cardColor={color} setCardColor={setColor} reviewStats={reviewStats} setReviewStats={setReviewStats} />
            <ReviewStats reviewStats={reviewStats} />
          </Box>
        <ExitToDecksButton component={Link} to="/" exitbuttoncolor={color} variant="contained" endIcon={<SendIcon />}>Wrap up session</ExitToDecksButton>
      </Grid>
      <Hidden>
        <Grid item md={2}>
        </Grid>
      </Hidden>
    </Grid>
  )
}