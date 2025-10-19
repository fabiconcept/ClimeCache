import { useMemo, useRef, useState } from "react";
import { useMyNotes } from "../../store/myNotes";
import { useClickAway } from "react-use";
import { motion } from "framer-motion";
import { FaPaperclip, FaTrash } from "react-icons/fa6";
import { useKeyboardShortcut } from "../../utilities/Hooks/useControlPress";
import clsx from "clsx";

const useQueryParams = () => {
    return new URLSearchParams(window.location.search);
};
export default function Note() {
    const queryParams = useQueryParams();
    const query = queryParams.get("query") || "";

    const { setNoteModalOpen, activeNoteId, noteExists, updateExistingNote, removeNote, addNote, retrieveExistingNote } = useMyNotes();

    const previousNoteData = useMemo(() => {
        if (!activeNoteId) return null;
        return retrieveExistingNote(activeNoteId);
    }, [activeNoteId, retrieveExistingNote]);

    const [noteContent, setNoteContent] = useState(previousNoteData ? previousNoteData.text : "");
    const [noteTitle, setNoteTitle] = useState(previousNoteData ? previousNoteData.title : "");

    const removeSearchParam = (key: string) => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.delete(key);

        window.history.replaceState({}, "", `${window.location.pathname}?${newParams.toString()}`);
        setNoteModalOpen(false, "");
    };

    const canProceed = noteContent.length > 0 && noteTitle.length > 0;


    const noteRef = useRef<HTMLDivElement>(null);
    useClickAway(noteRef, () => removeSearchParam("note"));

    const isNoteExist = noteExists(activeNoteId);

    const handleSaveNote = () => {
        if (!canProceed) return null;
        if (!activeNoteId) return null;

        if (!isNoteExist) {
            if (!query) return;

            const [city, country] = query.split(", ");
            addNote({
                id: activeNoteId,
                title: noteTitle,
                attachedLocation: {
                    city,
                    country
                },
                text: noteContent,
                timestamp: Date.now()
            });
        } else {
            updateExistingNote({
                id: activeNoteId,
                title: noteTitle,
                text: noteContent,
                timestamp: Date.now()
            });
        }

        removeSearchParam("note");
    };

    const handleDiscardNote = () => {
        if (noteContent.length === 0 && noteTitle.length === 0) {
            removeSearchParam("note");
            return;
        }

        if (confirm("Are you sure you want to discard this note?")) {
            removeSearchParam("note");
        }
    };

    const handleClose = () => {
        removeSearchParam("note");
    };

    const handleDeleteNote = () => {
        if (!activeNoteId) return null;

        if (confirm("Are you sure you want to delete this note?")) {
            removeNote(activeNoteId);
            removeSearchParam("note");
        }
    };

    useKeyboardShortcut({
        onTrigger: (shortcut) => {
            switch (shortcut.key) {
                case 's':
                    handleSaveNote();
                    break;
                case 'Enter':
                    handleSaveNote();
                    break;
                case 'd':
                    if (!activeNoteId) return;
                    removeNote(activeNoteId);
                    break;
                case 'Escape':
                    handleClose();
                    break;
            }
        },
        shortcuts: [
            { key: 's', ctrlKey: true },
            { key: 'Enter', ctrlKey: true, isSpecialKey: true },
            { key: 'd', ctrlKey: true },
            { key: 'Escape', isSpecialKey: true }
        ]
    })

    return (
        <motion.div
            className="note"
            ref={noteRef}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
        >
            <div className="title">
                <FaPaperclip />
                <input
                    placeholder="Add a title note..."
                    maxLength={50}
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <FaTrash className="delete-icon" onClick={handleDeleteNote} />
            </div>
            <span className="timestamp">{isNoteExist && previousNoteData ? new Date(previousNoteData.timestamp).toLocaleDateString() : ''}</span>
            <div className="note-content">
                <textarea
                    placeholder="Add a note..."
                    maxLength={500}
                    value={noteContent}
                    className="lead"
                    onChange={(e) => setNoteContent(e.target.value)}
                />
            </div>

            <div className="btns">
                {!isNoteExist && <button className="btn outline" onClick={handleDiscardNote}>Discard</button>}
                {isNoteExist && <button className="btn bad" onClick={handleClose}>Close</button>}
                <button
                    className={clsx(
                        "btn good",
                        canProceed ? "" : "disabled"
                    )}
                    onClick={handleSaveNote}
                >Save</button>
            </div>

        </motion.div>
    );
}
