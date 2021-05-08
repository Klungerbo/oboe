import { Box } from '@material-ui/core';
import styled from "styled-components";

export const StyledFlashcardInfo = styled(Box)`
  ${({ theme }) => `
    ${theme.breakpoints.down('xs')} {
      flex-direction: column;
    }
  `}
`;