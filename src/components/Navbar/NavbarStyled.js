import { List, Typography } from '@material-ui/core';
import styled from 'styled-components';

/**
 * Title styling.
 */
export const StyledHomeNav = styled(Typography)`
  font-family: 'Hammersmith One';
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
`;

/**
 * Drawer List styling.
 */
export const StyledDrawerList = styled(List)`
  width: 200px;
`;