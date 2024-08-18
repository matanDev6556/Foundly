import React, { useState } from 'react';
import MyNotification from '../../../models/Notification';
import { useUserDetails } from '../../../pages/investor/hooks/notifications/useUserDetailes';
import { formatTimestamp } from '../../../utils/functions';
import { ReplyForm } from './ReplayForm';
import './NotificationPanel.css';

interface NotificationItemProps {
  notification: MyNotification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const [replying, setReplying] = useState(false);
  const { user: replyReceiver, loading } = useUserDetails(
    notification.senderId
  );

  if (loading || !replyReceiver) {
    return null;
  }

  return (
    <div className="notification-item">
      <div className="notification-header">
        <span className="company-name">{replyReceiver.name}</span>
        <span className="notification-date">
          {formatTimestamp(notification.createdAt)}
        </span>
        <button
          className="button-notification"
          onClick={() => setReplying(true)}
        >
          Reply
        </button>
      </div>
      <div className="notification-body">
        <h3 className="notification-subject ">{notification.subject}</h3>
        <p className="notification-description">{notification.description}</p>
      </div>
      {replying && (
        <ReplyForm
          receiver={replyReceiver}
          onClose={() => setReplying(false)}
        />
      )}
    </div>
  );
};
