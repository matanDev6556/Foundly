import React from 'react';
import './investSelector.css';
interface InvestmentRangeSelectorProps {
  setInvestmentRange: (range: string) => void;
}

const InvestmentRangeSelector: React.FC<InvestmentRangeSelectorProps> = ({
  setInvestmentRange,
}) => {
  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvestmentRange(e.target.value);
  };

  return (
    <div className="investment-range-container">
      <select className="select" onChange={handleRangeChange}>
        <option value="0-100k">$0 - $100k</option>
        <option value="100k-500k">$100k - $500k</option>
        <option value="500k-1M">$500k - $1M</option>
        <option value="1M+">$1M+</option>
      </select>
    </div>
  );
};

export default InvestmentRangeSelector;
