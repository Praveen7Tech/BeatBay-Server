import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
    },
    role: {
        type:String,
        enum:["user","artist","admin"],
        default:"user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("Users", UserSchema)