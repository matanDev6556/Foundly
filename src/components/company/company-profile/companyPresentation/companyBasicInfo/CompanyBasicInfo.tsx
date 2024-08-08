import Company from '../../../../../models/Company';
import './CompanyBasicInfo.css';
interface props {
  company: Company;
}

export const CompanyBasicInfo: React.FC<props> = ({ company }) => {
  return (
    <>
      <div className="info-section">
        <h2>Info</h2>
        <p>
          <strong>Country:</strong> {company.companyDetails.country}
        </p>
        <p>
          <strong>Web:</strong>{' '}
          <a href={company.companyDetails.website} target="_blank">
            {company.companyDetails.website}
          </a>
        </p>
        <p>
          <strong>Registered As company:</strong>{' '}
          {company.companyDetails.registrarOfCompanies ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Minimum Investment:</strong>{' '}
          {company.raiseDetails.minInvestment}
        </p>
      </div>
    </>
  );
};
