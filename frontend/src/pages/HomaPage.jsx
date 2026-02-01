import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import toast from "react-hot-toast"

const HomaPage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const fetchNotes = async () => {
      try{
        const res = await axios.get("http://localhost:5001/api/notes")
        setNotes(res.data)
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
    </div>
  )
}

export default HomaPage
