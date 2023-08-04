import axios from './api';

async function addPlayer(playerName: string) {
  try {
    const response = await axios.get(`/api/football?player_name=${playerName}`);
    return response.data[0];
  } catch (error) {
    throw error;
  }
}

export const teamsServices = {
  addPlayer,
};
