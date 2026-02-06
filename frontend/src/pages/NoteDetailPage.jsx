import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import api from '../lib/axios'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.error('Error fetching note:', error)
        if (error.response?.status === 429) {
          toast.error('Too many requests. Please wait and try again.')
        } else {
          toast.error('Failed to fetch note details')
        }
        setNote(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchNote()
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!note) return

    if (!note.title?.trim() || !note.content?.trim()) {
      toast.error('Title and content are required')
      return
    }

    setSaving(true)
    try {
      const res = await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      })
      setNote(res.data)
      toast.success('Note updated')
      navigate('/')
    } catch (error) {
      console.error('Error updating note:', error)
      if (error.response?.status === 429) {
        toast.error('You are updating too quickly. Please wait and try again.')
      } else {
        toast.error(error.response?.data?.message || 'Failed to update note')
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    setDeleting(true)
    try {
      await api.delete(`/notes/${id}`)
      toast.success('Note deleted')
      navigate('/')
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error(error.response?.data?.message || 'Failed to delete note')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin" size={48} />
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="card bg-base-100">
              <div className="card-body">
                <h2 className="card-title">Note not found</h2>
                <Link to="/" className="btn btn-primary w-fit">
                  Back to Notes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
              disabled={deleting}
            >
              <Trash2Icon className="size-5" />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>

              <form onSubmit={handleSave}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={note.title ?? ''}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered w-full min-h-[160px]"
                    value={note.content ?? ''}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
