import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import User from './models/User.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



// const seedAdmin = async () => {
//   const existing = await User.findOne({ email: 'admin@example.com' });
//   if (!existing) {
//     await User.create({
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin123', 
//       role: 'Admin'
//     });
//     console.log('Default admin seeded');
//   }
// };

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Mongo DB connected")
  // seedAdmin()
})
.catch(err => console.error('DB connection failed', err));



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => res.send('API running'));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});


