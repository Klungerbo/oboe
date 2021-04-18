import { Toolbar, List } from '@material-ui/core';
import styled from 'styled-components';

/**
 * Container for nav link flexing.
 */
export const StyledHorizontalList = styled(List)`
  display: flex;
  flex-direction: row;
`;

/**
 * Main footer styling.
 */
export const StyledFooterContainer = styled.footer`
  ${({ theme }) => `
    flex-grow: 1;
    background-color: ${theme.palette.primary.main};

    ${theme.breakpoints.down('xs')} {
      flex-direction: column-reverse;
    }
  `}
`;

/**
 * Breakpoint for footer content.
 */
export const StyledToolbar = styled(Toolbar)`
  ${({ theme }) => `
    ${theme.breakpoints.down('xs')} {
      flex-direction: column-reverse;
    }
  `}
`;