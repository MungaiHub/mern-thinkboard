import React from 'react'
import HomePage from './pages/HomaPage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { Routes, Route } from "react-router-dom";
import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="forest">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
