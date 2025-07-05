import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();
router.use(protect); 

router.get('/', authorizeRoles('Admin', 'Manager'), getAllUsers);
router.put('/:id', authorizeRoles('Admin'), updateUser);
router.delete('/:id', authorizeRoles('Admin'), deleteUser);

export default router;
