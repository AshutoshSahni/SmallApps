import type { Note } from '../types/Note';
import { BASE_URL } from './GlobalVariables';

const API_URL = BASE_URL + 'Notes';

async function responseHelper<T>(
    method: string,
    url: string,
    message: string,
    body: any = null
): Promise<T> {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        throw new Error(message + ": " + await response.text());
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return await response.json() as T;
}

export const getNotes = () =>
    responseHelper<Note[]>("GET", API_URL, "Failed to fetch notes");

export const createNote = (note: Note) =>
    responseHelper<Note>("POST", API_URL, "Failed to create note", note);

export const updateNote = (id: number, note: Note) =>
    responseHelper<void>("PUT", `${API_URL}/${id}`, "Failed to update note", note);

export const deleteNote = (id: number) =>
    responseHelper<void>("DELETE", `${API_URL}/${id}`, "Failed to delete note");