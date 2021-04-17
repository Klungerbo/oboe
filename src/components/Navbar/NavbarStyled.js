import { List, Typography } from '@material-ui/core';
import styled from 'styled-components';

/**
 * Title styling.
 */
export const HomeNav = styled(Typography)`
  font-family: 'Hammersmith One';
  display: flex;
  flex-direction: row;
`;

/**
 * Drawer List styling.
 */
export const DrawerList = styled(List)`
  width: 200px;
`;