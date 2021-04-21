import { Box } from '@material-ui/core';
import styled from 'styled-components';

/**
 * Manages spacing for copyright on breakpoint.
 */
export const StyledGuestLayout = styled(Box)`
  display: flex;
  gap: 200px;
  
  ${theme => theme.theme.breakpoints.down("sm")} {
    flex-direction: "column";
    gap: 70px;
  }
`;