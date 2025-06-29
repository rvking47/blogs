import mongoose from "mongoose";

async function connectDB() {
    try{
    const conn= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
   console.log(`MongoBD Connected: ${conn.connection.host}`);
    }
    catch(error)
    {
      console.log("Database is not connected!!");
      console.log(error);
    }
}

export default connectDB;