import { Box, Modal, Grow, TextField, Button, Typography, List, ListItem, ListItemText, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { footballStore } from '../../store/teams';
import { IPlayer } from '../../interfaces/Team'
import { useHookstate } from '@hookstate/core';

function ModalCreateTeam(props: any) {
  const { isOpen, onClose } = props;
  
  let footballState = useHookstate(footballStore.footballState);

  let teamUpdate = useMemo(() => footballState.teamUpdate.get(), [footballState.teamUpdate]);

  const [loading, setLoading] = useState(false);

  const [searchedPlayer, setSearchedPlayer] = useState("");

  const [team, setTeam] = useState({
    name: "",
    players: [],
    id: ""
  });

  useEffect(() => {
    if (teamUpdate.id) {
      const players: never[] = teamUpdate.players as never[];
      setTeam({
        name: teamUpdate.name,
        players,
        id: teamUpdate.id
      });
    }
  }, [teamUpdate]);

  async function addPlayer() {
    setLoading(true);
    const player = await footballStore.addPlayer(searchedPlayer);
    let error = false;
  
    if (!player) {
      setNotification({ active: true, message: `El jugador "${searchedPlayer}" no se encuentra en ApiFotball` });
      error = true;
    } else {
      // Check if the player is already in the current team
      if (team.players.some((p: IPlayer) => p.player_name === player.player_name)) {
        setNotification({ active: true, message: `El jugador "${searchedPlayer}" ya está en su equipo` });
        error = true;
      } else {
        const isPlayerInOtherTeam = Object.values(footballState.teams).some(
          (team: any) => team.id !== teamUpdate.id && team.players.some((p: IPlayer) => p.player_name === player.player_name)
        );
        if (isPlayerInOtherTeam) {
          setNotification({ active: true, message: `El jugador "${searchedPlayer}" ya está en otro equipo` });
          error = true;
        } else {
          if (team.players.length >= 5) {
            setNotification({ active: true, message: `El equipo puede tener un máximo de 5 jugadores.` });
            error = true;
          } else {
            setTeam((prevTeam: any) => ({
              ...prevTeam,
              players: [...prevTeam.players, player],
            }));
            setSearchedPlayer("");
          }
        }
      }
    }
  
    if (error) {
      setTimeout(() => {
        setSearchedPlayer("");
      }, 2000);
    }
    setLoading(false);
  }

  function removePlayer(player: IPlayer) {
    setTeam((prevTeam: any) => ({
      ...prevTeam,
      players: prevTeam.players.filter((p: IPlayer) => p.player_name !== player.player_name),
    }));
  }

  const [notification, setNotification] = useState({
    active: false,
    message: ""
  });

  const handleClose = () => {
    setNotification({...notification, active: false});
  };

  async function saveTeam() {
    if(!team.name) {
      return setNotification({ active: true, message: `Nombre de equipo requerido` });
    } 
    if(team.id) {
      await footballStore.editTeam(team, teamUpdate.id);
    } else {
      await footballStore.createTeam(team);
    }
    closeModal()
  }

  function closeModal() {
    setTeam({ name: "", players: [], id: "" });
    footballState.teamUpdate.set({
      name: "",
      players: [],
      id: ""
    });
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={closeModal} className="modal-content">
      <Grow in={isOpen} timeout={1000}>
        <Box className="modal-body">
        <Snackbar open={notification.active} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="error">{ notification.message }</Alert>
        </Snackbar>
          <Box className="close-icon-container">
            <CloseIcon onClick={closeModal} className='close-icon' />
          </Box>
          <Box className="title">{ team.id ? "Editar" : "Crear" } equipo</Box>
          <Box display="flex" flexDirection="column" my={2}>
            <TextField
              label="Nombre del equipo"
              variant="standard"
              value={team.name}
              onChange={(e) => setTeam({ ...team, name: e.target.value })}
            />
            <Box display="flex" alignItems="center" my={2}>
              <TextField
                label="Buscar jugador"
                variant="standard"
                sx={{ width: '100%' }}
                value={searchedPlayer}
                onChange={(e) => setSearchedPlayer(e.target.value)}
              />
              <Button onClick={() => addPlayer()} className="button-primary-small" sx={{ marginLeft: "15px" }}>
                {
                  loading ? (
                    <Box display='flex' alignItems='center'>
                      <CircularProgress sx={{ color: 'white', height: '20px!important', width: '20px!important' }} />
                    </Box>
                  ) : (
                    <Typography>Agregar</Typography>
                  )
                }
                
              </Button>
            </Box>
            <Box my={3}>
              <Typography className="title-form">Lista de jugadores (maximo 5)</Typography>
              <List>
                {team.players.length ? (
                  team.players.map((player: IPlayer, index: number) => (
                    <ListItem key={index}>
                      <ListItemText className='list-item-text' primary={`- ${player.player_name}`} />
                      <CloseIcon onClick={() => removePlayer(player)} sx={{ color: 'var(--white)' }} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText className='list-item-text' primary="- Sin jugadores" />
                  </ListItem>
                )}
              </List>
            </Box>
            <Box width="100%" display='flex' justifyContent='center' mt={4}>
              <Button onClick={() => saveTeam()} className="button-primary" sx={{ marginLeft: "15px" }}>
                { team.id ? "EDITAR" : "CREAR" }
              </Button>
            </Box>
          </Box>
        </Box>
      </Grow>
    </Modal>
  );
}

export default ModalCreateTeam;