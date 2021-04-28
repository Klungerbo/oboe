import { Paper, Box } from '@material-ui/core';

import styled from 'styled-components';

export const StyledMediaContainer = styled(Box)`
  ${({ theme }) => `
    flex-direction: row;

    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
    }
  `}
`;

export const StyledAvatar = styled.img`
  ${({ theme }) => `
    width: 10vw;
    max-width: 120px;
    min-width: 100px;

    ${theme.breakpoints.up('xs')} {
      width: 25vw;
      min-width: 70px;
    }
    ${theme.breakpoints.up('sm')} {
      min-width: 100px;
    }
    ${theme.breakpoints.up('md')} {
      min-width: 120px;
    }
  `}
`;

export const StyledLogo = styled.img`
  width: 40%;
  flex-basis: 400px;
  flex-shrink: 1;
`;

export const StyledCard = styled(Paper)`
  max-width: 425px;
`;