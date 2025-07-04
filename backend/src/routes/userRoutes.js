import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', protect, authorizeRoles('Admin', 'Manager'), getAllUsers);
router.put('/:id', protect, authorizeRoles('Admin', 'Manager'), updateUser);
router.delete('/:id', protect, authorizeRoles('Admin', 'Manager'), deleteUser);

export default router;
