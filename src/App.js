import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import User from './pages/User';
import Navbar from './components/Navbar';

const App = () =>
(
  <Router>
    <Routes>
      <Route path="/" element={<User />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
