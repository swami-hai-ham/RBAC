import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../api/api';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      const res = await api.post('/v1/auth/register', form);
      localStorage.setItem('token', res.data.token);
      onRegister();
    } catch (err) {
      alert(`Registration failed ${err}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" mt={5}>Register</Typography>
      <TextField name="name" label="Name" fullWidth margin="normal" value={form.name} onChange={handleChange} />
      <TextField name="email" label="Email" fullWidth margin="normal" value={form.email} onChange={handleChange} />
      <TextField name="password" label="Password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} />
      <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
    </Container>
  );
}
