import { useState, useEffect, useMemo } from 'react';
import Company from '../../../models/Company';
import Investor from '../../../models/Investor';
import { fetchForUser } from '../../../services/dbService';


type TableUser = Investor | Company;

export const useUsersManagement = (limitedRowsCount: number) => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<TableUser[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedInvestors = await fetchForUser('users', 'userType', 'Investor', Investor.fromJSON);
        const fetchedCompanies = await fetchForUser('users', 'userType', 'Company', Company.fromJSON);
        setInvestors(fetchedInvestors);
        setCompanies(fetchedCompanies);
        setDisplayedUsers([...fetchedInvestors, ...fetchedCompanies].slice(0, limitedRowsCount));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    loadUsers();
  }, [limitedRowsCount]);

  const toggleUsersDisplay = () => {
    if (showAllUsers) {
      setDisplayedUsers([...investors, ...companies].slice(0, limitedRowsCount));
    } else {
      setDisplayedUsers([...investors, ...companies]);
    }
    setShowAllUsers(!showAllUsers);
  };

  const columns = useMemo(() => [
    {
      header: 'שם משתמש',
      render: (user: TableUser) => user.name,
    },
    {
      header: 'סוג',
      render: (user: TableUser) => user.userType,
    },
    {
      header: 'אימייל',
      render: (user: TableUser) => user.email,
    },
    {
      header: 'פרטים נוספים',
      render: (user: TableUser) => {
        if (user instanceof Company) {
          return `${user.companyDetails.category}, ${user.raiseDetails.currentInvestmentsAmount}₪ הושקעו`;
        } else if (user instanceof Investor) {
          return user.preferences.categories.join(', ');
        }
        return '';
      },
    },
  ], []);

  return {
    investors,
    companies,
    displayedUsers,
    showAllUsers,
    toggleUsersDisplay,
    columns,
  };
};