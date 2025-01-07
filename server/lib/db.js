import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbname:"EcommerceDB",
        }).then(()=>{console.log("Database Connected Successfully")});
    } catch (error) {
        console.log("Error Connecting to mongodb", error.message);
        process.exit(1);
    }
}
