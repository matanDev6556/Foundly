import React, { useState } from 'react';
import { useModal } from '../../context/popupContext';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';

const InvestorHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { openModal } = useModal();
  const [activeBttn, setActiveBttn] = useState('');

  return (
    <>
      <button
        className={`header__button header_button--${
          activeBttn === 'MyInvestment' ? 'fill' : 'border'
        }`}
        onClick={() => {
          setActiveBttn('MyInvestment');
          openModal('My Investment');
        }}
      >
        My Investments
      </button>
      <button
        className={`header__button header_button--${
          activeBttn === 'Profile' ? 'fill' : 'border'
        }`}
        onClick={() => {
          setActiveBttn('Profile');
          openModal('Profile');
        }}
      >
        My Profile
      </button>
     
      <FaBell size={25} color="#da678a" />
      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </>
  );
};

export default InvestorHeader;
