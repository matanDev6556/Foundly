import React, { useState, useEffect } from 'react';
import './investSelector.css';

interface InvestmentRangeSelectorProps {
  setInvestmentRange: (range: string) => void;
  initialRange?: string;
}

const InvestmentRangeSelector: React.FC<InvestmentRangeSelectorProps> = ({
  setInvestmentRange,
  initialRange,
}) => {
  const [selectedRange, setSelectedRange] = useState<string>(
    initialRange ?? '0-100k'
  );

  useEffect(() => {
    if (initialRange !== undefined) {
      setSelectedRange(initialRange);
    }
  }, [initialRange]);

  useEffect(() => {
    setInvestmentRange(selectedRange);
  }, [selectedRange, setInvestmentRange]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(e.target.value);
  };

  return (
    <div className="investment-range-container">
      <select
        className="select"
        onChange={handleRangeChange}
        value={selectedRange}
      >
        <option value="0-100k">$0 - $100k</option>
        <option value="100k-500k">$100k - $500k</option>
        <option value="500k-1M">$500k - $1M</option>
        <option value="1M+">$1M+</option>
      </select>
    </div>
  );
};

export default InvestmentRangeSelector;
