import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import authenticate from './middlewares/authenticate.js';
import dotenv from 'dotenv';

dotenv.config();

const mongoDBURI = process.env.MONGO_URI;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

mongoose.connect(mongoDBURI).then(
    () => {
        console.log ("MongoDB Connected Successfully")
    }
)

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", authenticate, productRouter);


app.listen(
    3000,
    () => {
        console.log ("Server Started Successfully")
    }
);