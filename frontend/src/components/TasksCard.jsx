import { Box, Typography, Button, MenuItem, TextField } from '@mui/material';
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

      {/* Admin/Manager can reassign */}
      {['Admin', 'Manager'].includes(user.role) && (
        <Box mt={2} display="flex" gap={2}>
          <TextField
            select
            label="Change Assignee"
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
          >
            {allUsers.map((u) => (
              <MenuItem key={u._id} value={u._id}>
                {u.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Change Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="small"
          >
            {['ToDo', 'InProgress', 'Done'].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>

          <Button onClick={handleUpdate} variant="contained">Update</Button>
        </Box>
      )}
    </Box>
  );
}
