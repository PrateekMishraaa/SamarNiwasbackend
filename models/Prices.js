import mongoose,{Schema} from "mongoose";



const PriceSchema = new Schema({
    Title:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Price:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Price = mongoose.model("Price",PriceSchema);
export default Price