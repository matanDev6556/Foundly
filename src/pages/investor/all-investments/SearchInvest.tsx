import React, { useState, useMemo, useCallback } from 'react';
import { LikesProvider } from '../../../context/LikesContext';
import './SearchInvestment.css';
import SearchBar from '../../../components/cummon/search/SearchBar';
import InvestmentList from '../../../components/cummon/invest-card/InvestList';
import FilterButton from '../../../components/cummon/filter/FilterButton';
import { useCompanyList } from '../../../context/CompanyListContext';

const SearchInvestments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { companies } = useCompanyList();

  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((company) =>
        selectedFilters.length === 0 || selectedFilters.includes(company.companyDetails.category)
      );
  }, [companies, searchTerm, selectedFilters]);

  const handleFilterChange = useCallback((filters: string[]) => {
    setSelectedFilters(filters);
  }, []);

  return (
    <LikesProvider>
      <div className="all-investments">
        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleFilterChange={handleFilterChange}
        />
        <h4 className="title">All investments</h4>
        <InvestmentList companies={filteredCompanies} />
      </div>
    </LikesProvider>
  );
};

const SearchSection: React.FC<{
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleFilterChange: (filters: string[]) => void;
}> = ({ searchTerm, setSearchTerm, handleFilterChange }) => (
  <div className="all-investments__search-container">
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <FilterButton onFilterChange={handleFilterChange} />
  </div>
);

export default SearchInvestments;
