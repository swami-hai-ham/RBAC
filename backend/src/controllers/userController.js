import User from '../models/User.js';

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

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('_id name email role');
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
    res.json({ message: 'User deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
