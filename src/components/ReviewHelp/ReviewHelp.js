import React from 'react'
import {
  Typography, Accordion, AccordionSummary,
  AccordionDetails
} from "@material-ui/core";
import Keyboard from '@material-ui/icons/KeyboardOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ReviewHelp() {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Keyboard shortcuts</Typography>
        <Keyboard />
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
          </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
