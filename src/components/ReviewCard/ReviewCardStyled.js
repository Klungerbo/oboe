import { Typography } from "@material-ui/core"
import styled from 'styled-components';

/**
 * The card itself, with background color and padding
 */
export const StyledReviewCard = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
`;

/**
 * Applies to the text/button content inside the card
 */
export const StyledFrontFace = styled.div`
  background-color: ${props => props.color};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
`;

/**
 * Applies to the text/button content inside the card
 */
export const StyledBackFace = styled.div`
  background-color: ${props => props.color};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transform: rotateY(0.4turn);
  backface-visibility: hidden;
  width: 100%;
`;

/**
 * Applies to the text/button content inside the card
 */
export const StyledCenterText = styled(Typography)`
  text-align: center;
`;

export const StyledCenterBigText = styled(StyledCenterText)`
  font-size: 2.5rem;
`