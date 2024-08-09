import React from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAll from '../../components/cummon/open-all/OpenAll';
import ManagmentInfo from '../../components/admin/home/managment-info/ManagmentInfo';
import { useUsersManagement } from './hooks/useUsersManagement';
import { useLastInvestments } from './hooks/useLastInvestments';
import GenericUsersTable from '../../components/cummon/users-table/GenericTable';
import LastInvestmentsChart from '../../components/admin/home/LastInvestmentChart';
import { deleteDocument } from '../../services/dbService';
import Company from '../../models/Company';
import { RoutePath } from '../../utils/enums';
import Modal from '../../components/cummon/popup/modal';
import AdminNotification from '../../components/admin/home/notifications/Notifications';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const limitedRowsCount = 4;
  const {
    investors,
    companies,
    displayedUsers,
    showAllUsers,
    toggleUsersDisplay,
    deleteUser,
    columns: userColumns,
    reloadUsers,
    handleNotificationClick,
    handleSendNotification,
    selectedUserId,
    modalType,
  } = useUsersManagement(limitedRowsCount);

  const {
    displayedInvestments,
    showAllInvestments,
    toggleInvestmentsDisplay,
    columns: investmentColumns,
  } = useLastInvestments(limitedRowsCount);

  const totalUsers = investors.length + companies.length;
  const totalInvestments = displayedInvestments.length;

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteDocument('users', userId);
        deleteUser(userId);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
        reloadUsers();
      }
    }
  };

  const handleUserRowClick = (user: any) => {
    if (user instanceof Company) {
      navigate(`${RoutePath.CompanyProfile}/${user.uid}`);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#728f9e' }}>
        Management Panel
      </h1>
      <ManagmentInfo investors={investors} companies={companies} />

      <OpenAll
        title={'Users'}
        onClick={toggleUsersDisplay}
        buttonText={
          showAllUsers || totalUsers <= limitedRowsCount ? 'Less' : 'All'
        }
      />
      <GenericUsersTable
        isUserTable={true}
        isAdmin={true}
        data={displayedUsers}
        columns={userColumns}
        onDelete={handleDeleteUser}
        onRowClick={handleUserRowClick}
        onNotificationClick={handleNotificationClick}
      />

      <OpenAll
        title={'Last Investments'}
        onClick={toggleInvestmentsDisplay}
        buttonText={
          showAllInvestments || totalInvestments <= limitedRowsCount
            ? 'All'
            : 'Less'
        }
      />
      <GenericUsersTable
        data={displayedInvestments}
        columns={investmentColumns}
      />
      <OpenAll title={'Chart'} onClick={() => {}} buttonText={''} />
      <LastInvestmentsChart investments={displayedInvestments} />

      {modalType === 'Notifications' && selectedUserId && (
        <Modal>
          <AdminNotification
            userId={selectedUserId}
            onSendNotification={handleSendNotification}
          />
        </Modal>
      )}
    </>
  );
};

export default AdminHome;