import { Typography } from '@material-ui/core';
import styled from "styled-components";

export const StyledDialogTitle = styled(Typography)`
  ${({ theme }) => `
    margin: ${theme.spacing(1,0,2,0)};
  `}
`;