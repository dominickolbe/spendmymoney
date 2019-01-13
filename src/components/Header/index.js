import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: white;
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;

  h1 {
    font-size: 14px;
    margin: 0;
  }

  nav {
    margin-left: auto;

    a {
      margin-left: 10px;
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <h1>spendmymoney.</h1>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/add-transaction'>Add transaction</Link>
      <Link to='/settings'>Settings</Link>
    </nav>
  </HeaderContainer>
);

export default Header;
