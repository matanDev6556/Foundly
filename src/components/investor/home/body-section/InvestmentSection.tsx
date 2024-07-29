import React from 'react';
import './investmentsSection.css';
import { useNavigate } from 'react-router-dom';
import { companies } from '../../../../utils/constant';
import InvestmentList from '../../../cummon/invest-card/InvestList';

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
        <InvestmentList companies={companies.slice(0, 3)}/>
      </div>
    </section>
  );
};

export default InvestmentsSection;
