import { animated } from "@react-spring/web";
import { Box } from "@material-ui/core";
import styled from 'styled-components';

/**
 * A container for the card, not the frontface nor backface
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
export const StyledCardFace = styled(animated.div)`
  background: linear-gradient(0, rgba(2,0,36,1) 0%, ${props => props.color} 70%);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 5px;
`;

export const StyledFlipOverlay = styled(Box)`
  background-color: rgba(0,0,0,0.3);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

