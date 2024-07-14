import InvestmentsSection from '../../../components/home/Investor/body-section/InvestmentSection';
import FirstSection from '../../../components/home/Investor/first-section/FirstSection';
import { useUser } from '../../../context/UserContext';
import { UserType } from '../../../utils/enums';

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <>
          {user.userType === UserType.Admin && <h1>Admin Dashboard</h1>}
          {user.userType === UserType.Investor && (
            <>
              <FirstSection />
              <InvestmentsSection />
            </>
          )}
          {user.userType === UserType.Company && (
            <>{/* Company-specific components */}</>
          )}
        </>
      ) : (
        <>
          <FirstSection />
          <InvestmentsSection />
        </>
      )}
    </>
  );
};

export default Home;
