import React from 'react';
import './investmentsSection.css';
import { useNavigate } from 'react-router-dom';
import InvestmentList from '../../../cummon/invest-card/InvestList';
import { useCompanyList } from '../../../../context/CompanyListContext';
import { useAppStatus } from '../../../../context/AppStatusContext';
import Loading from '../../../cummon/loading/Loading';
import Company from '../../../../models/Company';

const InvestmentsSection: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useAppStatus();
  const { companies } = useCompanyList();

  if (loading) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }

  return (
    <section className="investments-section">
      <InvestmentHeader onAllClick={() => navigate('allInvestments')} />
      <InvestmentContent companies={companies.slice(0, 3)} />
    </section>
  );
};

const InvestmentHeader: React.FC<{ onAllClick: () => void }> = ({ onAllClick }) => (
  <div className="investments-section__header">
    <button className="investments-section__button" onClick={onAllClick}>
      All
    </button>
    <h4 className="investments-section__title">Suggested Investments</h4>
  </div>
);

const InvestmentContent: React.FC<{ companies: Company[] }> = ({ companies }) => (
  <div className="investments-section__list">
    <InvestmentList companies={companies} />
  </div>
);

export default InvestmentsSection;
