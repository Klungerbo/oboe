import { Button } from '@material-ui/core';
import styled from "styled-components";

export const StyledSignUpButton = styled(Button)`
  ${({ theme }) => `
    background-color: ${theme.palette.blue.main};
    color: ${theme.palette.blue.text};
    :hover {
      background-color: ${theme.palette.blue.dark}
    }
  `}
`;