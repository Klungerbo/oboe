import Box from '@material-ui/core/Box/Box'
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import React from 'react'
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

export default function ReviewStats() {

  const { correct, incorrect, cardsLeft } = useSelector(state => state.reviewStats);

  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center" color="#00B800" fontSize={32}>
        <ArrowUpwardRoundedIcon fontSize="large" />
        <Typography style={{ fontSize: "2.5rem", fontFamily: "Unica One" }}>
          {correct}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <DashboardRoundedIcon fontSize="large" />
        <Typography style={{ fontSize: "2.5rem", fontFamily: "Unica One" }}>
          {cardsLeft}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" color="red">
        <ArrowDownwardRoundedIcon fontSize="large" />
        <Typography style={{ fontSize: "2.5rem", fontFamily: "Unica One" }}>
          {incorrect}
        </Typography>
      </Box>
    </Box>
  )
}
