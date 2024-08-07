import MiddleSection from "../../../components/company/CompanyHome/MiddleSection/MiddleSection";
import RecentActivitySection from "../../../components/company/CompanyHome/RecentActivitySection/RecentActivitySection";
import CompanyTopSection from "../../../components/cummon/companyPresentation/companyTopSection/CompanyTopSection";
import { useUser } from "../../../context/UserContext";
import Company from "../../../models/Company";


const CompanyHome: React.FC = () => {
  const {user} = useUser();
  const company = user as Company;  
  return (
      <>
        <CompanyTopSection company={company}/>
        <MiddleSection/>
        <RecentActivitySection/>
      </>
    );
  };
  
  export default CompanyHome;