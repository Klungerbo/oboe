import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Review from './Review/Review';
import Edit from './Edit/Edit';

import { ACCEPTED_COOKIES, LOGGED_IN, EMAIL } from '../data/localStorageVariables';
import {
  setAcceptedCookies, setLoggedIn, setOpenVerifyCookies,
  setUserEmail
} from '../store/actions/DataActions';

import CookiesAcceptModal from '../components/CookiesAcceptModal/CookiesAcceptModal';
import TermsAndConditions from './TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { API_EMAIL, oboeFetch } from '../utils/oboeFetch';

export default function Pages() {
  const dispatch = useDispatch();

  function checkCookies() {
    const initAcceptedCookies = window.localStorage.getItem(ACCEPTED_COOKIES);

    if (initAcceptedCookies === "TRUE") {
      dispatch(setAcceptedCookies(true));
      dispatch(setOpenVerifyCookies(false));
    }
  }

  async function checkLoginStatus() {
    const loggedIn = window.localStorage.getItem(LOGGED_IN);

    if (loggedIn === "TRUE" && EMAIL !== "") {
      const email = window.localStorage.getItem(EMAIL);

      dispatch(setLoggedIn(true));
      dispatch(setUserEmail(email));
    } else {
      try {
        const response = await oboeFetch(API_EMAIL);

        if (response.status === 200) {
          const email = await response.json().email;

          dispatch(setLoggedIn(true));
          dispatch(setUserEmail(email));
          window.localStorage.setItem(LOGGED_IN, "TRUE");
          window.localStorage.setItem(EMAIL, email);
        } else {
          dispatch(setLoggedIn(false));
          dispatch(setUserEmail(""));
          window.localStorage.setItem(LOGGED_IN, "FALSE");
          window.localStorage.setItem(EMAIL, "");
        }
      } catch (err) { console.log(err) }
    }
  }

  checkCookies();
  checkLoginStatus();

  return (
    <Body>
      <StyledHeader>
        <Navbar />
      </StyledHeader>

      {(window.localStorage.getItem(ACCEPTED_COOKIES) !== "TRUE") && <CookiesAcceptModal />}

      <StyledMainContent>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/terms' component={TermsAndConditions} />
          <Route path='/privacy' component={PrivacyPolicy} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
          <Route path='/review/:id' component={Review} />
          <Route path='/edit/:id' component={Edit} />
        </Switch>
      </StyledMainContent>

      <StyledFooter>
        <Footer />
      </StyledFooter>
    </Body>
  )
};

/* Styles */
const Body = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const StyledFooter = styled.div`
  justify-self: flex-end;
  background-color: red;
`

const StyledHeader = styled.div`
  justify-self: flex-start;
`;

const StyledMainContent = styled.div`
  flex-grow: 1;
  display: flex;
`;
