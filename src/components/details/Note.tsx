import { FaArrowRightLong } from "react-icons/fa6";
import { Note } from "../../types";
import { useMyNotes } from "../../store/myNotes";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/Notes.css";
import { getCountrySvg } from "../../utilities";

export default function NoteCard({ note }: { note: Note }) {
    const { setNoteModalOpen } = useMyNotes();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const addSearchParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams); // Preserve existing params
        newParams.set(key, value); // Add or update the param

        navigate({ search: newParams.toString() }, { replace: true }); // Update URL without reloading
        setNoteModalOpen(true, value);
    };
    return (
        <div className="note-card" onClick={() => addSearchParam("note", note.id)}>
            <div className="row">
                <p className="title">{note.title}</p>
                <FaArrowRightLong className="icon" />
            </div>
            <p className="text">{note.text}</p>
            <div className="row">
                <p className="location">
                    <span>{note.attachedLocation.city}, {note.attachedLocation.country}</span>
                    <img src={getCountrySvg(note.attachedLocation.country)} alt="" />
                </p>
                <p className="timestamp">{new Date(note.timestamp).toLocaleString()}</p>
            </div>
        </div>
    )
}
