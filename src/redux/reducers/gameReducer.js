import {
  SET_SCENARIO,
  SET_NUM_PLAYERS,
  SET_PLAYER_NAMES,
  START_GAME,
  ASSIGN_OFFICE,
  VACATE_OFFICE
} from '../actions/actionTypes';

const initialState = {
  scenario: '',
  numPlayers: 2,
  playerNames: ['', ''],
  currentTurn: 1,
  currentPhase: 1,
  officeAssignments: {} // State to track office assignments
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCENARIO:
      return { ...state, scenario: action.payload };
    case SET_NUM_PLAYERS:
      return {
        ...state,
        numPlayers: action.payload,
        playerNames: Array.from({ length: action.payload }, () => ''),
        currentTurn: 1,
        currentPhase: 1
      };
    case SET_PLAYER_NAMES:
      return { ...state, playerNames: action.payload };
    case START_GAME:
      return state;
    case ASSIGN_OFFICE: {
        const { playerName, office } = action.payload;
    
        const updatedAssignments = {
            ...state.officeAssignments,
            [playerName]: (state.officeAssignments[playerName] || []).concat(office)
        };
    
        console.log(`Assigning '${office}' to '${playerName}'`);
        Object.entries(updatedAssignments).forEach(([key, value]) => {
            console.log(`Key: ${key}, Value: ${value}`);
        });
    
        return {
            ...state,
            officeAssignments: updatedAssignments
        };
    }    
    case VACATE_OFFICE: {
      const { playerName, office } = action.payload;
      const newAssignments = { ...state.officeAssignments };
    
      // Check if the player has any offices assigned before trying to filter
      if (newAssignments[playerName]) {
        newAssignments[playerName] = newAssignments[playerName].filter(o => o !== office);
      } else {
        // Handle the case where the player does not have any offices assigned
        console.error(`No offices found for player ${playerName} to vacate.`);
      }
    
      console.log('Vacating Office:', newAssignments);
      return {
        ...state,
        officeAssignments: newAssignments
      };
    }    
    default:
      return state;
  }
};

export default gameReducer;
