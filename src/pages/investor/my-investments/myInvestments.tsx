import React, { useState } from 'react';
import './myInvestments.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import InvestmentsView from '../../../components/investor/my-investments/InvestmentsView';
import { useFilteredPurchasedCompanies } from './hooks/useFilterPurchedCompanies';
import { useFilteredLikedCompanies } from './hooks/useFilterLikedCompany';
import { useToggleView } from './hooks/useToggleView';
import FilterButton from '../../../components/cummon/filter/FilterButton';
import SearchBar from '../../../components/cummon/search/SearchBar';
import LikedCompaniesView from '../../../components/investor/my-investments/LikeView';
import { useAppStatus } from '../../../context/AppStatusContext';
import Loading from '../../../components/cummon/loading/Loading';

const MyInvestments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { isLikesView, toggleView } = useToggleView();
  const { loading } = useAppStatus();

  const filteredLikedCompanies = useFilteredLikedCompanies(
    searchTerm,
    selectedFilters
  );
  const filteredPurchasedCompanies = useFilteredPurchasedCompanies(
    searchTerm,
    selectedFilters
  );

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  if (loading) return <Loading />;

  return (
    <div className="all-investments">
      <div className="all-investments__search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterButton onFilterChange={handleFilterChange} />
        <button className="toggle-view-button" onClick={toggleView}>
          {isLikesView ? (
            <FaHeart size={25} color="#da678a" />
          ) : (
            <FaRegHeart size={25} color="#da678a" />
          )}
        </button>
      </div>
      {isLikesView ? (
        <LikedCompaniesView
          companies={filteredLikedCompanies}
          title={'Saved Investments'}
        />
      ) : (
        <InvestmentsView
          companies={filteredPurchasedCompanies}
          title={'My Investments'}
          showUserInvestments={true}
        />
      )}
    </div>
  );
};

export default MyInvestments;
