//require('dotenv').config({path: './.env'});
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    app.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/*
import express from "express";
const app=express();

(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        app.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            throw err;
        });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch(e){
        console.error("ERROR:",e);
        throw e;
    }
    finally{
        console.log("done");
    }
})()
 */
