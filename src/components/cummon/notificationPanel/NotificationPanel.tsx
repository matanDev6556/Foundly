import { useEffect, useState } from "react";
import { fetchForUser, fetchUserFromDb } from "../../../services/dbService";

import MyNotification from "../../../models/Notification";
import { useUser } from "../../../context/UserContext";
import { useAppStatus } from "../../../context/AppStatusContext";
import { ClipLoader } from "react-spinners";
import { useCompanyList } from "../../../context/CompanyListContext";
import Company from "../../../models/Company";
import React from "react";
import { formatTimestamp } from "../../../utils/functions";
import "./NotificationPanel.css";
import { Contact } from "../contact/Contact";
import User from "../../../models/User";
import Investor from "../../../models/Investor";

export const NotificationPanel: React.FC = () => {
  const { companies } = useCompanyList();
  const { user } = useUser();
  const [replying, setReplying] = useState(false);
  const [replyReceiver, setReplyReceiver] = useState<User | null>();
  const [notifications, setNotifications] = useState<MyNotification[]>([]);
  const { setLoading, loading } = useAppStatus();

  const getReceiversDetails = (uid: string) => {
    const setReceiver = async () => {
      return await fetchUserFromDb(uid).then((user) => setReplyReceiver(user));
    };
    setReceiver();
  };

  const handleReplyClick = (
    receiver: User,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setReplyReceiver(receiver);
    setReplying(true);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const result = await fetchForUser(
          "notifications",
          "reciverId",
          user?.uid as string,
          MyNotification.fromJson
        );
        setNotifications(result);
        setLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user?.uid]);

  return (
    <>
      {loading ? (
        <ClipLoader color="#46968c" loading={loading} size={50} />
      ) : replying ? (
        <div style={{ marginRight: "25px", textAlign: "center" }}>
          <label>Reply to {replyReceiver?.name}</label>
          <Contact receiver={replyReceiver!} isReply={true} />
        </div>
      ) : notifications.length > 0 ? (
        notifications.map((n, index) => {
          getReceiversDetails(n.senderId);

          return (
            <React.Fragment key={index}>
              {replyReceiver && (
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginBottom: "15px",
                    marginTop: "15px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <label
                    style={{
                      color: `var(--primary-color)`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {replyReceiver.name + " , " + formatTimestamp(n.createdAt)}
                  </label>
                  <button
                    className="button-notification"
                    type="submit"
                    onClick={(e) => handleReplyClick(replyReceiver, e)}
                  >
                    Reply
                  </button>
                  <div style={{ margin: "10px 0" }}></div>
                  <label>{n.subject}</label>
                  <div
                    style={{ borderTop: "1px solid #ddd", margin: "10px 0" }}
                  ></div>
                  <div style={{ padding: "5px" }}></div>
                  <label style={{ fontSize: "15px" }}>{n.description}</label>
                </div>
              )}
            </React.Fragment>
          );
        })
      ) : (
        <label>No notifications available</label>
      )}
    </>
  );
};

export default NotificationPanel;
