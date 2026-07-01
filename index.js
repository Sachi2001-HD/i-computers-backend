import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routers/studentRouter.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import authenticate from './middlewares/authenticate.js';

const mongoDBURI = "mongodb://admin:1234@ac-3aazm2e-shard-00-00.j3ftgiz.mongodb.net:27017,ac-3aazm2e-shard-00-01.j3ftgiz.mongodb.net:27017,ac-3aazm2e-shard-00-02.j3ftgiz.mongodb.net:27017/i-computers?ssl=true&replicaSet=atlas-6w1m4s-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(mongoDBURI).then(
    () => {
        console.log ("MongoDB Connected Successfully")
    }
)

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/students", studentRouter);
app.use("/products", authenticate, productRouter);

app.get(
    "/",
    (req,res) => {
        //retrieve all students from database
        Student.find().then(
            (students) => {
                res.json(students);
            }
        )
    }
)

app.post(
    "/",
    (req,res) => {

        //database -> student collection -> add data
        const newStudent = new Student(req.body);
        newStudent.save().then(
            () => {
                res.json({
                    message:"Student Added Successfully"
                }
                )
            }
        )
    }
)


app.listen(
    3000,
    () => {
        console.log ("Server Started Successfully")
    }
);