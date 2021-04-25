import {
  Typography, Accordion,
  AccordionDetails, Box, Divider
} from "@material-ui/core";
import { StyledHelpText, StyledAccordionSummary } from "./ReviewHelpStyled"
import Keyboard from '@material-ui/icons/KeyboardOutlined';
import { ExpandLessRounded } from "@material-ui/icons";

export default function ReviewHelp() {

  return (
    <Box minWidth={250}>
      <Accordion>
        <StyledAccordionSummary
          expandIcon={<ExpandLessRounded />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Box display="flex" alignItems="center"
            justifyContent="space-between">
            <StyledHelpText>Keyboard shortcuts</StyledHelpText>
            <Box px={1}></Box>
            <Keyboard />
          </Box>
        </StyledAccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" width="100%">
            <Box py={1}>
              <Typography tabIndex={0}
                aria-label="List of shortcut keys available before flipping the card"
                variant="h4" align="center">
                Frontside
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" pt={1} alignContent="center" justifyContent="space-between">
              <StyledHelpText tabIndex={0}
                aria-label="Press the left arrow key, right arrow key or space to flip the card">
                Left arrow
              </StyledHelpText>
              <StyledHelpText>Flip card</StyledHelpText>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="space-between">
              <StyledHelpText>Right arrow</StyledHelpText>
              <StyledHelpText>Flip card</StyledHelpText>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="space-between">
              <StyledHelpText >Space</StyledHelpText>
              <StyledHelpText>Flip card</StyledHelpText>
            </Box>
            <Box display="flex" pb={1} alignContent="center" justifyContent="space-between">
              <StyledHelpText tabIndex={0}
                aria-label="Press the escape key to go back to the deck overview">
                Esc
              </StyledHelpText>
              <StyledHelpText>Back to decks</StyledHelpText>
            </Box>
            <Divider />
            <Box py={1}>
              <Typography tabIndex={0}
                aria-label="List of shortcut keys available after flipping the card"
                variant="h4" align="center">
                Backside
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" pt={1} alignContent="center" justifyContent="space-between">
              <StyledHelpText tabIndex={0}
                aria-label="Press the up arrow key if you remembered the answer">
                Up arrow
              </StyledHelpText>
              <StyledHelpText>Mark correct</StyledHelpText>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="space-between">
              <StyledHelpText tabIndex={0}
                aria-label="Press the down arrow key if you forgot the answer">
                Down arrow
              </StyledHelpText>
              <StyledHelpText>Mark incorrect</StyledHelpText>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="space-between">
              <StyledHelpText tabIndex={0}
                aria-label="Press the escape key to exit to the deck overview">
                Esc
              </StyledHelpText>
              <StyledHelpText>Back to decks</StyledHelpText>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
