import React, { useEffect, useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useModal } from '../../../context/popupContext';
import Modal from '../../../components/cummon/popup/modal';
import Company from '../../../models/Company';
import BuyInvest from '../../../components/company/company-profile/buy-invest/BuyInvest';
import { useLocation, useParams } from 'react-router-dom';
import { useCompanyList } from '../../../context/CompanyListContext';
import { CompanyTopSection } from '../../../components/cummon/companyPresentation/companyTopSection/CompanyTopSection';
import { YoutubeVideoSection } from '../../../components/cummon/youtubeVideoSection/YoutubeVideoSection';
import { CompanyDetails } from '../../../components/company/company-profile/CompanyDetails';
import './CompanyProfile.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        setCompany(Company.fromJson(location.state.company));
      } else if (companyId) {
        const foundCompany = companies.find((c) => c.uid === companyId);
        if (foundCompany) {
          setCompany(Company.fromJson(foundCompany));
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
    if (user) {
      console.log(company.uid);
      setModalType('Buy');
    } else {
      toast.warning('Please login for Buy investments!');
    }
  };

  return (
    <>
      <CompanyTopSection company={company} />
      <YoutubeVideoSection
        youtubeVideoAddress={company.companyDetails.promoVideoLink}
      />
      <CompanyDetails company={company} />
      <div className="center-button-container">
        <button className="custom-button" onClick={handleBuy}>
          I want to invest!
        </button>
      </div>
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
