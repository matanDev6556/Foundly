// src/App.tsx
import React from 'react';
import './assets/styles/colors.css';
import './App.css';

import Home from './pages/home/Home';
import { UserProvider } from './context/UserContext';
import { AppStatusProvider } from './context/AppStatusContext';
import SearchInvestments from './pages/home/SearchInvest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './context/popupContext';
import { RoutePath } from './utils/enums';

function App() {
  return (
    <Router>
      <AppStatusProvider>
        <ModalProvider>
          <UserProvider>
            <Routes>
              <Route path={RoutePath.Home} element={<Home />} />
              <Route path={RoutePath.SearchInvests} element={<SearchInvestments />} />
            </Routes>
          </UserProvider>
        </ModalProvider>
      </AppStatusProvider>
    </Router>
  );
}

export default App;
