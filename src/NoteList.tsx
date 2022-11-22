import { Note, Tag } from "./App"
import ReactSelect from 'react-select'
import {Link} from 'react-router-dom'
import {  useState } from 'react'
import { useMemo } from 'react'
import NoteCard from "./NoteCard"
// add button edit tags
// add display list tags
type NoteListProps = {
    notes : Note[]
    availableTags : Tag[]
    onUpdateTag : (id : string, label : string) => void
    onDeleteTag : (id : string) => void
}

type ModalEditTagsProps = {
    show : boolean
    handleClose : () => void
    availableTags : Tag[]
    onUpdateTag : (id : string, label : string) => void
    onDeleteTag : (id : string) => void
}
export function NoteList({notes, availableTags, onDeleteTag, onUpdateTag}:NoteListProps){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [editTagModalIsOpen, setEditTagIsOpen] = useState(false) ; 

    const handleClose = () => {
        setEditTagIsOpen(false) 
    }


    const filterdNotes = useMemo(()=>{
        return notes.filter(note => {
           return (title==="" || note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags] )
    return ( <>
        <div className="flex gap-8 align_items_center mw_1000">
            <h1 className="col title">Notes</h1>
            <Link to="/new"><button className="button_blue">Create</button></Link>
            <button onClick={()=> setEditTagIsOpen(true)}>Edit tags</button>
        </div>
        <form className="mb-10">
            <div className="flex gap-8  flex_item_equaljustify_start align_items_center">
                <div className="col w-100 mw_450">
                    <label htmlFor="title" className="block">Title</label>
                    <input type="text" value={title} onChange={e=> setTitle(e.target.value)}  id="title"/>
                </div>
                <div className="col w-100 mw_450">
                    <label htmlFor="tags">Tags</label>
                    <ReactSelect 
                    options={
                        availableTags.map(tag=>{return {
                            label: tag.label, value : tag.id
                        }})
                    }
                    id="tags" 
                    isMulti
                    value={selectedTags.map(tag=> {
                        return { label : tag.label, value : tag.id}
                    })}
                    onChange={tags => {setSelectedTags(tags.map(tag => {
                        return { label : tag.label, id : tag.value}
                    }))}}
                />   
                </div>
            </div>
        </form>
        <div className="grid list_card gap-10 align_content_center justify_start">
            {filterdNotes.map(note =>
                <div className="flex" key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                </div>

            )}
        </div>
        <ModalEditTags show={editTagModalIsOpen} handleClose={handleClose} availableTags={availableTags} onDeleteTag={onDeleteTag} onUpdateTag={onUpdateTag}/>
    </>
    )
}


const ModalEditTags = ({ show, handleClose, availableTags, onUpdateTag, onDeleteTag} : ModalEditTagsProps) => {
    return ( 
        
        
     <div className="modal_wrapper"  data-show={show.toString()}>
        <div className="dark_background" onClick={()=> handleClose()}   ></div>
            <div className="modal flex  vertical ">
                <div className="flex align_items_center">
                    <h2 className="modal_title">Edit Tags</h2>
                    <button className="modal_exit flex justify align_items_center" onClick={() => handleClose()} >X</button>
                </div>
                {availableTags.map(tag => { return (
                    <div className="liste_tags gap-8 flex align_items_center" key={tag.id}>
                        <input value={tag.label} 
                            onChange={e => onUpdateTag(tag.id, e.target.value)}
                        />
                        <button onClick={() => onDeleteTag(tag.id)}>x</button>
                    </div> )   
                })}
                <button className="close_button button_blue mt-10" onClick={()=> handleClose()}>Close</button>
            </div>
        </div>
    );
}


 
