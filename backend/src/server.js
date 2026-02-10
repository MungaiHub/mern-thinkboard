import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Postman) and localhost (any port)
      if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }

      // Allow explicit production client origin if provided
      if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }

      // If serving frontend from same origin (Render single-service deploy),
      // CORS isn't needed; but browsers may still send Origin. Allow it.
      if (process.env.RENDER_EXTERNAL_URL && origin === process.env.RENDER_EXTERNAL_URL) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

// Serve frontend in production (single Render service)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "..", "..", "frontend", "dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendDistPath));

  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on the PORT: ${PORT}`);
  });
});



