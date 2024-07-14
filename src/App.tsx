
// src/App.tsx
import React from 'react';
import './assets/styles/colors.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RoutePath } from './utils/enums';
import { CommonProviders, AppProviders } from './Providers';
import Header from './components/header/Header';
import Home from './pages/home/investor/Home';
import SearchInvestments from './pages/home/investor/SearchInvest';

const AppContent: React.FC = () => {
  return (
    <AppProviders>
      <Routes>
        <Route path={RoutePath.Home} element={<Home />} />
        <Route path={RoutePath.SearchInvests} element={<SearchInvestments />} />
      </Routes>
    </AppProviders>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <CommonProviders>
        <Header>
          <AppContent />
        </Header>
      </CommonProviders>
    </Router>
  );

};




export default App;
