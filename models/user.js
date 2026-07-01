import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    email : {
        type : String,
        unique : true, // Ensure that the email is unique across all users
        required : true // Make the email field required
    },
    firstName : {
        type : String,
        required : true 
    },
    lastName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false // By default, users are not admins
    },
    isBlocked : {
        type : Boolean,
        required : true,
        default : false // By default, users are not blocked
    },
    isEmailVerified : {
        type : Boolean,
        required : true,
        default : false // By default, users' email is not verified
    },
    image : {
        type : String,
        required : true,
        default : "/default-profile.png" // Default profile image
    }
}
)

const User = mongoose.model("User", userSchema);

export default User;