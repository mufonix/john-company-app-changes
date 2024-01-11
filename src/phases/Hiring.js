import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AssignOfficeOverlay from '../AssignOfficeOverlay';
import { assignOffice } from '../redux/actions/actions';

const Hiring = () => {
  const dispatch = useDispatch();
  const [currentOfficeIndex, setCurrentOfficeIndex] = useState(0);
  const [showManualAssign, setShowManualAssign] = useState(false);
  const [showAssistAssign, setShowAssistAssign] = useState(false);
  const officeOrder = [
    "Chairman", "Director of Trade", "Governor General", "Manager of Shipping",
    "Military Affairs", "President of Bombay", "President of Madras",
    "President of Bengal", "Superintendent of Trade in China", "Governor of Bombay",
    "Governor of Madras", "Governor of Bengal", "Governor of Punjab",
    "Governor of Delhi", "Governor of Maratha", "Governor of Hyderabad",
    "Governor of Mysore"
  ];
  const officeStatus = useSelector(state => state.game.officeStatus); // Adjust as per your state
  const players = useSelector(state => state.game.players); // Adjust as per your state

  const goToNextOffice = () => {
    let nextIndex = currentOfficeIndex + 1;
    if (nextIndex >= officeOrder.length) {
      nextIndex = 0;
    }
    setCurrentOfficeIndex(nextIndex);
  };

  const handlePlayerSelection = (office, playerName) => {
    dispatch(assignOffice(office, playerName)); // Ensure this action exists in your Redux setup
    goToNextOffice();
  };

  const renderAssistedAssignment = () => {
    const currentOffice = officeOrder[currentOfficeIndex];
    const isVacant = !officeStatus[currentOffice];

    if (!isVacant) {
      goToNextOffice();
      return null;
    }

    const officeDetails = {
      "Chairman": {
        chosenBy: "Court of Directors",
        candidates: "All players"
      },
      "Director of Trade": {
        chosenBy: "Chairman",
        candidates: "Office holders except Governors and Chairman, or writers if none"
      },
      // Add details for other offices similarly...
    };

    const currentDetails = officeDetails[currentOffice];

    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Assigning {currentOffice}</h2>
        <p>Chosen by: {currentDetails.chosenBy}</p>
        <p>Candidates: {currentDetails.candidates}</p>
        <ul>
          {players.map(player => (
            <li key={player.name} className="my-2">
              {player.name}
              <button 
                onClick={() => handlePlayerSelection(currentOffice, player.name)}
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Assign
              </button>
            </li>
          ))}
        </ul>
        <button 
          onClick={goToNextOffice}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
        >
          Skip Office
        </button>
      </div>
    );
  };

  const handleManualAssignClick = () => setShowManualAssign(true);
  const handleAssistAssignClick = () => setShowAssistAssign(true);

  if (showManualAssign) {
    return <AssignOfficeOverlay />;
  }

  if (showAssistAssign) {
    return renderAssistedAssignment();
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">Office Assignment</h1>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleAssistAssignClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Assist with assigning offices
        </button>
        <button
          onClick={handleManualAssignClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Manually assign offices
        </button>
      </div>
    </div>
  );
};

export default Hiring;
