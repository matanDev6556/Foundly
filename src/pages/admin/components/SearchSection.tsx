import React from 'react';
import SearchBar from '../../../components/cummon/search/SearchBar';
import { styles } from '../styles';

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedUserType: string;
  handleUserTypeChange: (type: 'All' | 'Admin' | 'Company' | 'Investor') => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  setSearchTerm,
  selectedUserType,
  handleUserTypeChange,
}) => (
  <div style={styles.searchContainer}>
    <div style={styles.searchBar}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
    <select
      value={selectedUserType}
      onChange={(e) => handleUserTypeChange(e.target.value as 'All' | 'Admin' | 'Company' | 'Investor')}
      style={styles.dropdown}
    >
      <option value="All">All Users</option>
      <option value="Admin">Admins</option>
      <option value="Company">Companies</option>
      <option value="Investor">Investors</option>
    </select>
  </div>
);