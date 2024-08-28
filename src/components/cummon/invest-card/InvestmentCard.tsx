import React from 'react';
import './InvestmentCard.css';
import InvestmentLogo from './InvestLogo';
import InvestmentInfoItem from './InvestInfoItem';
import InvestmentProgress from './InvestProgress';
import LikeButton from './LikeButton';
import Company from '../../../models/Company';
import Invest from '../../../models/Invest';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../utils/enums';
import {
  calculateRemainingDays,
  formatRemainingTime,
  formatTargetAmount,
  shortFileName,
} from '../../../utils/functions';

interface InvestmentCardProps {
  company: Company;
  userInvestment?: Invest;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  company,
  userInvestment,
}) => {
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
      <CardHeader companyId={company.uid} />
      <CardLogo
        onClick={handleClick}
        logo={companyDetails.logo}
        companyName={company.name}
        image={companyDetails.image}
      />
      <CardInfo
        minInvestment={raiseDetails.minInvestment}
        remainingTimeValue={remainingTimeValue}
        remainingTimeUnit={remainingTimeUnit}
        category={companyDetails.category}
      />
      <CardContent
        name={company.name}
        description={companyDetails.description}
        about={companyDetails.about}
      />
      <CardFooter userInvestment={userInvestment} company={company} />
    </div>
  );
};

const CardHeader: React.FC<{ companyId: string }> = ({ companyId }) => (
  <div className="investment-card__like">
    <LikeButton companyId={companyId} />
  </div>
);

const CardLogo: React.FC<{
  onClick: () => void;
  logo: string;
  companyName: string;
  image: string;
}> = ({ onClick, logo, companyName, image }) => (
  <InvestmentLogo
    onClick={onClick}
    logo={logo}
    companyName={companyName}
    image={image}
  />
);

const CardInfo: React.FC<{
  minInvestment: number;
  remainingTimeValue: string;
  remainingTimeUnit: string;
  category: string;
}> = ({ minInvestment, remainingTimeValue, remainingTimeUnit, category }) => (
  <div className="investment-card__info">
    <InvestmentInfoItem
      value={formatTargetAmount(minInvestment) + '$'}
      label="Minimum Investment"
    />
    <InvestmentInfoItem
      value={remainingTimeValue}
      label={`${remainingTimeUnit} remaining`}
    />
    <InvestmentInfoItem value={category} label="Category" />
  </div>
);

const CardContent: React.FC<{
  name: string;
  description: string;
  about: string;
}> = ({ name, description, about }) => (
  <>
    <h3 className="investment-card__title">{name}</h3>
    <p className="investment-card__description">
      {shortFileName(description, 110)}
    </p>
    <p className="investment-card__about">{shortFileName(about, 50)}</p>
  </>
);

const CardFooter: React.FC<{
  userInvestment?: Invest;
  company: Company;
}> = ({ userInvestment, company }) =>
  userInvestment ? (
    <div className="investment-card__user-investment">
      <div className="investment-amount">
        <span className="amount">
          {formatTargetAmount(userInvestment.investAmount)}$
        </span>
        <span className="label">invested</span>
      </div>
    </div>
  ) : (
    <InvestmentProgress progress={company.calculateProgress()} />
  );

export default InvestmentCard;
