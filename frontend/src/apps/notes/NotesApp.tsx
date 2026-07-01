import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import {
  TrashIcon as TrashOutline,
  PencilSquareIcon as PencilOutline,
  CheckCircleIcon as CheckCircleOutline
} from "@heroicons/react/24/outline";

import {
  TrashIcon as TrashSolid,
  PencilSquareIcon as PencilSolid,
  CheckCircleIcon as CheckCircleSolid
} from "@heroicons/react/16/solid";
import { createNote, getNotes, deleteNote, updateNote } from "../../services/NotesService";
import type { Note } from "../../types/Note";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const NotesApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {

      if(!AuthService.isAuthenticated()) {
        alert("You are not authenticated. Please login to access notes.");
        navigate('/', { replace: true });
        return;
      }

      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error(error);
        alert("Something went wrong while fetching notes." + (error instanceof Error ? `: ${error.message}` : ''));
      }
    };
    fetchNotes();
  }, []);

  // Create note
  const handleCreateNote = async () => {
    // Validate input 
    if (!note.title.trim()) {
      alert("Title is required.");
      return;
    }

    const newNote: Note = {
      id: 0,
      title: note.title,
      content: note.content,
      createdAt: new Date().toISOString(),
    };

    try {
      const createdNote = await createNote(newNote);
      setNotes([...notes, createdNote]);
      setNote({ title: '', content: '' });
    } catch (error) {
      console.error(error);
      alert("Something went wrong while creating the note." + (error instanceof Error ? `: ${error.message}` : ''));
    }
  }

  // Delete note
  const handleDeleteNote = async (id: number) => {
    //confirm delete
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting the note." + (error instanceof Error ? `: ${error.message}` : ''));
      return;
    }
  }

  // Edit note
  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = async (id: number) => {
    try {
      const noteToUpdate = notes.find(note => note.id === id);
      if (noteToUpdate) {
        await updateNote(id, noteToUpdate);
      }
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating the note." + (error instanceof Error ? `: ${error.message}` : ''));
    }
  };

  const handleChange = (id: number, field: keyof Note, value: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  return (
    <div className="p-5 h-full w-full">

      {/* Create new note form  */}
      <div className="flex items-center justify-center pb-5">
        <form className="flex flex-col gap-1 rounded-sm w-[80%] md:w-1/4" onSubmit={(e) => { e.preventDefault(); handleCreateNote(); }}>
          <Input value={note.title} placeholder="Title" styles="border border-gray-300 p-2" onChange={(e) => setNote({ ...note, title: e.target.value })} />
          <textarea
            value={note.content}
            placeholder="Note Content"
            className="border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
          <Button
            label="Add Note"
            styles="
              bg-[var(--pallete-color-1)] 
              text-[var(--pallete-color-5)]
              dark:bg-[var(--pallete-color-5)] 
              dark:text-[var(--pallete-color-1)]"
            onClick={() => handleCreateNote()}
            disabled={!note.title.trim()}
          />
        </form>
      </div>

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] py-2 max-w-5xl mx-auto">
        {notes.map(note => (
          <div
            key={note.id}
            className="
              flex flex-col justify-between
              rounded-sm 
              shadow-normal 
              dark:shadow-glow 
              wrap-break-word 
              min-h-54
              hover:scale-[1.01] 
              transition"
          >
            <div className="h-full">
              <div className="font-semibold text-md px-3 pt-4 pb-1 h-[30%]">
                <Input
                  value={note.title}
                  readOnly={editingId !== note.id}
                  onChange={(e) => handleChange(note.id, "title", e.target.value)}
                />
              </div>

              <div className="text-sm px-3 pt-2 pb-4 h-[70%]">
                <textarea
                  value={note.content}
                  className="w-full h-full border-0 resize-none"
                  readOnly={editingId !== note.id}
                  onChange={(e) => handleChange(note.id, "content", e.target.value)}
                />
              </div>
            </div>

            <div className="text-gray-700 text-xs p-2 flex items-center justify-between bg-(--pallete-color-4)">
              <div className="flex gap-3">

                {/* Delete */}
                <div className="group cursor-pointer">
                  <TrashOutline className="w-6 h-6 text-(--pallete-color-1) group-hover:hidden" />
                  <TrashSolid
                    className="w-6 h-6 text-(--pallete-color-1) hidden group-hover:block"
                    onClick={() => handleDeleteNote(note.id)}
                  />
                </div>

                {/* Edit OR Save */}
                {editingId === note.id ? (
                  // SHOW CHECK ICON (SAVE MODE)
                  <div className="group cursor-pointer">
                    <CheckCircleOutline className="w-6 h-6 text-(--pallete-color-1) group-hover:hidden" />
                    <CheckCircleSolid
                      className="w-6 h-6 text-(--pallete-color-1) hidden group-hover:block"
                      onClick={() => handleSave(note.id)}
                    />
                  </div>
                ) : (
                  // SHOW EDIT ICON (DEFAULT)
                  <div className="group cursor-pointer">
                    <PencilOutline className="w-6 h-6 text-(--pallete-color-1) group-hover:hidden" />
                    <PencilSolid
                      className="w-6 h-6 text-(--pallete-color-1) hidden group-hover:block"
                      onClick={() => handleEdit(note.id)}
                    />
                  </div>
                )}
              </div>
              <div>{new Date(note.createdAt).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}

export default NotesApp