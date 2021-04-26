import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Review from './Review/Review';

import { API_DECKS } from '../data/config';
import { setLoggedIn } from '../store/actions/DataActions';

export default function Pages() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(API_DECKS, {
      method: "GET"
    }).then(response => {
      if (response.status === 200) {
        dispatch(setLoggedIn(true));
      } else {
        dispatch(setLoggedIn(false));
      }
    }).catch(error => {
      console.log(error);
    });
  }, [])

  return (
    <Body>
      <StyledHeader>
        <Navbar />
      </StyledHeader>

      <StyledMainContent>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/review/:id' component={Review}/>
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