import React, { useState } from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './redux/store'; // Import your Redux store

import NewGame from './NewGame';
import GameScreen from './GameScreen'; // Import GameScreen

function App() {
  const [screen, setScreen] = useState('welcome');

  const handleNewGameClick = () => {
    setScreen('newGame');
  };

  const startGameRedux = () => {
    setScreen('gameScreen');
  };

  return (
    <Provider store={store}> {/* Wrap your components with the Redux Provider */}
      <div className="App">
        {screen === 'welcome' && (
          <header className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-4">John Company 2e Player Aid</h1>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={handleNewGameClick}
            >
              New Game
            </button>
            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
              Continue Game
            </button>
          </header>
        )}
        {screen === 'newGame' && <NewGame startGameRedux={startGameRedux} />}
        {screen === 'gameScreen' && <GameScreen />}
      </div>
    </Provider>
  );
}

export default App;
