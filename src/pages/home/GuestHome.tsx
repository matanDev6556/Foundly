import { deleteApp } from 'firebase/app';
import InvestmentsSection from '../../components/home/Investor/body-section/InvestmentSection';
import FirstSection from '../../components/home/Investor/first-section/FirstSection';

const GuestHome: React.FC = () => {
  return (
    <>
      <FirstSection />
      <InvestmentsSection />
    </>
  );
};

export default GuestHome;
