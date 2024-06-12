import express from 'express';
import {config} from 'dotenv';
import  morgan  from 'morgan' // it will give log description that what type of request was handled and what was the response and status code
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config()
const app = express();

// middlewares
app.use(cors({origin:"http://localhost:5173", credentials: true}))
app.use(express.json()) // it tells the application that we ar using json objects for ending request
app.use(cookieParser(process.env.COOKIE_SECRET)) // to parse cookie from frontend to backend

// remove it in production
app.use(morgan("dev"))

// generate middleware fo api structure
app.use("/api/v1", appRouter)

export default app;