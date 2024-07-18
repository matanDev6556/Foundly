// src/pages/SearchInvestments.tsx
import React, { useState } from 'react';
import InvestmentCard from '../../../components/invest-card/InvestmentCard';
import { companies } from '../../../utils/constant';
import { LikesProvider } from '../../../context/LikesContext';

import './SearchInvestment.css'; // Add this line
import SearchBar from '../../../components/cummon/SearchBar';

const SearchInvestments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter((company) =>
    company.companyDetails.companyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //TODO : fetch real companies list

  return (
    <LikesProvider>
      <div className="all-investments">
        <div className="all-investments__search-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <h2 className="title">כל ההשקעות</h2>
        <div className="all-investments__list">
          {filteredCompanies.map((company) => (
            <InvestmentCard key={company.uid} company={company} />
          ))}
        </div>
      </div>
    </LikesProvider>
  );
};

export default SearchInvestments;
