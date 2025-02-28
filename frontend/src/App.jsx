import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import DataView from './components/data/DataView.jsx';
import Recordview from './components/data/RecordView.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import MapLinking from './components/map/MapLinking.jsx';
import Landview from './components/agri/LandView.jsx';
import Landform from './components/agri/LandForm.jsx';
import Market from './components/market/Market.jsx';
import MarketView from './components/market/MarketView.jsx';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className='App'>
        {isLoggedIn && <Navbar />}
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </Router>
  );
}

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route path='/login' element={isLoggedIn ? <Dashboard /> : <Login isAuthenticated={isLoggedIn} setIsAuthenticated={setIsLoggedIn} />} />
      <Route exact path='/' element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path='/Data' element={isLoggedIn ? <DataView /> : <Navigate to="/login" />} />
      <Route path='/Market' element={isLoggedIn ? <Market /> : <Navigate to="/login" />} />
      <Route path='/MarketView/:id' element={isLoggedIn ? <MarketView /> : <Navigate to="/login" />} />
      <Route path='/Map' element={isLoggedIn ? <MapLinking /> : <Navigate to="/login" />} />
      <Route path='/RecordView/:id' element={isLoggedIn ? <Recordview /> : <Navigate to="/login" />} />
      <Route path='/Agri' element={isLoggedIn ? <Landview /> : <Navigate to="/login" />} />
      <Route path='/Agri/add' element={isLoggedIn ? <Landform /> : <Navigate to="/login" />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

export default App;