import { createContext, useContext, useEffect, useState } from 'react';
import Invest from '../models/Invest';
import { fetchForUser } from '../services/dbService';
import { useUser } from './UserContext';

interface PurchedContextType {
  userInvestments: Invest[];
}

const PurchedContext = createContext<PurchedContextType>({
  userInvestments: [],
});

export const PurchedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [userInvestments, setInvestments] = useState<Invest[]>([]);

  useEffect(() => {
    if (user && user.userType === 'Investor') {
      console.log('use effect : fetchUserInvestments');
      fetchForUser(
        'investments',
        'investorUid',
        user.uid,
        Invest.fromJson
      ).then(setInvestments);
    } else {
      console.log('use effect : set to Empty Investments');
      setInvestments([]);
    }
  }, []);

  useEffect(() => {
    console.log('investments:', userInvestments);
  }, [userInvestments]);

  return (
    <PurchedContext.Provider value={{ userInvestments }}>
      {children}
    </PurchedContext.Provider>
  );
};

export const useUserPurchedContext = () => useContext(PurchedContext);
