import React from 'react';
import './InvestmentCard.css';
import InvestmentLogo from './InvestLogo';
import InvestmentInfoItem from './InvestInfoItem';
import InvestmentProgress from './InvestProgress';
import 'react-toastify/dist/ReactToastify.css';
import LikeButton from './LikeButton';
import Company from '../../../models/Company';

import {
  calculateRemainingDays,
  formatRemainingTime,
  formatTargetAmount,
} from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../utils/enums';

interface InvestmentCardProps {
  company: Company;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ company }) => {
  const { companyDetails, raiseDetails } = company;
  const navigate = useNavigate();

  const remainingDays = calculateRemainingDays(raiseDetails.deadline);
  const { value: remainingTimeValue, unit: remainingTimeUnit } =
    formatRemainingTime(remainingDays);

  const handleClick = () => {
    navigate(RoutePath.CompanyProfile + '/' + company.uid, {
      state: { company },
    });
  };

  return (
    <div className="investment-card">
      <div className="investment-card__like">
        <LikeButton companyId={company.uid} />
      </div>
      <InvestmentLogo
        onClick={handleClick}
        logo={companyDetails.logo}
        companyName={company.name}
        image={companyDetails.image}
      />

      <div className="investment-card__info">
        <InvestmentInfoItem
          value={formatTargetAmount(raiseDetails.minInvestment) + '$'}
          label="מינ' השקעה"
        />
        <InvestmentInfoItem
          value={remainingTimeValue}
          label={`${remainingTimeUnit} נותרו `}
        />
        <InvestmentInfoItem value={companyDetails.category} label="קטגוריה" />
      </div>

      <h3 className="investment-card__title">{company.name}</h3>
      <p className="investment-card__description">
        {companyDetails.description}
      </p>
      <p className="investment-card__about">{companyDetails.about}</p>

      <InvestmentProgress progress={company.calculateProgress()} />
    </div>
  );
};

export default InvestmentCard;
