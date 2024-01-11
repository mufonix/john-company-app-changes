// src/redux/reducers/index.js

import { combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';
import playerReducer from './reducers/playerReducer';
// import other reducers...

const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  // other reducers...
});

export default rootReducer;