import React from 'react'
import { Link } from 'react-router-dom'
import { NotebookIcon } from 'lucide-react'

const NotesNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center' >
      <div className="bg-primary/10 rounded-full p-8">
      <NotebookIcon className="size-12 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold mt-4 text-primary">No Notes Yet</h2>
      <p className="text-base-content/70 mt-2">Create your first note to get started!</p>
      <Link to="/create" className="btn btn-primary ">
        Create Note
      </Link>       
    </div>
  )
}

export default NotesNotFound
