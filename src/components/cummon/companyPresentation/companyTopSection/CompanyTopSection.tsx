import React, { useEffect } from "react";
import Company from "../../../../models/Company";
import { formatTargetAmount } from "../../../../utils/functions";
import InvestmentProgress from "../../invest-card/InvestProgress";
import "./CompanyTopSection.css";

interface BuyInvestProps {
  company: Company;
}

export const CompanyTopSection: React.FC<BuyInvestProps> = ({ company }) => {
  const { companyDetails, raiseDetails } = company;

  useEffect(() => {
    console.log(company.calculateProgress);
  }, [company]);

  return (
    <div className="company-top-section1">
      <div className="investment-card1">
        <div className="left-side">
          <div className="investment-card__image1">
            <img src={companyDetails.image} alt="H2OLL Project" />
          </div>
          <div className="investment-card__progress-content1">
            <div className="investment-card__progress-bar1">
              <InvestmentProgress progress={company.calculateProgress()} />
            </div>
            <p className="investment-card__investment1">
              {formatTargetAmount(raiseDetails.targetAmount)}$ already invested!
            </p>
          </div>
        </div>
        <div className="investment-card__content1">
          <div className="investment-card__header1">
            <img
              src={companyDetails.logo}
              alt="H2OLL Logo"
              className="investment-card__logo1"
            />
            <h2 className="investment-card__title1">{company.name}</h2>
            <span className="investment-card__badge1">
              {company.companyDetails.category}
            </span>
          </div>
          <p className="investment-card__description1">
            {companyDetails.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyTopSection;
