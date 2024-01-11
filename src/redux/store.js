import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index'; // Ensure this path is correct for your rootReducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;