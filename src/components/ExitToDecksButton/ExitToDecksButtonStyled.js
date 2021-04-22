import { Button } from '@material-ui/core';
import styled from 'styled-components';

export const ExitToDecksButton = styled(Button)`
  background-color: ${props => props.exitbuttoncolor};
  color: white;
  :hover {
    background-color: ${props => props.exitbuttoncolor};
  }
`;