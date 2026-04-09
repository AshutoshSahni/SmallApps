import './NotesApp.css'
import { useEffect, useState } from "react";

interface Notes {
  id: number
  title: string
  content: string
  createdAt: string
}

const NotesApp = () => {
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    // Simulate fetching notes from a database
    const fetchNotes = async () => {
      const response = await fetch('http://localhost:5249/api/Notes');
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div className='notesApp'>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesApp