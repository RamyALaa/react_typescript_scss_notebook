import NoteForm, { NoteFormProps } from "./NoteForm";

const NewNote = ({onSubmit} : NoteFormProps) => {
    return (  <>
        <NoteForm onSubmit={onSubmit}/>
    </>);
}
 
export default NewNote;