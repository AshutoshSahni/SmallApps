const BASE_URL = import.meta.env.VITE_API_URL;


//#region  GET ALL NOTES SERVICE
export const getNotes = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return await response.json();

}
//#endregion

//#region CREATE NOTE SERVICE
export const createNote = async (note: { title: string, content: string }) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    if (!response.ok) {
        throw new Error('Failed to create note');
    }
    return await response.json();
}
//#endregion

//#region DELETE NOTE SERVICE
export const deleteNote = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete note');
    }
}
//#endregion

//#region UPDATE NOTE SERVICE
export const updateNote = async (id: number, note: { title: string, content: string }) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    if (!response.ok) {
        throw new Error('Failed to update note');
    }
}
//#endregion