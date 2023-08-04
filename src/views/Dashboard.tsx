import React, { useState, useMemo, useEffect } from 'react';
import { useHookstate } from '@hookstate/core';
import { footballStore } from '../store/teams';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import ModalCreateTeam from '../components/modals/ModalCreateTeam'
import TeamFormation from '../components/teamFormation';
import Versus from '../assets/versus.svg'

const Dashboard: React.FC = () => {
  let playerState = useHookstate(footballStore.footballState);
  const teams = useMemo(() => playerState.teams.get(), [playerState.teams]);

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [notification, setNotification] = useState({
    active: false,
    message: ""
  });

  function openModalCreateTeam(){
    if(teams.length >= 2) {
      setNotification({ active: true, message: `El maximo de equipos permitidos es de 2`  });
    } else {
      setIsModalOpen(true)
    }
  } 

  function closeModalCreateTeam(){
    setIsModalOpen(false)
  } 

  function editTeam(team: any) {
    setIsModalOpen(true);
    playerState.teamUpdate.set({
      name: team.name,
      players: team.players,
      id: team.id
    });
  }

  function handleCloseNotification(){
    setNotification({...notification, active: false});
  };

  return <Box className="container">
    <ModalCreateTeam isOpen={isModalOpen} onClose={closeModalCreateTeam} />
    <Snackbar open={notification.active} autoHideDuration={2000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity="error">{ notification.message }</Alert>
    </Snackbar>
    <Box textAlign="center">
      <Box className='title white' my={5} textAlign={'center'}>
        {
          !teams.length ? (
            <Typography className="title">Actualmente no tienes ningún equipo.</Typography>
          ) : teams.length === 1 ? (
            <Typography className="title">Ahora solo falta un buen adversario!</Typography>
          ) : (
            <Typography className="title">Ya esta todo listo para el enfrentamiento!</Typography>
          )
        }
      </Box>
      <Button onClick={() => openModalCreateTeam()} className="button-primary" sx={{ minWidth: '400px' }}>
        CREAR EQUIPO
      </Button>
      <Box className="container-teams">
        {teams[0] && (
          <TeamFormation team={teams[0]} editTeam={editTeam} />
        )}
        <Box>
        {teams.length > 1 && (
          <img src={Versus} className="versus-image" alt="logo" />
        )}
        </Box>
        {teams[1] && (
          <TeamFormation team={teams[1]} editTeam={editTeam} />
        )}
      </Box>
    </Box>
  </Box>;
};

export default Dashboard;
