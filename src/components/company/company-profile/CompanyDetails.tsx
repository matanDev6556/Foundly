import Company from "../../../models/Company";
import { CompanyBasicInfo } from "../../cummon/companyPresentation/companyBasicInfo/CompanyBasicInfo";
import { CompanyContact } from "../../cummon/companyPresentation/companyContact/CompanyContact";
import { CompanyDocs } from "../../cummon/companyPresentation/companyDocs/CompanyDocs";
import "./CompanyDetails.css";
interface props {
  company: Company;
}
export const CompanyDetails: React.FC<props> = ({ company }) => {
  return (
    <>
      <div className="details-container">
        <div className="docs-container company-section">
          <CompanyDocs company={company} />
        </div>
        <div className="separator"></div>
        <div className="info-container company-section">
          <CompanyBasicInfo company={company} />
        </div>
        <div className="separator"></div>
        <div className="contact-container company-section">
          <CompanyContact companyId={company.uid} />
        </div>
      </div>
    </>
  );
};
