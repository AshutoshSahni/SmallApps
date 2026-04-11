import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
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

  useEffect(() => {
    // Simulate fetching notes from a database
    const fetchNotes = async () => {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  const createNote = async () => {
    // Simulate creating a new note
    const newNote = {
      title: note.title,
      content: note.content,
      createdAt: new Date().toISOString()
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

  return (
    <div className="p-5 h-full w-full">

      {/* // Add note creation functionality here (e.g., a form to create new notes) */}
      <div className="flex items-center justify-center pb-5">
        <form className="flex flex-col gap-1 rounded-sm w-[80%] md:w-1/4" >
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
          />
        </form>
      </div>

      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] py-2">
        {notes.map(note => (
          <div
            key={note.id}
            className="
              flex flex-col justify-between
              p-5 
              rounded-sm 
              shadow-normal 
              dark:shadow-glow 
              wrap-break-word 
              min-h-37.5
              hover:scale-[1.02] 
              transition"
          >
            <div>
              <div className="font-semibold text-md mb-1 py-2">
                {note.title}
              </div>

              <div className="text-sm">
                {note.content}
              </div>
            </div>

            <div className="text-gray-700 text-xs pt-3 self-end">
              {new Date(note.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default NotesApp