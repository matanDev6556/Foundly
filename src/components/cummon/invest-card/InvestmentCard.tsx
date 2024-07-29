import React from 'react';
import './InvestmentCard.css';
import InvestmentLogo from './InvestLogo';
import InvestmentInfoItem from './InvestInfoItem';
import InvestmentProgress from './InvestProgress';
import 'react-toastify/dist/ReactToastify.css';
import LikeButton from './LikeButton';
import Company from '../../../models/Company';

interface InvestmentCardProps {
  company: Company;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ company }) => {
  const { companyDetails, raiseDetails } = company;

  const formatTargetAmount = (amount: number): string => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(0) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'K';
    } else {
      return amount.toString();
    }
  };

  return (
    <div className="investment-card">
      <div className="investment-card__like">
        <LikeButton companyId={company.uid} />
      </div>
      <InvestmentLogo
        logo={companyDetails.logo}
        companyName={company.name}
        image={companyDetails.image}
      />

      <div className="investment-card__info">
        <InvestmentInfoItem
          value={formatTargetAmount(raiseDetails.targetAmount) + '$'}
          label="מינ' השקעה"
        />
        <InvestmentInfoItem
          value={raiseDetails.deadline}
          label="חודשים נותרו"
        />
        <InvestmentInfoItem value={companyDetails.category} label="קטגוריה" />
      </div>

      <h3 className="investment-card__title">{company.name}</h3>
      <p className="investment-card__description">
        {companyDetails.description}
      </p>
      <p>{companyDetails.about}</p>

      <InvestmentProgress progress={company.calculateProgress()} />
    </div>
  );
};

export default InvestmentCard;
