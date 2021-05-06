import { List, Typography } from '@material-ui/core';
import styled from 'styled-components';

/**
 * Title styling.
 */
export const StyledHomeNav = styled(Typography)`
  font-family: 'Hammersmith One';
  font-size: 1.5rem;
`;

/**
 * Drawer List styling.
 */
export const StyledDrawerList = styled(List)`
  width: 200px;
`;

/**
 * Code adapted from:
 * https://css-tricks.com/how-to-create-a-skip-to-content-link/
 */
export const StyledHiddenLink = styled.a`
  background: #319795;
  color: #fff;
  font-weight: 700;
  left: 50%;
  padding: 4px;
  position: absolute;
  transition: transform 0.3s;
  transform: translateY(-100%);
;

  :focus {
    transform: translateY(0%);
  }
`;