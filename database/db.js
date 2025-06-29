import mongoose from "mongoose";

async function connectDB() {
    try{
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to Database!!");
    }
    catch(error)
    {
      console.log("Database is not connected!!");
      console.log(error);
    }
}

export default connectDB;