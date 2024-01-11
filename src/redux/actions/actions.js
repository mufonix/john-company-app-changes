import {
  SET_SCENARIO,
  SET_NUM_PLAYERS,
  SET_PLAYER_NAMES,
  START_GAME,
  SET_CURRENT_TURN,
  SET_CURRENT_PHASE,
  ASSIGN_OFFICE,
  VACATE_OFFICE
} from './actionTypes';

export const setScenario = scenario => ({
  type: SET_SCENARIO,
  payload: scenario,
});

export const setNumPlayers = numPlayers => ({
  type: SET_NUM_PLAYERS,
  payload: numPlayers,
});

export const setPlayerNames = names => ({
  type: SET_PLAYER_NAMES,
  payload: names,
});

export const startGame = () => ({
  type: START_GAME,
});

export const setCurrentTurn = turn => ({
  type: SET_CURRENT_TURN,
  payload: turn,
});

export const setCurrentPhase = phase => ({
  type: SET_CURRENT_PHASE,
  payload: phase,
});

export const assignOffice = (playerName, office) => ({
  type: ASSIGN_OFFICE,
  payload: { playerName, office }
});

export const vacateOffice = (playerName, office) => ({
  type: VACATE_OFFICE,
  payload: { playerName, office }
});
