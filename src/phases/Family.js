import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ExpandableSection = ({ title, expanded, toggle, children }) => (
  <div className="mb-4">
    <button 
      onClick={toggle} 
      className="flex items-center justify-between w-full px-4 py-2 text-left text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring"
    >
      <span>{title}</span>
      <span>{expanded ? '-' : '+'}</span>
    </button>
    {expanded && <div className="mt-2 px-4 py-2 bg-white rounded-md shadow">{children}</div>}
  </div>
);

ExpandableSection.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const Family = () => {
  const [showExtraActions, setShowExtraActions] = useState(false);
  const [showFamilyActions, setShowFamilyActions] = useState(false);
  const [showShareCreation, setShowShareCreation] = useState(false);

  // Retrieve the chairman's name from the Redux state
  const chairmanName = useSelector(state => {
    const officeAssignments = state.game.officeAssignments;
    const chairman = Object.keys(officeAssignments).find(player => 
      officeAssignments[player].includes('Chairman')
    );
    return chairman || 'Chairman'; // Default to 'Chairman' if not found
  });

  const toggleSection = (section) => {
    switch (section) {
      case 'extraActions':
        setShowExtraActions(!showExtraActions);
        break;
      case 'familyActions':
        setShowFamilyActions(!showFamilyActions);
        break;
      case 'shareCreation':
        setShowShareCreation(!showShareCreation);
        break;
      default:
        break;
    }
  };

  return (
    <div className="family-phase-container">
      <h2 className="text-xl font-bold mb-4">Beginning with {chairmanName} and continuing clockwise, each player selects a family action.</h2>
      
      <ExpandableSection title="How to get extra actions" expanded={showExtraActions} toggle={() => toggleSection('extraActions')}>
        <ul className="list-disc pl-5 text-black">
          <li>Check for any laws that have Extra Actions. Only the most recently-passed law with an Extra Action can be used, if any. Do not reposition your marker.</li>
          <li>If there are 4 or more vacant offices, you may place 2 writers instead of 1 if you choose to Enlist a Writer.</li>
          <li>If you pick the same action that you picked last turn, you get to do it twice.</li>
        </ul>
      </ExpandableSection>

      <ExpandableSection title="List of family actions" expanded={showFamilyActions} toggle={() => toggleSection('familyActions')}>
        <ul className="list-disc pl-5 text-black">
          <li><b>Enlist Writer:</b> Place 1 family member in one of the Writer spots (attached to each of the 3 Presidencies).</li>  
          <li><b>Enlist Officer:</b> Place 1 family member in the Officers-In-Training spot (attached to the Military Affairs office.)</li>
          <li><b>Purchase Luxury:</b> Pay £4 and take a luxury card. Adjust Victory Points.</li>
          <li><b>Purchase Shipyard:</b> Pay £2 and take a Shipyard card and the corresponding ship token. Place the ship token on the card.</li>
          <li><b>Purchase Workshop:</b> Pay £5 and take a Workshop card.</li>
          <li><b>Seek Share:</b> Place a family member on any empty space on the Stock Exchange Track (above the Court of Directors) and pay the corresponding £-value</li>
        </ul>
      </ExpandableSection>

      <ExpandableSection title="After all actions have been chosen, new company shares are created" expanded={showShareCreation} toggle={() => toggleSection('shareCreation')}>
        <ul className="list-disc pl-5 text-black">
          <li>While the company has debt, move the debt marker one spot to the left and add the right-most family member from the Stock Exchange Track onto the Board of Directors.</li>
          <li>Once the company has no more debt, move any remaining family members as far to the right as possible while preserving their order</li>
        </ul>
      </ExpandableSection>
    </div>
  );
};

export default Family;
