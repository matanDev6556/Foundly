import React, { useState } from 'react';
import { useModal } from '../../context/popupContext';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';

const InvestorHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { openModal } = useModal();

  return (
    <>
      <button
        className={'header__button header_button--fill'}
        onClick={() => {}}
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
