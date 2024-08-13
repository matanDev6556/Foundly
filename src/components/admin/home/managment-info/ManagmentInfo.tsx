import React, { useMemo } from "react";
import "./ManagementInfo.css";
import Investor from "../../../../models/Investor";
import Company from "../../../../models/Company";
import { formatTargetAmount } from "../../../../utils/functions";

interface ManagementInfoProps {
  investors: Investor[];
  companies: Company[];
}

const ManagementInfo: React.FC<ManagementInfoProps> = ({
  investors,
  companies,
}) => {
  const info = useMemo(() => {
    // Calculate the total investment amount
    const totalInvestment = companies.reduce((sum, company) => {
      const amount =
        typeof company.raiseDetails.currentInvestmentsAmount === "number"
          ? company.raiseDetails.currentInvestmentsAmount
          : parseFloat(company.raiseDetails.currentInvestmentsAmount) || 0;
      return sum + amount;
    }, 0);

    return [
      { value: `${formatTargetAmount(totalInvestment)}$`, label: "Invested" },
      { value: companies.length.toString(), label: "Companies" },
      { value: investors.length.toString(), label: "Investors" },
    ];
  }, [investors, companies]);

  return (
    <div className="stats-container">
      {info.map((infoItem, index) => (
        <InfoCard key={index} value={infoItem.value} label={infoItem.label} />
      ))}
    </div>
  );
};

interface InfoCardProps {
  value: string;
  label: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ value, label }) => (
  <div className="stat-card">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export default ManagementInfo;
