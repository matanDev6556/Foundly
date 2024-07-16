// src/context/AppStatusContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppStatusContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: (error: string | null) => void;
}

const AppStatusContext = createContext<AppStatusContextProps | undefined>(
  undefined
);

export const AppStatusProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  const setError = (error: string | null) => {
    setErrorState(error);
    if (error) {
      toast.error(error);
    }
  };

  return (
    <AppStatusContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </AppStatusContext.Provider>
  );
};

export const useAppStatus = (): AppStatusContextProps => {
  const context = useContext(AppStatusContext);
  if (!context) {
    throw new Error('useAppStatus must be used within an AppStatusProvider');
  }
  return context;
};
