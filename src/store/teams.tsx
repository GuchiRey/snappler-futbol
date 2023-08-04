import { hookstate } from '@hookstate/core';
import { teamsServices } from '../services/teams'
import { ITeam } from '../interfaces/Team'

const MAX_TEAMS = 2;

const footballState = hookstate({
  teams: [] as ITeam[],
  teamUpdate: {
    name: "",
    players: [],
    id: ""
  },
});

function createTeam(team: any) {
  if (footballState.teams.get().length >= MAX_TEAMS) {
    throw new Error('Ya ha alcanzado el límite de equipos (máximo 2).');
  }
  team.id = generateUniqueId();
  footballState.teams.set((currentTeams) => [...currentTeams, team]);
}

function editTeam(team: any, id: string) {
  const teams = footballState.teams.get();
  const teamIndex = teams.findIndex((t: any) => t.id === id);

  if (teamIndex !== -1) {
    const updatedPlayers = JSON.parse(JSON.stringify(team.players));
    const updatedTeam: ITeam = {
      ...teams[teamIndex],
      name: team.name,
      players: updatedPlayers,
      id: team.id,
    };
    footballState.teams[teamIndex].set(updatedTeam);
  } else {
    throw new Error('Equipo no encontrado para actualizar.');
  }
}

async function addPlayer(playerName: string) {
  try {
    const response = await teamsServices.addPlayer(playerName);
    return response;
  } catch (e) {
    console.log(e);
  }
}

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const footballStore = {
  footballState,
  addPlayer,
  createTeam,
  editTeam,
};
