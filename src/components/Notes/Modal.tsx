import "../../styles/Notes.css";
import Note from "./Note";
import { motion } from "framer-motion";

export default function Modal() {
    return (
        <div className="modal-container">
            <motion.div
                className="bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            ></motion.div>
            <Note />
        </div>
    )
}
