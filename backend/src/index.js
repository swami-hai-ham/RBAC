import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log('Server running on ' + process.env.PORT);
});
