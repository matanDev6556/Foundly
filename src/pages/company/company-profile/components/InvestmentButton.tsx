import React from 'react';
import Button from '../../../../components/cummon/Button';

interface InvestmentButtonProps {
  onClick: () => void;
}

const InvestmentButton: React.FC<InvestmentButtonProps> = ({ onClick }) => (
  <div className="center-button-container">
    <Button
      label="אני רוצה להשקיע"
      onClick={onClick}
      color="white"
      backgroundColor="#39958c"
      borderColor=""
      width="300px"
      height="60px"
      fontSize="20px"
    />
  </div>
);

export default InvestmentButton;
