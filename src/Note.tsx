// affiché info, add button update, delete and back

import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";

type NoteProps = {
    onDeleteNote : (id : string) => void
}

const Note = ({onDeleteNote} : NoteProps) => {
const note = useNote();
const navigate = useNavigate();
    return ( <>
        <div className="gap-8 flex justify_start align_items_center">
            <h1 className="title">{note.title}</h1>
        <Link to={`/${note.id}/edit`}>
            <button className="button_blue">Edit</button>
        </Link>
        <button onClick={()=> {onDeleteNote(note.id) 
            navigate("/")}} className="button_red ">Delete</button>
        <Link to={`/`}>
            <button>Cancel</button>
        </Link>
        </div>
        
        {note.tags.length > 0 && note.tags.map(tag => <span key={tag.id}>tag.label</span>)}
        <p>{note.markdown}</p>
    </> );
}
 
export default Note;