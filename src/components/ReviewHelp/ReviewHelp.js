import React from 'react'
import {
  Typography, Accordion, AccordionSummary,
  AccordionDetails, Box, Divider
} from "@material-ui/core";
import { StyledHelpText } from "./ReviewHelpStyled"
import Keyboard from '@material-ui/icons/KeyboardOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ReviewHelp() {
  return (
    <Box minWidth={250}>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}

          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <StyledHelpText>Keyboard shortcuts</StyledHelpText>
            <Box px={1}></Box>
            <Keyboard />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" width="100%">
            <Divider />
            <Box py={1}>
              <Typography variant="h4" align="center">Frontside</Typography>
            </Box>
            <Divider />
            <Box display="flex" pt={1} alignContent="center" justifyContent="space-between">
              <StyledHelpText>Left arrow</StyledHelpText>
              <StyledHelpText>Flip card</StyledHelpText>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="space-between">
              <StyledHelpText>Right arrow</StyledHelpText>
              <StyledHelpText>Flip card</StyledHelpText>
            </Box>
            <Box display="flex" pb={1} alignContent="center" justifyContent="space-between">
              <StyledHelpText>Space</StyledHelpText>
              <StyledHelpText>Flip card</StyledHelpText>
            </Box>
            <Divider />
            <Box py={1}>
              <Typography variant="h4" align="center">Backside</Typography>
            </Box>
            <Divider />
            <Box display="flex" pt={1} alignContent="center" justifyContent="space-between">
              <StyledHelpText>Up arrow</StyledHelpText>
              <StyledHelpText>Mark correct</StyledHelpText>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="space-between">
              <StyledHelpText>Down arrow</StyledHelpText>
              <StyledHelpText>Mark incorrect</StyledHelpText>
            </Box>
          </Box>

        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
