import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  ListItem, Container, Box,
  Button, AppBar, Hidden,
  IconButton, Drawer, ListItemText,
  ListItemIcon, Toolbar, List
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import AppsIcon from '@material-ui/icons/Apps';
import EmailIcon from '@material-ui/icons/Email';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { StyledDrawerList, StyledHiddenLink, StyledHomeNav } from './NavbarStyled';
import { setDecks, setLoggedIn } from '../../store/actions/DataActions';
import { API_AUTH_SIGNOUT, oboeFetch } from '../../utils/oboeFetch';
import { EMAIL, LOGGED_IN } from '../../data/localStorageVariables';


/**
 * Oboe navbar. 
 * Manages its own state between user logged in and guest.
 * 
 * @returns jsx of navbar to be rendered by React.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(state => state.loggedIn);

  const [state, setState] = React.useState(false);

  /**
   * List of drawer items.
   * 
   * @returns jsx of the drawer list.
   */
  const drawerItems = () => {
    return (
      <StyledDrawerList>
        <ListItem button onClick={showDrawer(false)} component={NavLink} to="/">
          <ListItemIcon><AppsIcon /></ListItemIcon>
          <ListItemText primary="Decks" />
        </ListItem>
        <ListItem button onClick={showDrawer(false)} component={NavLink} to="/about">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={showDrawer(false)} component={NavLink} to="/contact">
          <ListItemIcon><EmailIcon /></ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <Box pt={5} />
        <ListItem button onClick={() => { handleLogout(); showDrawer(false) }}
          component={NavLink} to="/">
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </StyledDrawerList>
    );
  };

  /**
   * Toggle left side drawer.
   * 
   * Adapted from:
   * https://material-ui.com/components/drawers/#drawer
   * 
   * @param {boolean} newState - the open state of the drawer.
   */
  const showDrawer = newState => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(newState);
  };

  async function handleLogout() {
    try {
      oboeFetch(API_AUTH_SIGNOUT);

      dispatch(setLoggedIn(false));
      dispatch(setDecks([]));
      window.localStorage.setItem(LOGGED_IN, "FALSE");
      window.localStorage.setItem(EMAIL, "");
    } catch (error) { console.log(error) }
  }

  /**
   * Creates a default navigation bar for sm and up.
   * 
   * @returns jsx of the default navigation bar.
   */
  const defaultNavbar = () => {
    return (
      <List style={{ display: "flex", flexDirection: "row", padding: 0, width: "100%" }}>
        <ListItem style={{ width: "initial", paddingRight: "2px" }}>
          <Button component={NavLink} to="/" aria-label="Home">
            <StyledHomeNav>Oboe</StyledHomeNav>
          </Button>
        </ListItem>
        {userLoggedIn &&
          <>
            <ListItem style={{ flexGrow: "1", width: "initial", paddingLeft: "0px" }}>
              <Button style={{ height: "100%" }} component={NavLink} to="/">Decks</Button>
            </ListItem>
            <ListItem style={{ width: "initial" }}>
              <Button style={{ height: "100%" }} onClick={handleLogout} component={NavLink} to="/" >Log out</Button>
            </ListItem>
          </>
        }
      </List>
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
            <Drawer anchor='left' open={state} onClose={showDrawer(false)}>{drawerItems()}</Drawer>
            <IconButton onClick={showDrawer(true)} edge="start" color="inherit" aria-label="menu">
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

  /**
   * Skip to content adapted from:
   * https://css-tricks.com/how-to-create-a-skip-to-content-link/
   */
  return (
    <>
    <StyledHiddenLink className="skip-to-main-content" href='#main-content'>
      Skip to content
    </StyledHiddenLink>
    <StyledHiddenLink className="skip-to-footer" href='#footer-content'>
      Skip to footer 
    </StyledHiddenLink>

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
    </>
  );
}