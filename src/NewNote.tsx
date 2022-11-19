import { NoteData, Tag } from "./App";
import NoteForm, { NoteFormProps } from "./NoteForm";
type NewNoteProps = {
     onSubmit: (data : NoteData) => void
     onAddTag : (tag : Tag) => void
     availableTags : Tag[] ;
}

const NewNote = ({onSubmit, onAddTag, availableTags} : NoteFormProps) => {
    return (  <>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>);
}
 
export default NewNote;