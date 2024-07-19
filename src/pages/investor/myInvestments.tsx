import { useState, useEffect } from 'react';
import { companies } from '../../utils/constant';
import { LikesProvider, useLikes } from '../../context/LikesContext';
import Company from '../../models/Company'; // Ensure you have this import
import SearchBar from '../../components/cummon/SearchBar';
import './myInvestments.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import LikeView from '../../components/investor/my-investments/LikeView';
import InvestmentsView from '../../components/investor/my-investments/InvestmentsView';

const MyInvestments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { likes } = useLikes();
  const [likedCompanies, setLikedCompanies] = useState<Company[]>([]);
  const [isLikesView, setIsLikesView] = useState<boolean>(false);

  useEffect(() => {
    const likedCompanyIds = new Set(likes.map((like) => like.companyId));
    // Filter companies based on the liked company IDs
    const filteredCompanies = companies.filter((company) =>
      likedCompanyIds.has(company.uid)
    );
    setLikedCompanies(filteredCompanies);
  }, [likes]);

  // Filter liked companies based on the search term
  const filteredCompanies = likedCompanies.filter((company) =>
    company.companyDetails.companyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-investments">
      <div className="all-investments__search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button
          className="toggle-view-button"
          onClick={() => setIsLikesView(!isLikesView)}
        >
          {isLikesView ? (
            <FaHeart size={25} color="#da678a" />
          ) : (
            <FaRegHeart size={25} color="#da678a" />
          )}
        </button>
      </div>
      {isLikesView ? (
        <LikeView companies={filteredCompanies} title={'השקעות שמורות'} />
      ) : (
        <InvestmentsView companies={[]} title={'ההשקעות שלי'} />
      )}
    </div>
  );
};

export default MyInvestments;
