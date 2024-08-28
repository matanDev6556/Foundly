import React from 'react';
import OpenAll from '../../../components/cummon/open-all/OpenAll';
import GenericUsersTable from '../../../components/cummon/users-table/GenericTable';
import { styles } from '../styles';

interface UsersTableProps {
  displayedUsers: any[];
  showAllUsers: boolean;
  toggleUsersDisplay: () => void;
  columns: any[];
  handleDeleteUser: (userId: string) => void;
  handleUserRowClick: (user: any) => void;
  handleNotificationClick: (userId: string) => void;
  limitedRowsCount: number;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  displayedUsers,
  showAllUsers,
  toggleUsersDisplay,
  columns,
  handleDeleteUser,
  handleUserRowClick,
  handleNotificationClick,
}) => (
  <div style={styles.tableContainer}>
    <OpenAll
      title={'Users'}
      onClick={toggleUsersDisplay}
      buttonText={showAllUsers ? 'Less' : 'All'}
    />
    <GenericUsersTable
      isUserTable={true}
      isAdmin={true}
      data={displayedUsers}
      columns={columns}
      onDelete={handleDeleteUser}
      onRowClick={handleUserRowClick}
      onNotificationClick={handleNotificationClick}
    />
  </div>
);
