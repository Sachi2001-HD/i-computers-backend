import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export async function createUser(req, res) {

    try{

        const user = await User.findOne({ email: req.body.email }) // Check if a user with the provided email already exists in the database
        if (user !== null) {
            return res.json({ message: "User already exists" })
        }

        //Create user
        //const newUser = new User(req.body) .This method also correct

        const passwordHash = bcrypt.hashSync(req.body.password, 10) // Hash the password using bcrypt with a salt rounds of 10
        
        const newUser = new User({ 
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: passwordHash,
            isAdmin: req.body.isAdmin,
            isBlocked: req.body.isBlocked,
            isEmailVerified: req.body.isEmailVerified,
            image: req.body.image
        })

        await newUser.save() 

        res.status(201).json({ message: "User created successfully" })

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

export async function loginUser(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password

        if (email == null || password == null) {
            res.status(400).json({ message: "Email and password are required" })
            return
        }

        const user = await User.findOne({ email: email })
        
        if (user == null) {
            res.status(404).json({ message: "User not found" })
            return
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password) 

        if(isPasswordValid){
            const token = jwt.sign(
                {
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image
                },
                process.env.JWT_SECRET_KEY,
            )
            res.json({ message: "Login successful", token: token })
        }else{
            res.status(400).json({ message: "Invalid password" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}