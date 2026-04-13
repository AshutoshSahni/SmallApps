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


const BASE_URL = import.meta.env.VITE_API_URL;

interface Notes {
  id: number
  title: string
  content: string
  createdAt: string
}


const NotesApp = () => {
  const [notes, setNotes] = useState<Notes[]>([]);
  const [note, setNote] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching notes from a database
    const fetchNotes = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  // Create note
  const createNote = async () => {
    // Validate input 
    if (!note.title.trim()) {
      alert("Title is required.");
      return;
    }

    const newNote = {
      title: note.title,
      content: note.content,
    };

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    });

    if (response.ok) {
      const createdNote = await response.json();
      setNotes([...notes, createdNote]);
      setNote({ title: '', content: '' });
    } else {
      console.error('Failed to create note');
    }
  }

  // Delete note
  const deleteNote = async (id: number) => {

    //confirm delete
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setNotes(notes.filter(note => note.id !== id));
    } else {
      console.error('Failed to delete note');
    }
  }

  // Edit note
  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notes.find(note => note.id === id))
      });

      if (!response.ok) {
        throw new Error("Failed to save note");
      }

      setEditingId(null);

    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving");
    }
  };

  const handleChange = (id: number, field: string, value: string) => {
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
        <form className="flex flex-col gap-1 rounded-sm w-[80%] md:w-1/4" onSubmit={(e) => { e.preventDefault(); createNote(); }}>
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
            onClick={() => createNote()}
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
                    onClick={() => deleteNote(note.id)}
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