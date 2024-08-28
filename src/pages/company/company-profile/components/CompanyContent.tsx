import React from 'react';
import { CompanyDetails } from '../../../../components/company/company-profile/CompanyDetails';
import CompanyTopSection from '../../../../components/company/company-profile/companyPresentation/companyTopSection/CompanyTopSection';
import { YoutubeVideoSection } from '../../../../components/company/company-profile/youtubeVideoSection/YoutubeVideoSection';
import Company from '../../../../models/Company';

interface CompanyContentProps {
  company: Company;
}

const CompanyContent: React.FC<CompanyContentProps> = ({ company }) => (
  <>
    <CompanyTopSection company={company} />
    <YoutubeVideoSection
      youtubeVideoAddress={company.companyDetails.promoVideoLink}
    />
    <CompanyDetails company={company} />
  </>
);

export default CompanyContent;
