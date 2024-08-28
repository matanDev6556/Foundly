import { useAppStatus } from '../../../context/AppStatusContext';
import React from 'react';
import { useNotifications } from '../../../context/NotificationsContext';
import { NotificationItem } from './NotificationItem';
import './NotificationPanel.css';
import Loading from '../loading/Loading';

export const NotificationPanel: React.FC = () => {
  const { notifications } = useNotifications();
  const { loading } = useAppStatus();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="notification-panel">
      <h1 style={{ color: '#728f9e' }}>
        Notifications: {notifications.length}
      </h1>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default NotificationPanel;
