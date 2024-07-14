// src/Providers.tsx
import React from 'react';
import { UserProvider } from './context/UserContext';
import { AppStatusProvider } from './context/AppStatusContext';
import { ModalProvider } from './context/popupContext';
import { LikesProvider } from './context/LikesContext';
import { useUser } from './context/UserContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const CommonProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AppStatusProvider>
      <ModalProvider>
        <UserProvider>{children}</UserProvider>
      </ModalProvider>
    </AppStatusProvider>
  );
};

export const InvestorProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <LikesProvider>
    {children}
    </LikesProvider>
  );
};

export const CompanyProviders: React.FC<ProvidersProps> = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export const AppProviders: React.FC<ProvidersProps> = ({ children }) => {
  const { user } = useUser();

  const Providers: React.FC<ProvidersProps> = ({ children }) => {
    if (user?.userType === 'Investor') {
      return <InvestorProviders>{children}</InvestorProviders>;
    } else if (user?.userType === 'Company') {
      return <CompanyProviders>{children}</CompanyProviders>;
    } else {
      return <React.Fragment>{children}</React.Fragment>;
    }
  };

  return <Providers>{children}</Providers>;
};