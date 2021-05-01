import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {
  ListItem, Container, Box,
  Button, AppBar, Hidden,
  IconButton, Drawer, ListItemText,
  ListItemIcon, Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import AppsIcon from '@material-ui/icons/Apps';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { StyledDrawerList, StyledHomeNav } from './NavbarStyled';
import { setDecks, setLoggedIn } from '../../store/actions/DataActions';
import { API_AUTH_SIGNOUT } from '../../data/config';


/**
 * Oboe navbar. 
 * Manages its own state between user logged in and guest.
 * 
 * @returns jsx of navbar to be rendered by React.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLoggedIn = useSelector(state => state.loggedIn);

  const [state, setState] = React.useState(false);

  /**
   * Toggle left side drawer.
   * 
   * Adapted from:
   * https://material-ui.com/components/drawers/#drawer
   * 
   * @param {boolean} open - the open state of the drawer.
   */
  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  /**
   * Creates a log out button.
   *
   * @returns jsx of log out button to be rendered by React.
   */
  const logoutButton = () => {
    return (
      <Button onClick={() => {
        fetch(API_AUTH_SIGNOUT, {
          method: "GET"
        }).catch(console.log);

        dispatch(setLoggedIn(false));
        dispatch(setDecks([]));
        history.push("/");
      }}>Log out</Button>
    );
  };

  /**
   * Creates a default navigation bar for sm and up.
   * 
   * @returns jsx of the default navigation bar.
   */
  const defaultNavbar = () => {
    return (
      <>
        <Box flexGrow="1" >
          <Button component={NavLink} to="/" underline="none">
            <StyledHomeNav variant="h4" aria-label="home">Oboe</StyledHomeNav>
          </Button>
          {userLoggedIn && <Button component={NavLink} to="/" underline="none">Decks</Button>}
        </Box>
        {userLoggedIn && logoutButton()}
      </>
    );
  }

  /**
   * Creates a navigation bar for xs and down.
   * 
   * @returns jsx of the navigation bar.
   */
  const xsNavbar = () => {
    return (
      <>
        {userLoggedIn &&
          <>
            <Drawer anchor='left' open={state} onClose={toggleDrawer(false)}>{drawerItems()}</Drawer>
            <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </>
        }
        <Button component={NavLink} to="/" underline="none">
          <StyledHomeNav>Oboe</StyledHomeNav>
        </Button>
      </>
    );
  }

  return (
    <nav role="navigation">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Hidden xsDown>
              {defaultNavbar()}
            </Hidden>
            <Hidden smUp>
              {xsNavbar()}
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}

/**
 * List of drawer items.
 * 
 * @returns jsx of the drawer list.
 */
const drawerItems = () => {
  return (
    <StyledDrawerList>
      <ListItem button component={NavLink} to="/">
        <ListItemIcon><AppsIcon /></ListItemIcon>
        <ListItemText primary="Decks" />
      </ListItem>
      <ListItem button component={NavLink} to="/about">
        <ListItemIcon><InfoIcon /></ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button component={NavLink} to="/contact">
        <ListItemIcon><EmailIcon /></ListItemIcon>
        <ListItemText primary="Contact" />
      </ListItem>
      <Box pt={5} />
      <ListItem button component={NavLink} to="/">
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    </StyledDrawerList>
  );
};
