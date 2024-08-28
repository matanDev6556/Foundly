import React from 'react';
import OpenAll from '../../../components/cummon/open-all/OpenAll';
import GenericUsersTable from '../../../components/cummon/users-table/GenericTable';
import { styles } from '../styles';

interface InvestmentsSectionProps {
  displayedInvestments: any[];
  showAllInvestments: boolean;
  toggleInvestmentsDisplay: () => void;
  columns: any[];
  limitedRowsCount: number;
}

export const InvestmentsSection: React.FC<InvestmentsSectionProps> = ({
  displayedInvestments,
  showAllInvestments,
  toggleInvestmentsDisplay,
  columns,
  limitedRowsCount,
}) => (
  <>
    <OpenAll
      title={'Recent Investments'}
      onClick={toggleInvestmentsDisplay}
      buttonText={showAllInvestments ? 'Less' : 'All'}
    />
    <div style={styles.tableContainer}>
      <GenericUsersTable
        data={displayedInvestments}
        columns={columns}
      />
    </div>
  </>
);