import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import connect from './src/config/db.config.js';

import taskRoutes from "./src/routes/task.routes.js";
import userRoute from "./src/routes/user.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));


app.use(express.json());
app.use(cookieParser());
connect();

app.use('/api/users', userRoute);
app.use('/api/tasks',taskRoutes)


//error middleware
// app.use(errorHandler);
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
    });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

