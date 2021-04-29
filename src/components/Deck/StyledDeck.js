import { Box, Card, CardActionArea, Paper } from '@material-ui/core';
import styled from 'styled-components';

export const StyledFullHeightBox = styled(Box)`
  height: 100%;
`;

export const StyledFullHeightCardActionArea = styled(CardActionArea)`
  height: 100%;
`;

export const StyledColoredCard = styled(Card)`
  background: linear-gradient(0, rgba(2,0,36,1) 0%, ${props => props.color} 70%);
`