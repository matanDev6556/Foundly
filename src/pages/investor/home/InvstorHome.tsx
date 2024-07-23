
import { LikesProvider } from '../../../context/LikesContext';
import GuestHome from '../../home/GuestHome';


const InvestorHome: React.FC = () => {
  return (
    <>
      <LikesProvider>
        <GuestHome />
      </LikesProvider>
    </>
  );
};

export default InvestorHome;
