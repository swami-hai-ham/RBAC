import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import api from '../api/api';

export default function CreateTask({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('ToDo');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get('/v1/users'); // This should return all members
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/v1/tasks', { title, description, assignedTo, status });
    setTitle(''); setDescription(''); setAssignedTo(''); setStatus('ToDo');
    onCreated(); // Refresh task list
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box my={4}>
      <Typography variant="h6" gutterBottom>Create Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField fullWidth margin="normal" label="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <TextField
          select fullWidth margin="normal" label="Assign To"
          value={assignedTo} onChange={e => setAssignedTo(e.target.value)}
        >
          {users.map(user => (
            <MenuItem key={user._id} value={user._id}>{user.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select fullWidth margin="normal" label="Status"
          value={status} onChange={e => setStatus(e.target.value)}
        >
          {['ToDo', 'InProgress', 'Done'].map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Create</Button>
      </form>
    </Box>
  );
}
