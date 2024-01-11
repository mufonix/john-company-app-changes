import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignOffice, vacateOffice } from './redux/actions/actions';
import PropTypes from 'prop-types';

const AssignOfficeOverlay = ({ onClose }) => {
  const dispatch = useDispatch();
  const playerNames = useSelector(state => state.game.playerNames);
  const officeAssignments = useSelector(state => state.game.officeAssignments);
  const offices = [
    "Chairman", "Director of Trade", "Manager of Shipping", "Military Affairs",
    "President of Bombay", "President of Madras", "President of Bengal",
    "Commander of Bombay", "Commander of Madras", "Commander of Bengal",
    "Governor of Bombay", "Governor of Madras", "Governor of Bengal",
    "Superintendent of Trade in China", "Governor General"
  ];
  const [selectedOffices, setSelectedOffices] = useState({});

  useEffect(() => {
    const initialSelectedOffices = {};
    playerNames.forEach(player => {
      initialSelectedOffices[player] = '';
    });
    setSelectedOffices(initialSelectedOffices);
  }, [playerNames]);

  const handleAssignOffice = (playerName) => {
    const office = selectedOffices[playerName];
    if (!office) return;

    // Check if the office is already assigned to someone else
    let alreadyAssignedTo = null;
    for (const [otherPlayer, assignedOffices] of Object.entries(officeAssignments)) {
        if (assignedOffices.includes(office) && otherPlayer !== playerName) {
            alreadyAssignedTo = otherPlayer;
            break;
        }
    }

    // Confirm reassignment and vacate from the previous player
    if (alreadyAssignedTo) {
        const reassignConfirm = window.confirm(
            `${office} is currently assigned to ${alreadyAssignedTo}. Do you want to reassign this office to ${playerName}?`
        );
        if (!reassignConfirm) return;

        // Vacate the office from the previous player
        dispatch(vacateOffice(alreadyAssignedTo, office));
    }

    // Confirm the assignment
    if (window.confirm(`Assign ${office} to ${playerName}?`)) {
        console.log('Player Name:', playerName, 'Type of Player Name:', typeof playerName);
        console.log('Dispatching assignOffice:', { playerName, office });
        dispatch(assignOffice(playerName, office));
        setSelectedOffices(prev => ({ ...prev, [playerName]: '' }));
    }
};

  const handleVacateOffice = (playerName, office) => {
    if (window.confirm(`Vacate ${office} from ${playerName}?`)) {
      dispatch(vacateOffice(playerName, office));
    }
  };

  const handleOfficeSelection = (playerName, office) => {
    setSelectedOffices(prev => ({ ...prev, [playerName]: office }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold text-center text-black mb-4">Assign Offices</h2>
        {playerNames.map((playerName) => (
          <div key={playerName} className="mb-4">
            <h3 className="text-xl font-semibold text-black">{playerName}</h3>
            <div>
              {officeAssignments[playerName]?.map((assignedOffice, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span className="text-black">{assignedOffice}</span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleVacateOffice(playerName, assignedOffice)}
                  >
                    -
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <select
                  className="rounded p-2 text-black"
                  value={selectedOffices[playerName] || ''}
                  onChange={(e) => handleOfficeSelection(playerName, e.target.value)}
                >
                  <option value="">Select Office</option>
                  {offices.map((office, index) => (
                    <option key={index} value={office}>{office}</option>
                  ))}
                </select>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded ml-2"
                  onClick={() => handleAssignOffice(playerName)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
};

AssignOfficeOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default AssignOfficeOverlay;
