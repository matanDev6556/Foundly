import React from 'react';
import { useParams } from 'react-router-dom';
import './CompanyProfile.css';
import { useModal } from '../../../context/popupContext';
import BuyInvestModal from './components/BuyInvestModal';
import CompanyContent from './components/CompanyContent';
import InvestmentButton from './components/InvestmentButton';
import { useCompany } from './hooks/useCompany';
import { useInvestment } from './hooks/useInvestment';


const CompanyProfile: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const { company, isLoading, error } = useCompany(companyId);
  const { handleBuy, showBuyModal } = useInvestment();
  const { modalType } = useModal();

  if (isLoading) return <div>טוען...</div>;
  if (error) return <div>שגיאה: {error}</div>;
  if (!company) return <div>לא נמצאה חברה</div>;

  return (
    <>
      <CompanyContent company={company} />
      <InvestmentButton onClick={handleBuy} />
      {modalType === 'Buy' && (
        <BuyInvestModal company={company} show={showBuyModal} />
      )}
    </>
  );
};

export default CompanyProfile;
