import { animated } from "react-spring";
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
export const StyledFrontFace = styled(animated.div)`
  background-color: ${props => props.color};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

/**
 * Applies to the text/button content inside the card
 */
export const StyledBackFace = styled(animated.div)`
  background-color: ${props => props.color};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;