// InvestmentLogo.tsx
import React from 'react';

interface InvestmentLogoProps {
  logo: string;
  companyName: string;
  image: string;
}

const InvestmentLogo: React.FC<InvestmentLogoProps> = ({ logo, companyName, image }) => (
  <div>
    <div className="investment-card__logo">
      <img src={logo} alt={`${companyName} logo`} className="investment-card__logo-image" />
    </div>
    <img src={image} alt={companyName} className="investment-card__image" />
  </div>
);

export default InvestmentLogo;