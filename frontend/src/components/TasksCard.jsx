import { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, MenuItem, TextField } from '@mui/material';
import api from '../api/api';

export default function TaskCard({ task, user, onUpdate }) {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    await api.patch(`/v1/tasks/${task._id}`, { status: newStatus });
    onUpdate();
  };

  const handleDelete = async () => {
    await api.delete(`/v1/tasks/${task._id}`);
    onUpdate();
  };

  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" gutterBottom>{task.description}</Typography>
        <Typography variant="body2">Assigned To: {task.assignedTo?.name || task.assignedTo}</Typography>

        <Box display="flex" alignItems="center" mt={2} gap={2}>
          <TextField
            select
            label="Status"
            value={status}
            onChange={handleStatusChange}
            size="small"
          >
            {['ToDo', 'InProgress', 'Done'].map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>

          {(user.role === 'Admin' || user.role === 'Manager') && (
            <Button variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
