import React, { useEffect, useState } from "react";
import "./CompanyProfile.css";
import { useModal } from "../../../context/popupContext";
import { useParams, useLocation } from "react-router-dom";
import BuyInvest from "../../../components/company/company-profile/buy-invest/BuyInvest";
import { CompanyDetails } from "../../../components/company/company-profile/CompanyDetails";
import CompanyTopSection from "../../../components/cummon/companyPresentation/companyTopSection/CompanyTopSection";
import { YoutubeVideoSection } from "../../../components/cummon/youtubeVideoSection/YoutubeVideoSection";
import { useCompanyList } from "../../../context/CompanyListContext";
import { useUser } from "../../../context/UserContext";
import Company from "../../../models/Company";
import Modal from "../../../components/cummon/popup/modal";

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
          console.error("Company not found");
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
    setModalType("Buy");
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
      {modalType === "Buy" && user?.uid && (
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
