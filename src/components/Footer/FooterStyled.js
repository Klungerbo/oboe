import {
  Toolbar, List, Box,
  ListItem
} from '@material-ui/core';
import styled from 'styled-components';

/**
 * Container for nav link flexing.
 */
export const StyledHorizontalList = styled(List)`
  display: flex;
  flex-direction: row;
`;

/**
 * Manages spacing for copyright on breakpoint.
 */
export const StyledCopyrightContainer = styled(Box)`
  ${({ theme }) => `
    ${theme.breakpoints.down('xs')} {
      padding-bottom: 1rem;
    },
  `}
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

export const StyledListItem = styled(ListItem)`
  ${({ theme }) => `
    ${theme.breakpoints.down('xs')} {
      padding: 0;
    }
    ${theme.breakpoints.up('sm')} {
      padding: 0 16px;
    }
  `}
`;