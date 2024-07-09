// src/context/AppStatusContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppStatusContextProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppStatusContext = createContext<AppStatusContextProps | undefined>(
  undefined
);

export const AppStatusProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
