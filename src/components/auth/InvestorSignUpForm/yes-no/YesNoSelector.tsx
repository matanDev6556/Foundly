import React from 'react';
import './YesNoSelector.css';
interface YesNoSelectorProps {
  setYesNo: (value: boolean) => void;
}

const YesNoSelector: React.FC<YesNoSelectorProps> = ({ setYesNo }) => {
  const handleYesNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYesNo(e.target.value === 'yes');
  };

  return (
    <div className="yes-no-container">
      <label>
        <input
          type="radio"
          name="yesNo"
          value="yes"
          onChange={handleYesNoChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name="yesNo"
          value="no"
          onChange={handleYesNoChange}
        />
        No
      </label>
    </div>
  );
};

export default YesNoSelector;
