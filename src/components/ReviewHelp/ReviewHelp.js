import React from 'react'
import {
  Divider, Typography,
  Box
} from "@material-ui/core";
import Keyboard from '@material-ui/icons/KeyboardOutlined';
import { StyledReviewHelp, StyledHelpText } from './ReviewHelpStyled';
import { ArrowDownwardSharp, ArrowUpwardSharp } from '@material-ui/icons';

export default function ReviewHelp() {
  return (
    <StyledReviewHelp>
      <Box display="flex" justifyContent="spacebetween">
        <Typography>Hey</Typography>
        <Keyboard />


      </Box>
      <Divider></Divider>
      <Typography variant="h2">Frontside</Typography>
      <Divider></Divider>
      <Box display="flex" alignItems="center">
        <ArrowUpwardSharp />
        <StyledHelpText>Up arrow</StyledHelpText>
      </Box>
      <Box display="flex" alignItems="center">
        <ArrowDownwardSharp />
        <StyledHelpText>Down arrow</StyledHelpText>
        <StyledHelpText>Forgot</StyledHelpText>
      </Box>
      <Divider></Divider>
      <Typography variant="h2">Frontside</Typography>
      <Divider></Divider>
    </StyledReviewHelp>
  )
}
