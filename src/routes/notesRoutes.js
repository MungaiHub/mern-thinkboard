import express from "express";
import { 
  getAllNotes, 
  createNote, 
  updateNote, 
  deleteNote 
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;


// app.get("/api/notes",(req, res) =>{
//     res.status(200).send("you got 34 notes")
// })
// same as above
// app.get("/api/notes", function (req, res) {
//     res.send("you got 5 notes");
// });
