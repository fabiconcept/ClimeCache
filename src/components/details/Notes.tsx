import { useMyNotes } from "../../store/myNotes";
import "../../styles/Notes.css";
import { Param } from "../../types";
import Note from "./Note";

export default function Notes({ param }: { param: Param }) {
    const { myNotes } = useMyNotes();
    const notesRelatedToLocation = myNotes.filter((note) => note.attachedLocation.city === param.knownCity.city && note.attachedLocation.country === param.knownCity.country)

    if (notesRelatedToLocation.length === 0) return null;

    return (
        <div className="notes-container">
            <p className="title">Notes <span>({notesRelatedToLocation.length < 9 ? "0" : ""}{notesRelatedToLocation.length > 99 ? "99+" : notesRelatedToLocation.length})</span></p>
            <div className="notes">
                {notesRelatedToLocation.map((note, index) => (
                    <Note key={index} note={note} />
                ))}
            </div>
        </div >
    )
}
