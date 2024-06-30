import React, { useState } from 'react';
import './YesNoSelector.css';

const YesNoSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    
  };

  return (
    <div className="yes-no-container">
      <label>
        <input
          type="radio"
          value="yes"
          checked={selectedOption === 'yes'}
          onChange={handleOptionChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          value="no"
          checked={selectedOption === 'no'}
          onChange={handleOptionChange}
        />
        No
      </label>
    </div>
  );
};

export default YesNoSelector;
