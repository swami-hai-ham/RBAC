import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { validate, validateParams } from '../middleware/validate.js';
import { idSchema, updateUserSchema } from '../zod/zodSchemas.js';
const router = express.Router();
router.use(protect); 

router.get('/', authorizeRoles('Admin', 'Manager'), getAllUsers);
router.put('/:id',validateParams(idSchema), validate(updateUserSchema), authorizeRoles('Admin'), updateUser);
router.delete('/:id', validateParams(idSchema), authorizeRoles('Admin'), deleteUser);

export default router;
