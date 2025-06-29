import express from "express";
import router from "./routes/contolledRoutes.js";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
dotenv.config();
const app=express();
const PORT = process.env.PORT || 4000;

connectDB();

app.set("view engine", "ejs");
app.use(router);

const server=app.listen(PORT,()=>{
    console.log(`server is running localhost:${server.address().port}`);
});