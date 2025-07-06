import { Box, Typography, Button, MenuItem, TextField, Grid } from '@mui/material';
import { useState } from 'react';
import api from '../api/api';

export default function TaskCard({ task, user, onUpdate, allUsers }) {
  const [newAssignee, setNewAssignee] = useState(task.assignedTo?._id || '');
  const [status, setStatus] = useState(task.status);

  const handleUpdate = async () => {
    await api.patch(`/v1/tasks/${task._id}`, {
      status,
      assignedTo: newAssignee
    });
    onUpdate();
  };

  return (
    <Box border={1} borderRadius={2} p={2} mb={2} mt={2}>
      <Typography variant="h6">{task.title}</Typography>
      <Typography>{task.description}</Typography>
      <Typography>Status: {task.status}</Typography>
      <Typography>Assigned To: {task.assignedTo?.name}</Typography>

      {['Admin', 'Manager'].includes(user.role) && (
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              select fullWidth label="Change Assignee" size="small"
              value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)}
            >
              {allUsers.map((u) => (
                <MenuItem key={u._id} value={u._id}>{u.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select fullWidth label="Change Status" size="small"
              value={status} onChange={(e) => setStatus(e.target.value)}
            >
              {['ToDo', 'InProgress', 'Done'].map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth onClick={handleUpdate}>Update</Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
