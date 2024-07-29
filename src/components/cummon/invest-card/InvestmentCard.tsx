import React from 'react';
import './InvestmentCard.css';
import InvestmentLogo from './InvestLogo';
import InvestmentInfoItem from './InvestInfoItem';
import InvestmentProgress from './InvestProgress';
import 'react-toastify/dist/ReactToastify.css';
import LikeButton from './LikeButton';
import Company from '../../../models/Company';
import { differenceInDays, differenceInMonths } from 'date-fns';

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

  const calculateRemainingDays = (): number => {
    const now = new Date();
    const deadlineDate = raiseDetails.deadline.toDate();
    return Math.max(0, differenceInDays(deadlineDate, now));
  };

  const formatRemainingTime = (
    days: number
  ): { value: string; unit: string } => {
    if (days >= 365) {
      const years = Math.floor(days / 365);
      return { value: years.toString(), unit: years === 1 ? 'שנה' : 'שנים' };
    } else if (days >= 30) {
      const months = Math.floor(days / 30);
      return {
        value: months.toString(),
        unit: months === 1 ? 'חודש' : 'חודשים',
      };
    } else {
      return { value: days.toString(), unit: days === 1 ? 'יום' : 'ימים' };
    }
  };

  const remainingDays = calculateRemainingDays();
  const { value: remainingTimeValue, unit: remainingTimeUnit } =
    formatRemainingTime(remainingDays);

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
          value={formatTargetAmount(raiseDetails.minInvestment) + '$'}
          label="מינ' השקעה"
        />
        <InvestmentInfoItem
          value={remainingTimeValue}
          label={`${remainingTimeUnit}נותרו `}
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
