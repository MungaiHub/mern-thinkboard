import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();



const app = express();

 
//middleware
app. use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
app.use(cors({
  origin: "http://localhost:5173",
}));

connectDB().then(() => {
  app.listen(5001, () => {
  console.log("server started on the PORT: 5001");});

});



