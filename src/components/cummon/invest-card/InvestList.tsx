// src/components/investment-list/InvestmentList.tsx
import React from 'react';
import InvestmentCard from '../invest-card/InvestmentCard';
import Company from '../../../models/Company';


interface InvestmentListProps {
  companies: Company[];
}

const InvestmentList: React.FC<InvestmentListProps> = ({ companies }) => {
  return (
    <>
      <div className="all-investments__list">
        {companies.map((company) => (
          <InvestmentCard key={company.uid} company={company} />
        ))}
      </div>
    </>
  );
};

export default InvestmentList;
