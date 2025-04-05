import mongoose, {Schema} from "mongoose";


const RoomSchema = new Schema({
    Title:{
    type:String,
    required:true,        
    },
    Description:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})
const Room = mongoose.model('Room',RoomSchema);
export default Room;