import React from 'react';
import BuyInvest from '../../../../components/company/company-profile/buy-invest/BuyInvest';
import { useUser } from '../../../../context/UserContext';
import Company from '../../../../models/Company';
import Modal from '../../../../components/cummon/popup/modal';

interface BuyInvestModalProps {
  company: Company;
  show: boolean;
}

const BuyInvestModal: React.FC<BuyInvestModalProps> = ({ company, show }) => {
  const { user } = useUser();

  if (!show || !user?.uid) return null;

  return (
    <Modal>
      <BuyInvest
        investorUid={user.uid}
        companyUid={company.uid}
        minInvest={company.raiseDetails.minInvestment}
      />
    </Modal>
  );
};

export default BuyInvestModal;
