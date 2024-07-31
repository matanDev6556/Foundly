import InvestmentsSection from '../../components/investor/home/body-section/InvestmentSection';
import FirstSection from '../../components/investor/home/first-section/FirstSection';
import { PurchedProvider } from '../../context/PurchedContext';

const GuestHome: React.FC = () => {
  return (
    <>
      <FirstSection />
      <InvestmentsSection />
    </>
  );
};

export default GuestHome;
