import Task from '../models/Task.js';

export const createTask = async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  try {
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

  if (
    req.user.role === 'Member' &&
    task.assignedTo.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: 'Not your task' });
  }

  const { status } = req.body;
  task.status = status || task.status;
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  await task.deleteOne();
  res.json({ message: 'Task deleted' });
};
