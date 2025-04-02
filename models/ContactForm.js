import mongoose,{Schema} from "mongoose";

const ContactSchema = new Schema({
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    MobileNumber:{
        type:Number,
        required:true,
        minLength:10,
        maxLength:10

    },
    Message:{
        type:String,
        required:true,
        maxLength:500
    }
},{
    timestamps:true
})
const Contact = mongoose.model('ContactForm',ContactSchema);
export default Contact;