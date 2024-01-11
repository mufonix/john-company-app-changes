import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const InitialSetupPopup = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <p className="text-black">Turn 1: Skipping The London Phase. Please assign offices before proceeding.</p>
        <button onClick={onConfirm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          OK
        </button>
      </div>
    </div>
  );
};

// Define prop types
InitialSetupPopup.propTypes = {
  onConfirm: PropTypes.func.isRequired // Specify that onConfirm is a function and is required
};

export default InitialSetupPopup;
