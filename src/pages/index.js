import React from 'react';
import { Switch, Route } from 'react-router';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import Review from './Review/Review';

import styled from 'styled-components';

export default function Pages() {
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