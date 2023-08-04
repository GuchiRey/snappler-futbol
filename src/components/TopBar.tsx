import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import Logo from '../assets/snappler-logo.svg'

const TopBar: React.FC = () => {
  return (
    <AppBar position="static" className="navbar-container">
      <Toolbar className="navbar-body">
        <Container>
          <img src={Logo} className="navbar-logo" alt="logo" />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
