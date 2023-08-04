import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { IPlayer } from '../interfaces/Team';
import Stadium from '../assets/stadium.svg';

const TeamFormation: React.FC<any> = ({ team, editTeam }) => {

  const playerNames = team.players.map((player: IPlayer) => player.player_name);
  const playersString = playerNames.join(', ');

  function getInitials(name: string) {
    const words = name.split(" ");
    return words.map(word => word.charAt(0)).join("");
  }

  return (
    <Box className="box-team">
      <Box className="title-form">{team.name}</Box>
      <Box my={3}>
        <Box className="title-form">Equipo compuesto por:</Box>
        <Typography sx={{ color: 'var(--white)', margin: '30px auto', maxWidth: '315px' }}>{ playersString ? playersString : 'Sin jugadores' }</Typography>
        <Box position="relative">
          <img src={Stadium} className="stadium-image" alt="logo" />
          {team.players.length ? (
            team.players.map((player: IPlayer, index: number) => (
              <Box key={index} className={`stadium-player stadium-player-${index+1}`}>{getInitials(player.player_name)}</Box>
            ))
          ) : (
            <Box></Box>
          )}
        </Box>
        <Typography sx={{ color: 'var(--white)', marginTop: '20px' }}>{ playerNames.length >= 5 ? "Equipo Completo" : "Equipo Formado" }</Typography>
        <Button onClick={() => editTeam(team)} className="button-primary-small" sx={{ marginTop: '40px' }}>
          Editar
        </Button>
      </Box>
    </Box>
  );
};

export default TeamFormation;
