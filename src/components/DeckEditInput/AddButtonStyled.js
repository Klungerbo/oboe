import { Box, Button } from '@material-ui/core';
import styled from "styled-components";

export const StyledAddButton = styled(Button)`
  ${({ theme }) => `
    height: 100%;
    ${theme.breakpoints.down('xs')} {
      height: 4rem;
      width: 50%;
      margin-left: auto;
    }
  `}
`;

export const StyledAddButtonContainer = styled(Box)`
  ${({ theme }) => `
    display: flex;
    flex-basis: 120px;
    flex-shrink: 0;
    ${theme.breakpoints.down('xs')} {
      flex-basis: 4rem;
    }
  `}
`;