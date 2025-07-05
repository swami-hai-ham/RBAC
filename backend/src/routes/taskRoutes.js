import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validate, validateParams } from '../middleware/validate.js';
import { createTaskSchema, idSchema, updateTaskSchema } from '../zod/zodSchemas.js';

const router = express.Router();
router.use(protect); 

router.post('/', validate(createTaskSchema), authorizeRoles('Admin', 'Manager'), createTask);
router.get('/', getTasks);
router.patch('/:id',validateParams(idSchema), validate(updateTaskSchema), updateTask); 
router.delete('/:id',validateParams(idSchema), authorizeRoles('Admin', 'Manager'), deleteTask);

export default router;
