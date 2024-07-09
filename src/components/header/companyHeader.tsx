// CompanyHeader.tsx
import React from 'react';
import { useModal } from '../../context/popupContext';
import { FaSignOutAlt } from 'react-icons/fa';

const CompanyHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { openModal } = useModal();

  return (
    <>
      <button
        className="header__button header_button--fill "
        onClick={() => openModal('Dashboard')}
      >
        Dashboard
      </button>
      <button
        className="header__button header_button--border"
        onClick={() => {
          openModal('Profile');
        }}
      >
        Profile
      </button>
      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </>
  );
};

export default CompanyHeader;
