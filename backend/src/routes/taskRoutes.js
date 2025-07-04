import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); 

router.post('/', authorizeRoles('Admin', 'Manager'), createTask);
router.get('/', getTasks);
router.patch('/:id', updateTask); 
router.delete('/:id', authorizeRoles('Admin', 'Manager'), deleteTask);

export default router;
