// CompanyHeader.tsx
import React from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useModal } from "../../../context/popupContext";
import Modal from "../popup/modal";
import StepperForm from "../../auth/CompanySignUpForm/StepperForm";
import NotificationPanel from "../notificationPanel/NotificationPanel";

const CompanyHeader: React.FC<{ handleLogout: () => void }> = ({
  handleLogout,
}) => {
  const { setModalType, modalType } = useModal();

  return (
    <>
      <button
        className="header__button header_button--border"
        onClick={() => {
          setModalType("Profile");
        }}
      >
        Profile
      </button>

      {modalType === "Profile" && (
        <Modal>
          <StepperForm />
        </Modal>
      )}
      <FaBell
        size={25}
        color="#da678a"
        onClick={() => setModalType("Notifications")}
      />
      {modalType === "Notifications" && (
        <Modal>
          <NotificationPanel />
        </Modal>
      )}
      <FaSignOutAlt size={25} color="#da678a" onClick={handleLogout} />
    </>
  );
};

export default CompanyHeader;
