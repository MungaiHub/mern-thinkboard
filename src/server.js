import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();



const app = express();

connectDB();
 
//middleware
app. use(express.json());
app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("server started on the PORT: 5001");
});
