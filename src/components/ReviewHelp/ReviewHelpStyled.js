import { AccordionSummary, Typography } from '@material-ui/core';
import styled from 'styled-components';

/**
 * Smaller text to accommodate the small help section
 */
export const StyledHelpText = styled(Typography)`
  font-size: 0.8rem;
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  background: #111;
  box-shadow: 0 0 7px 1px rgba(30,30,30,0.4);
  border-radius: 5px;
  `;