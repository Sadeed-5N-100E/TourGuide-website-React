import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TouristMainPage from './TouristMainPage';
import Login from './Login';
import TourGuideMainPage from './TourGuideMainPage';
import LandingPage from './LandingPage';
import LoginGuide from './LoginGuide';
import SignUpGuide from './SignupGuide';
import SignUp from './signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tourist" element={<TouristMainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guide" element={<TourGuideMainPage />} />
          <Route path="/login-guide" element={<LoginGuide />} />
          <Route path="/signup-guide" element={<SignUpGuide />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
