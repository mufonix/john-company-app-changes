import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTurn, setCurrentPhase } from './redux/actions/actions';
import AssignOfficeOverlay from './AssignOfficeOverlay';
import InitialSetupPopup from './InitialSetupPopup';
import LondonSeason from './phases/LondonSeason';
import Family from './phases/Family';
import Hiring from './phases/Hiring';
import CompanyOperation from './phases/CompanyOperation';
// ... import other phase components as needed

const GameScreen = () => {
    const dispatch = useDispatch();
    const currentTurn = useSelector(state => state.game.currentTurn);
    const currentPhase = useSelector(state => state.game.currentPhase);
    const [showAssignOffice, setShowAssignOffice] = useState(false);
    const [showInitialSetup, setShowInitialSetup] = useState(currentTurn === 1);

    const PHASES = [
        "The London Season",
        "Family",
        "Hiring",
        "Company Operation",
        // ... other phases
    ];

    const PhaseComponent = () => {
        switch (currentPhase) {
            case 0:
                return <LondonSeason />;
            case 1:
                return <Family />;
            case 2:
                return <Hiring />;
            case 3:
                return <CompanyOperation />;
            // ... handle other cases for different phases
            default:
                return null;
        }
    };

    const goToNextPhase = () => {
        if (currentPhase < PHASES.length - 1) {
            dispatch(setCurrentPhase(currentPhase + 1));
        } else {
            dispatch(setCurrentTurn(currentTurn + 1));
            dispatch(setCurrentPhase(0));
        }
    };

    const goToPreviousPhase = () => {
        // Logic to go to the previous phase
        // This may depend on your game's rules and how you track phases
    };

    const handleAssignOfficesClick = () => {
        setShowAssignOffice(!showAssignOffice);
    };

    const closeAssignOfficeOverlay = () => {
        setShowAssignOffice(false);
    };

    return (
        <div className="bg-blue-500 min-h-screen p-4 text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Turn {currentTurn}</h2>
                <button onClick={handleAssignOfficesClick} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                    Assign Offices
                </button>
            </div>
            <div className="text-center mb-4">
                <h3 className="text-3xl">Current Phase: {PHASES[currentPhase]}</h3>
            </div>
            {showInitialSetup && <InitialSetupPopup onConfirm={() => setShowInitialSetup(false)} />}
            {showAssignOffice && <AssignOfficeOverlay onClose={closeAssignOfficeOverlay} />}
            <PhaseComponent />
            <div className="flex justify-between mt-4">
                <button onClick={goToPreviousPhase} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Previous Phase
                </button>
                <button onClick={goToNextPhase} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Next Phase
                </button>
            </div>
        </div>
    );
};

export default GameScreen;
