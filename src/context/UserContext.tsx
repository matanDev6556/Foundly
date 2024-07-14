import React, { createContext, useContext, useState, useEffect } from 'react';
import User from '../models/User';
import Investor from '../models/Investor';
import Admin from '../models/Admin';
import Company from '../models/Company';
import { handleAuthStateChanged } from '../services/authService';

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | Investor | Company | Admin | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = handleAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    console.log('user:', user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
