import React, { useMemo } from 'react';
import noDataImg from '../../../assets/images/no_data.png';
import { useNavigate } from 'react-router-dom';
import Company from '../../../models/Company';
import NoData from '../../cummon/no-data/NoData';
import Button from '../../cummon/Button';
import { RoutePath } from '../../../utils/enums';
import InvestmentList from '../../cummon/invest-card/InvestList';
import { formatTargetAmount } from '../../../utils/functions';
import { useUserPurchedContext } from '../../../context/PurchedContext';
import './InvestmentsView.css'; // Make sure to create this CSS file

interface InvestmentsViewProps {
  companies: Company[];
  title: string;
  showUserInvestments?: boolean;
}

const InvestmentsView: React.FC<InvestmentsViewProps> = ({
  companies,
  title,
  showUserInvestments = false,
}) => {
  const navigate = useNavigate();
  const { userInvestments } = useUserPurchedContext();

  const totalInvestments = useMemo(() => 
    userInvestments.reduce((total, invest) => total + invest.investAmount, 0),
    [userInvestments]
  );

  if (companies.length === 0) {
    return <EmptyInvestmentsView />;
  }

  return (
    <PopulatedInvestmentsView
      title={title}
      totalInvestments={totalInvestments}
      companies={companies}
      showUserInvestments={showUserInvestments}
    />
  );
};

const EmptyInvestmentsView: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <NoData img={noDataImg} messeage={'No investments yet'} />
      <Button
        label={'Find Investments!'}
        onClick={() => navigate(RoutePath.SearchInvests)}
        color={'white'}
        backgroundColor={'#39958c'}
        borderColor={''}
      />
    </>
  );
};

const PopulatedInvestmentsView: React.FC<{
  title: string;
  totalInvestments: number;
  companies: Company[];
  showUserInvestments: boolean;
}> = ({ title, totalInvestments, companies, showUserInvestments }) => (
  <div className="investments-view">
    <div className="investments-header">
      <h2 className="investments-title">{title}</h2>
      <div className="total-investments">
        <span className="amount">{formatTargetAmount(totalInvestments)}$</span>
        <span className="label">Total Investments</span>
      </div>
    </div>
    <InvestmentList
      companies={companies}
      showUserInvestments={showUserInvestments}
    />
  </div>
);

export default InvestmentsView;
