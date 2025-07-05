import { z } from 'zod';

export const idSchema = z.object({
  id: z.string().length(24, 'Invalid MongoDB ID')
});

export const updateUserSchema = z.object({
  role: z.enum(['Admin', 'Manager', 'Member'])
});


export const createTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  assignedTo: z.string().length(24, 'Invalid user ID'),
  status: z.enum(['ToDo', 'InProgress', 'Done']).optional()
});

export const updateTaskSchema = z.object({
  status: z.enum(['ToDo', 'InProgress', 'Done']).optional(),
  assignedTo: z.string().length(24, 'Invalid user ID').optional()
});


export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(['Admin', 'Manager', 'Member']).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100)
});