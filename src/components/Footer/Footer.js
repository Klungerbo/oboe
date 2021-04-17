import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import {
  Container, Typography, Box,
  ListItemText, ListItem
} from '@material-ui/core';

import theme from '../../theme';
import { StyledFooterContainer, StyledToolbar, HorizontalList } from './FooterStyled';


/**
 * Oboe footer.
 * 
 * @returns jsx of footer to be rendered by React
 */
export default function Footer() {
  const pathname = useLocation().pathname;

  /**
   * A list of nav links.
   */
  const navLinks = [
    { title: `about`, path: `/about` },
    { title: `contact`, path: `/contact` }
  ];

  /**
   * Maps a list of nav links to styled nav links. 
   * Adds extra styles to the nav link that is selected.
   * 
   * @param {string} pathname - the pathname of the current location.
   * @returns a list of nav links.
   */
  const mapPaths = () => {
    return navLinks.map(({ title, path }) => (
      <ListItem key={title} button component={NavLink} exact to={path} aria-label={title}>
        <ListItemText
          style={{
            borderBottom: pathname === path && `1px solid ${theme.palette.text.primary}`,
            color: pathname === path ? theme.palette.text.primary : theme.palette.text.secondary,
          }}
          primaryTypographyProps={{ variant: "button" }} primary={title} />
      </ListItem>
    ));
  }

  return (
    <StyledFooterContainer>
      <Container maxWidth="xl">
        <StyledToolbar disableGutters>
          <Box flexGrow="1">
            <Typography noWrap variant="body2" color="textSecondary">
              ©2021 WORK Rooted
            </Typography>
          </Box>
          <HorizontalList component="nav">
            {mapPaths()}
          </HorizontalList>
        </StyledToolbar>
      </Container>
    </StyledFooterContainer>
  );

}

