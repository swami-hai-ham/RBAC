import Task from '../models/Task.js';
import User from '../models/User.js';


export const createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;

  try {
    const assignee = await User.findById(assignedTo);
    if (!assignee) return res.status(400).json({ message: 'Assignee not found' });

    const task = await Task.create({
      title,
      description,
      assignedTo,
      status,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};


export const getTasks = async (req, res) => {
  const { status, assignedTo } = req.query;
  let filter = {};

  if (req.user.role === 'Member') {
    filter.assignedTo = req.user._id;
  }

  if (status) filter.status = status;
  if (assignedTo) filter.assignedTo = assignedTo;

  const tasks = await Task.find(filter).populate('assignedTo', 'name email').populate('createdBy', 'name');
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  // Prevent members from updating tasks not assigned to them
  if (
    req.user.role === 'Member' &&
    task.assignedTo.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: 'Not your task' });
  }

  const { status, assignedTo } = req.body;

  // Only Admins and Managers can change assignee
  if (assignedTo && req.user.role !== 'Admin' && req.user.role !== 'Manager') {
    return res.status(403).json({ message: 'Only Admins or Managers can reassign tasks' });
  }

  if (assignedTo) {
    const assignee = await User.findById(assignedTo);
    if (!assignee) return res.status(400).json({ message: 'Assignee not found' });
    task.assignedTo = assignedTo;
  }

  if (status) task.status = status;

  await task.save();
  res.json(task);
};


export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  await task.deleteOne();
  res.json({ message: 'Task deleted' });
};
