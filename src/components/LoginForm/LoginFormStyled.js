import { Card, Button } from '@material-ui/core';
import styled from "styled-components";

export const StyledLoginForm = styled(Card)`
  ${theme => theme.theme.breakpoints.down("sm")} {
    
  }
  max-width: 400px;
  margin: auto;
`;

export const StyledSignUpButton = styled(Button)`
  ${({ theme }) => `
    background-color: ${theme.palette.blue.main};
    color: white;
    :hover {
      background-color: ${theme.palette.blue.dark}
    }
  `}
`;