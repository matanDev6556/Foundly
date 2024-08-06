import React from 'react';
import OpenAll from '../../components/cummon/open-all/OpenAll';
import ManagmentInfo from '../../components/admin/home/managment-info/ManagmentInfo';

import { useUsersManagement } from './hooks/useUsersManagement';
import { useLastInvestments } from './hooks/useLastInvestments';
import GenericUsersTable from '../../components/admin/home/users-table/GenericTable';
import LastInvestmentsChart from '../../components/admin/home/LastInvestmentChart';

const AdminHome: React.FC = () => {
  const limitedRowsCount = 4;
  const {
    investors,
    companies,
    displayedUsers,
    showAllUsers,
    toggleUsersDisplay,
    columns: userColumns,
  } = useUsersManagement(limitedRowsCount);

  const {
    displayedInvestments,
    showAllInvestments,
    toggleInvestmentsDisplay,
    columns: investmentColumns,
  } = useLastInvestments(limitedRowsCount);

  const totalUsers = investors.length + companies.length;
  const totalInvestments = displayedInvestments.length;

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
          showAllUsers || totalUsers < limitedRowsCount ? 'פחות' : 'הכל'
        }
      />
      <GenericUsersTable
        isUserTable={true}
        data={displayedUsers}
        columns={userColumns}
      />

      <OpenAll
        title={'Last Investments'}
        onClick={toggleInvestmentsDisplay}
        buttonText={
          showAllInvestments || totalInvestments > limitedRowsCount
            ? 'הכל'
            : 'פחות'
        }
      />
      <GenericUsersTable
        data={displayedInvestments}
        columns={investmentColumns}
      />
      <OpenAll title={'Chart'} onClick={() => {}} buttonText={''} />
      <LastInvestmentsChart investments={displayedInvestments} />
    </>
  );
};

export default AdminHome;
