import { useEffect, useState } from 'react';
import { Typography, Button, Container, AppBar, Toolbar, Box, Grid } from '@mui/material';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import CreateTask from '../components/CreateTask';
import TaskCard from '../components/TasksCard';
import { MenuItem, FormControl, InputLabel, Select, TextField } from '@mui/material';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();

  const fetchTasks = async () => {
  const res = await api.get('/v1/tasks', {
    params: {
      status: filterStatus,
      assignedTo: filterAssignee
    }
  });
  setTasks(res.data);
  };

  const fetchUser = async () => {
    const res = await api.get('/v1/auth/me');
    setUser(res.data);
  };
  const fetchUsers = async () => {
    const res = await api.get('/v1/users'); // Admin/Manager only
    setAllUsers(res.data);
  };

  const handleRoleChange = async (id, newRole) => {
    await api.put(`/v1/users/${id}`, { role: newRole });
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await api.delete(`/v1/users/${id}`);
    fetchUsers();    
    fetchTasks();    
  };



  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (['Admin', 'Manager'].includes(user.role)) {
      fetchUsers();
    }
  }, [user.role]);


  useEffect(() => {
    fetchTasks();
  }, [filterStatus, filterAssignee]);


  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6">Task Manager</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={2}>{user.name} ({user.role})</Typography>
            <Button variant="outlined" color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container>
      {['Admin', 'Manager'].includes(user.role) && (
          <>
            <Typography variant="h5" mt={4}>Users</Typography>
            <Grid container spacing={2} mt={1} mb={2}>
              {allUsers
                .filter(u => u._id !== user._id && u.role !== user.role)
                .map(u => (
                  <Grid item xs={12} sm={6} md={4} key={u._id} sx={{ display: 'flex' }}>
                    <Box
                      border={1}
                      borderColor="grey.300"
                      p={2}
                      borderRadius={1}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      width="100%"
                      sx={{ flex: 1 }}
                    >
                      <Box mb={2}>
                        <Typography variant="subtitle1">{u.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{u.email}</Typography>
                        <Typography variant="caption">Role: {u.role}</Typography>
                      </Box>

                      {user.role === 'Admin' && (
                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1} mt={"auto"}>
                          <TextField
                            select
                            size="small"
                            fullWidth
                            value={u.role}
                            onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          >
                            {['Admin', 'Manager', 'Member'].map(r => (
                              <MenuItem key={r} value={r}>{r}</MenuItem>
                            ))}
                          </TextField>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteUser(u._id)}
                            fullWidth
                          >
                            Delete
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </>
        )}



        <Typography variant="h4" mt={5}>Tasks</Typography>
        {['Admin', 'Manager'].includes(user.role) && (
          <Box display="flex" gap={2} mt={2}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="filter-status-label">Filter by Status</InputLabel>
              <Select
                labelId="filter-status-label"
                value={filterStatus}
                label="Filter by Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {['ToDo', 'InProgress', 'Done'].map(s => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="filter-assignee-label">Filter by Assignee</InputLabel>
              <Select
                labelId="filter-assignee-label"
                value={filterAssignee}
                label="Filter by Assignee"
                onChange={(e) => setFilterAssignee(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {allUsers.map(u => (
                  <MenuItem key={u._id} value={u._id}>{u.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>
        )}


        {tasks.map(t => (
          <TaskCard key={t._id} task={t} user={user} onUpdate={fetchTasks} allUsers={allUsers}/>
        ))}

        {['Admin', 'Manager'].includes(user.role) && (
          <CreateTask onCreated={fetchTasks} />
        )}
      </Container>
    </>
  );
}
