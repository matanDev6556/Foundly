import { useState } from 'react';
import './investSelector.css';
const InvestmentRangeSelector: React.FC = () => {
  const investmentRanges: string[] = [
    '0 - 10,000',
    '10,001 - 50,000',
    '50,001 - 100,000',
    '100,001 - 500,000',
    '500,001 - 1,000,000',
    '1,000,001 - 5,000,000',
    '5,000,001+',
  ];

  const [selectedRange, setSelectedRange] = useState<string>('');

  const handleRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(event.target.value);
  };

  return (
    <div className="investment-range-container">
      <select
        value={selectedRange}
        onChange={handleRangeChange}
        className="select"
      >
        <option value="" disabled>
          Select range
        </option>
        {investmentRanges.map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InvestmentRangeSelector;
