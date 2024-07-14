import React from 'react';
import InvestmentCard from '../../../invest-card/InvestmentCard';
import './investmentsSection.css';
import { companies } from '../../../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext';

const InvestmentsSection: React.FC = () => {
  const navigate = useNavigate();
  const handleAllClick = () => {
    navigate('allInvestments');
  };

  return (
    <section className="investments-section">
      <div className="investments-section__header">
        <button
          className="investments-section__button"
          onClick={handleAllClick}
        >
          הכל
        </button>

        <h2 className="investments-section__title">השקעות פתוחות</h2>
      </div>
      <div className="investments-section__list">
        {companies.slice(0, 3).map((company) => (
          <InvestmentCard key={company.uid} company={company} />
        ))}
      </div>
    </section>
  );
};

export default InvestmentsSection;
