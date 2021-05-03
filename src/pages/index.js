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
import Edit from './Edit/Edit';

import { API_EMAIL } from '../data/config';
import { setLoggedIn, setUserEmail } from '../store/actions/DataActions';

export default function Pages() {
  const dispatch = useDispatch();

  

  useEffect(() => {
    fetch(API_EMAIL, {
      method: "GET",
      credentials: "include"
    }).then(response => {
      response.json().then(jsonObject => {
        if (response.status === 200) {
          dispatch(setLoggedIn(true));
          dispatch(setUserEmail(jsonObject.email));
        } else {
          dispatch(setLoggedIn(false));
          dispatch(setUserEmail(""));
        }
      }).catch(console.log);
    }).catch(console.log);
  }, [dispatch])

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
          <Route path='/edit/:id' component={Edit}/>
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