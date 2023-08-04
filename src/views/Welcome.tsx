import React from 'react';
import { Container, Box, Button } from '@mui/material';
import LogoFootball from '../assets/football-logo.svg'
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return <Container className="container-center">
    <img src={LogoFootball} className="football-logo" alt="logo" />
    <Box className='title white' my={5} textAlign={'center'}>
      ¿Alguna vez soñaste con ver un partido de fútbol en donde se enfrenten tus jugadores favoritos? <br />
      Imaginate poder armar dos equipos de 5 jugadores cada uno, en donde no tengas ninguna limitación... posición, presupuesto, contrato, club, edad... tu mente es tu límite.
    </Box>
    <Button component={Link} to="/dashboard" className="button-primary" sx={{ minWidth: '400px' }}>
      COMENZAR
    </Button>
  </Container>;
};

export default Welcome;
