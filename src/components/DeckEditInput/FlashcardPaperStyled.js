import { Paper } from '@material-ui/core';
import styled from "styled-components";

export const StyledFlashcardPaper = styled(Paper)`
  background-color: ${props => props.bgcolor};
  height: 100%;
  min-height: 170px;
`;