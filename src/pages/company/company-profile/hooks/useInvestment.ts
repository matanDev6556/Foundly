import { useState } from 'react';
import { toast } from 'react-toastify';
import { useUser } from '../../../../context/UserContext';
import { useModal } from '../../../../context/popupContext';

export const useInvestment = () => {
  const { setModalType, openModal } = useModal();
  const { user } = useUser();
  const [showBuyModal, setShowBuyModal] = useState(false);

  const handleBuy = () => {
    if (!user) {
      toast.warning('אנא התחבר כדי לבצע השקעות!');
      openModal('Login');
      return;
    }
    setModalType('Buy');
    setShowBuyModal(true);
  };

  return { handleBuy, showBuyModal };
};
