import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();



const app = express();

 
//middleware

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. Postman) or from any localhost port
    if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app. use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);


connectDB().then(() => {
  app.listen(5001, () => {
  console.log("server started on the PORT: 5001");});

});



