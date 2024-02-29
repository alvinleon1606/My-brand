// server development
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import UsersRoutes from './routes/userRegistration';

const app = express()

app.use(express.json())
connectDB()

dotenv.config();

// routes
app.use('/users', UsersRoutes)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on ${port} ...`);
})