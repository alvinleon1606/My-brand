import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    secondName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
});

const Users = mongoose.model('Users', userSchema)

export default Users