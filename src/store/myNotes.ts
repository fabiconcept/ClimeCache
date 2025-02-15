import { create } from "zustand";
import { LocalStorageToolkit } from "../utilities/localStorage";
import { Note } from "../types";

interface MyNotesState {
    myNotes: Note[],
    noteModalOpen: boolean,
    activeNoteId: string | null,
    retrieveExistingNote: (noteId: string) => Note | null,
    setNoteModalOpen: (isOpen: boolean, noteId: string) => void,
    addNote: (note: Note) => void,
    populateNotes: (notes: Note[]) => void,
    updateExistingNote: (note: Omit<Note, "attachedLocation">) => void,
    removeNote: (noteId: string) => void,
    noteExists: (noteId: string | null) => boolean
}

export const useMyNotes = create<MyNotesState>((set, get) => ({
    myNotes: [],
    noteModalOpen: false,
    activeNoteId: null,
    setNoteModalOpen: (isOpen: boolean, noteId: string) => set({ noteModalOpen: isOpen, activeNoteId: noteId }),
    addNote: (note: Note) => {
        set(state => {
            const updatedNotes = [...state.myNotes, note];
            LocalStorageToolkit.setItem("my-notes", updatedNotes); // Store updated notes in localStorage
            return { myNotes: updatedNotes };
        });
    },
    updateExistingNote: (note) => {
        set(state => {
            const updatedNotes = state.myNotes.map((existingNote) =>
                existingNote.id === note.id ? { ...existingNote, ...note } : existingNote
            );
            LocalStorageToolkit.setItem("my-notes", updatedNotes); // Store updated notes in localStorage
            return { myNotes: updatedNotes };
        });
    },
    removeNote: (noteId: string) => {
        set(state => {
            const updatedNotes = state.myNotes.filter((note) => note.id !== noteId);
            LocalStorageToolkit.setItem("my-notes", updatedNotes); // Store updated notes in localStorage
            return { myNotes: updatedNotes };
        });
    },
    noteExists: (noteId: string | null) => {
        if (noteId === null) return false;
        const state = get();
        return state.myNotes.some((note) => note.id === noteId);
    },
    retrieveExistingNote: (noteId: string) => {
        const state = get();
        return state.myNotes.find((note) => note.id === noteId) || null;
    },
    populateNotes: (notes: Note[]) => set(() => ({ myNotes: notes }))
}))