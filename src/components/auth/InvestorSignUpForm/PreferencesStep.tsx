import React, { useState } from 'react';
import CategorySelector from './categorySelector/CategorySelector';
import InvestmentRangeSelector from './investRange/InvestSlector';
import YesNoSelector from './yes-no/YesNoSelector';

const PreferencesStep: React.FC = () => {
  return (
    <form>
      <label>Choose Categories </label>
      <CategorySelector />
      <label>Investment range </label>
      <InvestmentRangeSelector />
      <label>Country of companies </label>
      <select className="select">
        <option value="israel">Israel</option>
        <option value="other">Other</option>
      </select>
      <label>investing in already public companies? </label>
      <YesNoSelector />
      <button type="submit">Lets Start!</button>
    </form>
  );
};

export default PreferencesStep;
