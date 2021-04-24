import { animated } from "@react-spring/web";
import styled from 'styled-components';

/**
 * The card itself, with background color and padding
 */
export const StyledReviewCard = styled.div`
  ${({ theme }) => `
  ${theme.breakpoints.down("xs")} {
    width: 100%;
    min-height: 35vh;
  }
  ${theme.breakpoints.up("sm")} {
    width: 300px;
    min-height: 400px;
  }
    position: relative;
  `}
`;

/**
 * Applies to the text/button content inside the card
 */
export const StyledFrontFace = styled(animated.div)`
  background: linear-gradient(0, rgba(2,0,36,1) 0%, ${props => props.color} 100%);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 2%;
`;

/**
 * Applies to the text/button content inside the card
 */
export const StyledBackFace = styled(StyledFrontFace)`
`;