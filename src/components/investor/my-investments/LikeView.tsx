import React from 'react';
import noDataImg from '../../../assets/images/no_data.png';
import { useNavigate } from 'react-router-dom';
import Company from '../../../models/Company';
import { RoutePath } from '../../../utils/enums';
import NoData from '../../cummon/NoData';
import InvestmentList from '../../cummon/invest-card/InvestList';
import Button from '../../cummon/Button';

interface LikeViewProps {
  companies: Company[];
  title: string;
}

const LikeView: React.FC<LikeViewProps> = ({ companies, title }) => {
  const nagivate = useNavigate();
  if (companies.length == 0) {
    return (
      <>
        <NoData img={noDataImg} messeage={'לא שמרת אף השקעה'} />
        <Button
          label={'Find Investments!'}
          onClick={() => nagivate(RoutePath.SearchInvests)}
          color={'white'}
          backgroundColor={'#39958c'}
          borderColor={''}
        />
      </>
    );
  }
  return (
    <div>
      <h2 style={{ color: '#728f9e' }}>{title}</h2>
      <InvestmentList companies={companies} />
    </div>
  );
};

export default LikeView;
