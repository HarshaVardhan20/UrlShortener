import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import urlRoutes from "./routes/url.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/", urlRoutes);
const PORT = process.env.PORT 


const connectMongoose = ()=>{
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => console.error("MongoDB Error:", err));
}

try{
    connectMongoose();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
}
catch(err){
    console.log('Error while starting backend ',err);
}