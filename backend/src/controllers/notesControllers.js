import Note from "../models/Note.js";
import mongoose from "mongoose";

export async function getAllNotes(req, res){
    try{
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }
    catch (error){
        console.error("Error in GetAllNotes controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function getNoteById(req,res){
    try{
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({message:"Note not found"});
        }
        
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.json(note);
    }
    catch(error){
        console.error("Error in getNoteById controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function createNote(req, res){
    try{
        const {title, content} = req.body
        const note= new Note({title, content})
        const savedNote=await note.save()
        res.status(201).json(savedNote);
    }
    catch(error){
        console.error("Error in GetAllNotes controller",error);
        res.status(500).json({message:"Internal server error"})

    }
  
}
export async function updateNote(req, res) {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Note not found" });
    }

    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({
      message: "Note updated successfully"
    });

  } catch (error) {
    console.error("Error in updateNote controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function deleteNote(req, res){
   try{
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({message:"Note deleted successfully!!!"}) 
   }
   catch (error) {
    console.error("Error in deleteNote controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
