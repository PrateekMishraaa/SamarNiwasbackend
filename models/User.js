import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"


const UserSchema = new Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Mobile:{
        type:Number,
        required:true,
        unique:true,
        minLength:10,
        maxLength:10
    },
    Address:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
        minLength:8
    }

},{
    timestamp:true
})
const User = mongoose.model("User",UserSchema);
export default User;