import { NoteData, Tag } from "./App";
import NoteForm from "./NoteForm";
import { useNote } from "./NoteLayout";
type EditNoteProps = {
     onSubmit: (id : string, data : NoteData) => void
     onAddTag : (tag : Tag) => void
     availableTags : Tag[] ;
}

const EditNote = ({onSubmit, onAddTag, availableTags} : EditNoteProps) => {
    const note = useNote();
    return (  <>
        <NoteForm 
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
        onSubmit={(data) => onSubmit(note.id, data)} 
        onAddTag={onAddTag} 
        availableTags={availableTags} />
    </>);
}
 
export default EditNote;