import { Grid } from '@material-ui/core';
import styled from "styled-components";

export const StyledEditDeleteContainer = styled(Grid)`
  ${({ theme }) => `
    ${theme.breakpoints.down('xs')} {
      flex-direction: row-reverse;
      height: 4rem;
    }
  `}
`;