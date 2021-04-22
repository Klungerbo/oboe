import { Grid } from '@material-ui/core'
import Box from '@material-ui/core/Box/Box'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function ReviewStats({reviewStats}) {

  const {correct, incorrect, cardsLeft} = reviewStats;

  return (
    <Box display="flex" pb={4}>
      <Box display="flex" alignItems="center" color="green" fontSize={32}>
        <ArrowUpwardRoundedIcon fontSize="large" />
        <Typography style={{ fontSize: "1.8rem", fontFamily: "Thasadith" }}>
          {correct}
        </Typography>
      </Box>
      <Box px={4}></Box>
      <Box display="flex" alignItems="center">
        <DashboardRoundedIcon fontSize="large" />
        <Typography style={{ fontSize: "1.8rem", fontFamily: "Thasadith" }}>
          {cardsLeft}
        </Typography>
      </Box>
      <Box px={4}></Box>
      <Box display="flex" alignItems="center" color="red">
        <ArrowDownwardRoundedIcon fontSize="large" />
        <Typography style={{ fontSize: "1.8rem", fontFamily: "Thasadith" }}>
          {incorrect}
        </Typography>
      </Box>
    </Box>
  )
}
