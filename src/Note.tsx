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
        <div className="gap-8 flex justify_start align_items_center mw-1000 mb-20">
            <div className="flex vertical justify_start w-100   ">
                <h1 className="title mb-6">{note.title}</h1>
                <div className="flex justify_center align_items_center gap-4 mb-10">
                    {note.tags.length > 0 && note.tags.map(tag => <span className="badge" key={tag.id}>{tag.label}</span>)}
                </div>
            </div>
            
            <Link to={`/${note.id}/edit`}>
                <button className="button_blue">Edit</button>
            </Link>
        <button onClick={()=> {onDeleteNote(note.id) 
            navigate("/")}} className="button_red ">Delete</button>
        <Link to={`/`}>
            <button>Cancel</button>
        </Link>
        </div>
        <p className="mw-600">{note.markdown}</p>

    </> );
}
 
export default Note;