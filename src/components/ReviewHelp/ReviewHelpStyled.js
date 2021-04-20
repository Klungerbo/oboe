import { Card, Typography } from '@material-ui/core';
import styled from 'styled-components';

/**
 * The card itself, with background color and padding
 */
export const StyledReviewHelp = styled(Card)`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    background-color: white;
    color: #333;
    ${theme.breakpoints.down('xs')} {
      display: none;
    },
  `}
  
`;

/**
 * Smaller text to accommodate the small help section
 */
export const StyledHelpText = styled(Typography)`
  font-size: 0.8rem;
  &:last-of-type {
    justify-self: flex-end;
  }
`;