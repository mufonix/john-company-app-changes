import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setScenario, setNumPlayers, setPlayerNames, startGame } from './redux/actions/actions';

const NewGame = ({ startGameRedux }) => {
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState(Math.floor(1000 + Math.random() * 9000));
  const scenario = useSelector(state => state.game.scenario);
  const numPlayers = useSelector(state => state.game.numPlayers);
  const playerNames = useSelector(state => state.game.playerNames);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setGameId(Math.floor(1000 + Math.random() * 9000));
  }, []);

  const validateInputs = () => {
    if (!scenario) {
      setErrorMessage('Please select a scenario.');
      return false;
    }
    if (numPlayers < 2 || numPlayers > 6) {
      setErrorMessage('Number of players must be between 2 and 6.');
      return false;
    }
    for (let name of playerNames) {
      if (!name.trim()) {
        setErrorMessage('Please enter all player names.');
        return false;
      }
    }
    setErrorMessage('');
    return true;
  };

  const handleScenarioChange = (event) => {
    dispatch(setScenario(event.target.value));
    setErrorMessage('');
  };

  const handleNumPlayersChange = (event) => {
    const newNumPlayers = parseInt(event.target.value, 10);
    dispatch(setNumPlayers(newNumPlayers));
    dispatch(setPlayerNames(Array.from({ length: newNumPlayers }, () => '')));
    setErrorMessage('');
  };

  const handlePlayerNameChange = (index, event) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = event.target.value;
    dispatch(setPlayerNames(newPlayerNames));
    setErrorMessage('');
  };

  const handleBeginGame = () => {
    if (!validateInputs()) {
      return;
    }
    dispatch(startGame());
    startGameRedux();
  };

  return (
    <div className="bg-blue-500 min-h-screen flex flex-col items-center justify-center text-white p-4">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="mb-4">
        <p className="font-semibold">Game ID: <span className="font-normal">{gameId}</span></p>
      </div>
      <div className="mb-4">
        <label className="font-semibold mr-2">Scenario:</label>
        <select className="rounded p-2 text-black" value={scenario} onChange={handleScenarioChange}>
          <option value="">Select Scenario</option>
          <option value="1710">1710 Scenario</option>
          <option value="1758">1758 Scenario</option>
          <option value="1813">1813 Scenario</option>
          <option value="long1710">Long 1710 Scenario</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="font-semibold mr-2"># of Players:</label>
        <select className="rounded p-2 text-black" value={numPlayers} onChange={handleNumPlayersChange}>
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 2}>{i + 2}</option>
          ))}
        </select>
      </div>
      {Array.from({ length: numPlayers }, (_, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Player ${i + 1} Name`}
          className="mb-2 p-2 rounded text-black"
          value={playerNames[i]}
          onChange={(e) => handlePlayerNameChange(i, e)}
        />
      ))}
      <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleBeginGame}>
        Begin Game
      </button>
    </div>
  );
};

NewGame.propTypes = {
  startGameRedux: PropTypes.func.isRequired,
};

export default NewGame;
