import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { Snackbar, Alert } from '@mui/material';


export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e) => setError(e.detail);
    window.addEventListener('globalError', handler);
    return () => window.removeEventListener('globalError', handler);
  }, []);

  return (
  <>
    <Routes>
      <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onLogin={() => {setLoggedIn(true); navigate('/');}} />} />
      <Route path="/register" element={<Register onRegister={() => {setLoggedIn(true); navigate('/');}} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setError('')} variant="filled">
          {error}
        </Alert>
      </Snackbar>
  </>
  );
}
