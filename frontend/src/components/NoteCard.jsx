import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../lib/utilis'

const NoteCard = ({ note }) => {
  if (!note || !note._id) return null
  const safeDate = note.createdAt ? formatDate(new Date(note.createdAt)) : ''

  return (
    <Link to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
      border-t-4 border-solid border-[rgb(0,255,157)]">
        <div className="card-body">
            <h3 className='card-title text-base-content'>{note.title ?? 'Untitled'}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content ?? ''}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className='text-sm text-base-content/60'>
                   {safeDate}
                </span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className='size-4'/>
                    <button className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon className="size-4"/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
