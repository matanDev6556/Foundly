import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useModal } from '../../../context/popupContext';
import Modal from '../../../components/cummon/popup/modal';
import Company from '../../../models/Company';
import BuyInvest from '../../../components/company/company-profile/buy-invest/BuyInvest';
import { useLocation, useParams } from 'react-router-dom';
import { useCompanyList } from '../../../context/CompanyListContext';

const CompanyProfile: React.FC = () => {
  const { setModalType, modalType } = useModal();
  const { user } = useUser();
  const { companyId } = useParams<{ companyId: string }>();
  const location = useLocation();
  const [company, setCompany] = useState<Company | null>(null);
  const { companies } = useCompanyList();

  useEffect(() => {
    const getCompany = () => {
      if (location.state?.company) {
        setCompany(location.state.company);
      } else if (companyId) {
        const foundCompany = companies.find((c) => c.uid === companyId);
        if (foundCompany) {
          setCompany(foundCompany);
        } else {
          console.error('Company not found');
        }
      }
    };

    getCompany();
  }, [companyId, location.state, companies]);

  if (!company) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    
    console.log(company.uid);
    setModalType('Buy');
  };

  return (
    <>
      <h1>company profile</h1>
      <button onClick={handleBuy}>buy now</button>
      {modalType === 'Buy' && user?.uid && (
        <Modal>
          <BuyInvest
            investorUid={user.uid}
            companyUid={company.uid}
            minInvest={company.raiseDetails.minInvestment}
          />
        </Modal>
      )}
    </>
  );
};

export default CompanyProfile;
