import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export default function authenticate(req,res,next) {

        const header = req.headers.authorization

        if(header == null){
          next() // Pass control to the next middleware function in the stack
        }else{
            const token = header.replace("Bearer ", "") // Extract the token from the header

            jwt.verify(token, process.env.JWT_SECRET_KEY,
                (err, decoded) => {
                    if(decoded == null){
                        res.status(401).json({message : "Invalid Token"})
                    }else{
                        req.user = decoded // Attach the decoded user information to the request object
                        next()
                    }
                }
            )
        }
    }