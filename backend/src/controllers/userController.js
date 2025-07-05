import User from '../models/User.js';
import Task from '../models/Task.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('_id name email role');
    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.role === 'Admin') {
      return res.status(403).json({ message: 'Cannot modify Admin' });
    }

    const updates = {};
    if (req.body.role) updates.role = req.body.role;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('_id name email role');
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Failed to update user' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.role === 'Admin') {
      return res.status(403).json({ message: 'Cannot delete Admin' });
    }

    await User.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ 
      $or: [
        { assignedTo: req.params.id }, 
        { createdBy: req.params.id }
      ] 
    });

    res.json({ message: 'User and related tasks deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
