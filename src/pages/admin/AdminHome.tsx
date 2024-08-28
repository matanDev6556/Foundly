import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersManagement } from './hooks/useUsersManagement';
import { useLastInvestments } from './hooks/useLastInvestments';
import { RoutePath } from '../../utils/enums';
import { deleteDocument } from '../../services/dbService';
import Company from '../../models/Company';
import Modal from '../../components/cummon/popup/modal';
import AdminNotification from '../../components/admin/home/notifications/Notifications';
import ManagmentInfo from '../../components/admin/home/managment-info/ManagmentInfo';
import { SearchSection } from './components/SearchSection';
import { UsersTable } from './components/UsersTable';
import { InvestmentsSection } from './components/InvestmentsSection';
import { StatisticalDashboard } from './components/StatisticalDashboard';
import { styles } from './styles';

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  const limitedRowsCount = 3;
  const usersManagement = useUsersManagement(limitedRowsCount);
  const investmentsManagement = useLastInvestments(limitedRowsCount);

  
  const calculateDashboardData = () => {
    return {
      newUsers:
        usersManagement.investors.length + usersManagement.companies.length,
      newCompanies: usersManagement.companies.length,
      newInvestors: usersManagement.investors.length,
      totalInvestments: investmentsManagement.displayedInvestments.reduce(
        (sum, inv) => sum + inv.investAmount,
        0
      ),
      averageInvestment:
        investmentsManagement.displayedInvestments.length > 0
          ? investmentsManagement.displayedInvestments.reduce(
              (sum, inv) => sum + inv.investAmount,
              0
            ) / investmentsManagement.displayedInvestments.length
          : 0,
    };
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק משתמש זה?')) {
      try {
        await deleteDocument('users', userId);
        usersManagement.deleteUser(userId);
      } catch (error) {
        console.error('שגיאה במחיקת משתמש:', error);
        alert('שגיאה במחיקת משתמש. אנא נסה שוב.');
        usersManagement.reloadUsers();
      }
    }
  };

  const handleUserRowClick = (user: any) => {
    if (user instanceof Company) {
      navigate(`${RoutePath.CompanyProfile}/${user.uid}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Panel Management</h1>

      <ManagmentInfo
        investors={usersManagement.investors}
        companies={usersManagement.companies}
      />
      <SearchSection
        searchTerm={usersManagement.searchTerm}
        setSearchTerm={usersManagement.setSearchTerm}
        selectedUserType={usersManagement.selectedUserType}
        handleUserTypeChange={usersManagement.handleUserTypeChange}
      />
      <UsersTable
        {...usersManagement}
        handleDeleteUser={handleDeleteUser}
        handleUserRowClick={handleUserRowClick}
        limitedRowsCount={limitedRowsCount}
      />
      <InvestmentsSection
        {...investmentsManagement}
        limitedRowsCount={limitedRowsCount}
      />
      <h2 style={{ textAlign: 'center', color: '#728f9e' }}>Statistics</h2>
      <div
        style={{
          backgroundColor: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <StatisticalDashboard
          data={calculateDashboardData()}
          investments={investmentsManagement.displayedInvestments}
        />
      </div>
      {usersManagement.modalType === 'Notifications' &&
        usersManagement.selectedUserId && (
          <Modal>
            <AdminNotification
              receiverId={usersManagement.selectedUserId}
              onSendNotification={usersManagement.handleSendNotification}
            />
          </Modal>
        )}
    </div>
  );
};

export default AdminHome;
