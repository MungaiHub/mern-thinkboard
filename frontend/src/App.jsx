import React from 'react'
import HomePage from './pages/HomaPage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Routes, Route } from "react-router-dom";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div>
      <button className="btn btn-primary">click me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
