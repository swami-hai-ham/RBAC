import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={() => {setLoggedIn(true); navigate('/');}} />} />
      <Route path="/register" element={<Register onRegister={() => {setLoggedIn(true); navigate('/');}} />} />
    </Routes>
  );
}
