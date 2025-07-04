import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password});
    await user.save();
    res.status(201).json({ token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};


export const getMe = async (req, res) => {
  try {
    const { _id, name, email, role } = req.user;
    res.status(200).json({ id: _id, name, email, role });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user info' });
  }
};
