// AdminHeader.tsx
import React from 'react';
import { useModal } from '../../context/popupContext';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { openModal } = useModal();

  return (
    <div className="header__buttons">
      <button
        className="header__button header_button--fill"
        onClick={() => openModal('Admin Panel')}
      >
        Admin Panel
      </button>
      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </div>
  );
};

export default AdminHeader;
