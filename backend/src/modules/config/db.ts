import mongoose from "mongoose";
import { MONGO_URI } from "../../environmentValidation";

const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(String(MONGO_URI));
        console.log("Mongo is running")
    } catch (dbError) {
        console.log(dbError)
    }
}

export default connectDb;