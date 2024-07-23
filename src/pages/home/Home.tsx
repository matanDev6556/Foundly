import { useUser } from '../../context/UserContext';
import { UserType } from '../../utils/enums';
import InvestorHome from '../investor/home/InvstorHome';
import GuestHome from './GuestHome';


const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <>
          {user.userType === UserType.Admin && <h1>Admin Dashboard</h1>}
          {user.userType === UserType.Investor && <InvestorHome />}
          {user.userType === UserType.Company && <h1>Company Home</h1>}
        </>
      ) : (
        <GuestHome />
      )}
    </>
  );
};

export default Home;
