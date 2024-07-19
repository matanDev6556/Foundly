// src/App.tsx
import React from 'react';
import './assets/styles/colors.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutePath } from './utils/enums';
import { AppStatusProvider } from './context/AppStatusContext';
import { UserProvider } from './context/UserContext';
import { ModalProvider } from './context/popupContext';
import Home from './pages/home/Home';
import SearchInvestments from './pages/home/investor-home/SearchInvest';
import MyInvestments from './pages/investor/myInvestments';
import { LikesProvider } from './context/LikesContext';
import Header from './components/cummon/header/Header';

interface ProvidersProps {
  children: React.ReactNode;
}

export const CommonProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <UserProvider>
      <AppStatusProvider>
        <ModalProvider>{children}</ModalProvider>
      </AppStatusProvider>
    </UserProvider>
  );
};

// Routes her
const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutePath.Home} element={<Home />} />
      <Route path={RoutePath.SearchInvests} element={<SearchInvestments />} />
      <Route
        path={RoutePath.MyInvestments}
        element={
          <>
            <LikesProvider>
              <MyInvestments />
            </LikesProvider>
          </>
        }
      />
    </Routes>
  );
};

// HER THE APP START
const App: React.FC = () => {
  return (
    <CommonProviders>
      <Router>
        <Header>
          <AppContent />
        </Header>
      </Router>
    </CommonProviders>
  );
};

export default App;
