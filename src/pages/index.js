import React from 'react';
import { Switch, Route } from 'react-router';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from './Home/Home';

import styled from 'styled-components';

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
`;

export default function Pages() {
  return (
    <Body>
      <StyledHeader>
        <Navbar />
      </StyledHeader>

      <StyledMainContent>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </StyledMainContent>

      <StyledFooter>
        <Footer />
      </StyledFooter>
    </Body>
  )
};
