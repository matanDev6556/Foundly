import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/popupContext';

const InvestorHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('myInvestments');
  };

  return (
    <>
      <button
        className={'header__button header_button--fill'}
        onClick={() => handleClick()}
      >
        My Investments
      </button>
      <button
        className={'header__button header_button--border'}
        onClick={() => {
          openModal('Profile');
        }}
      >
        My Profile
      </button>

      <FaBell size={25} color="#da678a" onClick={() => openModal('Profile')} />
      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </>
  );
};

export default InvestorHeader;
