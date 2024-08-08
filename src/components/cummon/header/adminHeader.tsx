// AdminHeader.tsx
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useModal } from '../../../context/popupContext';

const AdminHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { openModal } = useModal();

  return (
    <div className="header__buttons">
      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </div>
  );
};

export default AdminHeader;
