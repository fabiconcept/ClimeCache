import { useRef } from "react";
import { useMyNotes } from "../../store/myNotes";
import "../../styles/menu-notes.css";
import NoteCard from "../details/Note";
import { useClickAway } from "react-use";
import { motion } from "framer-motion";

export default function MenuNotes({ closeMenu }: { closeMenu: () => void }) {
    const { myNotes } = useMyNotes();
    const containerRef = useRef<HTMLDivElement>(null);

    useClickAway(containerRef, () => closeMenu());
    if (!myNotes) return null;

    return (
        <motion.div
            className="notes-container menu-notes"
            ref={containerRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            <span className="title">My Notes</span>
            {myNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </motion.div>
    )
}
