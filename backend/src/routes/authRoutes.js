import express from 'express';
import { register, login, getMe } from '../controllers/authcontroller.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../zod/zodSchemas.js';
const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);

export default router;
