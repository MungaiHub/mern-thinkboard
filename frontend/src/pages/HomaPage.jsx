import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import axios from 'axios'
import toast from "react-hot-toast"
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'  

const HomaPage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes")
        const data = res.data
        setNotes(Array.isArray(data) ? data : [])
        setIsRateLimited(false)
      }
      catch(error){
        console.error("Error fetching notes:", error.message, error.response?.status)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else if (error.code === "ERR_NETWORK" || !error.response) {
          toast.error("Cannot reach server. Is the backend running on port 5001?")
        } else if (error.response?.status === 503) {
          toast.error("Rate limit service unavailable. Check backend .env (Upstash).")
        } else {
          toast.error("Failed to load notes")
        }
      }
      finally {
        setLoading(false)
      }
    }
    fetchNotes()
  },[])
     
  return (
    <div className='min-h-screen'>
      <Navbar/>

      {isRateLimited && <RateLimitedUI/>}
      <div className="max-w-6xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text-primary py-10'>loading notes....</div>}

        {!loading && !isRateLimited && notes.length === 0 && (
          <NotesNotFound />
        )}

        {!loading && !isRateLimited && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note =>(
               <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}

        
      </div>
    </div>
  )
}

export default HomaPage
