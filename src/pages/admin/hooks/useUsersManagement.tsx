import { useState, useEffect, useMemo, useCallback } from 'react';
import Company from '../../../models/Company';
import Investor from '../../../models/Investor';
import { fetchForUser, saveToDb } from '../../../services/dbService';
import { useModal } from '../../../context/popupContext';
import Notification from '../../../models/Notification';

type TableUser = Investor | Company;

export const useUsersManagement = (limitedRowsCount: number) => {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<TableUser[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { setModalType, modalType } = useModal();

  const loadUsers = useCallback(async () => {
    try {
      const fetchedInvestors = await fetchForUser(
        'users',
        'userType',
        'Investor',
        Investor.fromJson
      );
      const fetchedCompanies = await fetchForUser(
        'users',
        'userType',
        'Company',
        Company.fromJson
      );
      setInvestors(fetchedInvestors);
      setCompanies(fetchedCompanies);
      updateDisplayedUsers(fetchedInvestors, fetchedCompanies);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateDisplayedUsers = useCallback(
    (currentInvestors: Investor[], currentCompanies: Company[]) => {
      const allUsers = [...currentInvestors, ...currentCompanies];
      setDisplayedUsers(
        showAllUsers ? allUsers : allUsers.slice(0, limitedRowsCount)
      );
    },
    [showAllUsers, limitedRowsCount]
  );

  useEffect(() => {
    updateDisplayedUsers(investors, companies);
  }, [investors, companies, updateDisplayedUsers]);

  const toggleUsersDisplay = useCallback(() => {
    setShowAllUsers((prev) => !prev);
  }, []);

  const deleteUser = useCallback((userId: string) => {
    setInvestors((prev) => prev.filter((inv) => inv.uid !== userId));
    setCompanies((prev) => prev.filter((comp) => comp.uid !== userId));
  }, []);

  const handleNotificationClick = useCallback(
    (userId: string) => {
      setSelectedUserId(userId);
      setModalType('Notifications');
    },
    [setModalType]
  );

  const handleSendNotification = useCallback(
    async (userId: string, subject: string, description: string) => {
      try {
        const notification = new Notification(userId, subject, description);
        await saveToDb('notifications', null, notification);
        alert('Notification sent successfully!');
        setModalType('');
      } catch (error) {
        console.error('Error sending notification:', error);
        alert('Error sending notification. Please try again.');
      }
    },
    [setModalType]
  );

  const columns = useMemo(
    () => [
      {
        header: 'Username',
        render: (user: TableUser) => user.name,
      },
      {
        header: 'Type',
        render: (user: TableUser) => user.userType,
      },
      {
        header: 'Email',
        render: (user: TableUser) => user.email,
      },
      {
        header: 'Additional Details',
        render: (user: TableUser) => {
          if (user instanceof Company) {
            return `${user.companyDetails.category}, ${user.raiseDetails.currentInvestmentsAmount}₪ invested`;
          } else if (user instanceof Investor) {
            return user.preferences.categories.join(', ');
          }
          return '';
        },
      },
    ],
    []
  );

  return {
    investors,
    companies,
    displayedUsers,
    showAllUsers,
    toggleUsersDisplay,
    deleteUser,
    columns,
    reloadUsers: loadUsers,
    handleNotificationClick,
    handleSendNotification,
    selectedUserId,
    modalType,
  };
};
