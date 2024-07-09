// InvestmentCard.tsx
import React from 'react';
import './InvestmentCard.css';

import InvestmentLogo from './InvestLogo';
import Company from '../../models/Company';
import InvestmentInfoItem from './InvestInfoItem';
import InvestmentProgress from './InvestProgress';

interface InvestmentCardProps {
  company: Company;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ company }) => {
  const { companyDetails, raiseDetails } = company;

  return (
    <div className="investment-card">
      <InvestmentLogo
        logo={companyDetails.logo}
        companyName={companyDetails.companyName}
        image={companyDetails.image}
      />

      <div className="investment-card__info">
        <InvestmentInfoItem
          value={raiseDetails.targetAmount + '$'}
          label="מינ' השקעה"
        />
        <InvestmentInfoItem
          value={raiseDetails.deadline}
          label="חודשים נותרו"
        />
        <InvestmentInfoItem value={companyDetails.category} label="קטגוריה" />
      </div>

      <h3 className="investment-card__title">{companyDetails.companyName}</h3>
      <p className="investment-card__description">
        {companyDetails.description}
      </p>
      <p>{companyDetails.about}</p>

      <InvestmentProgress progress={company.calculateProgress()} />
    </div>
  );
};

export default InvestmentCard;
