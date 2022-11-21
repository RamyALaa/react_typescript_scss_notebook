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
}

export function NoteList({notes, availableTags}:NoteListProps){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");


    const filterdNotes = useMemo(()=>{
        return notes.filter(note => {
           return (title==="" || note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTags] )
    return ( <>
        <div className="flex justify align_items_center">
            <h1 className="col">Notes</h1>
            <div className="col">
                <Link to="/new"><button>Create</button></Link>
                <button>Edit tags</button>
            </div>
        </div>
        <form>
            <div className="flex justify align_items_center">
                <div className="col">
                    <label htmlFor="title" className="block">Title</label>
                    <input type="text" value={title} onChange={e=> setTitle(e.target.value)} id="title"/>
                </div>
                <div className="col">
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
        <div className="grid">
            {filterdNotes.map(note =>
                <div className="flex justify alig_items_center" key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                </div>

            )}
        </div>
    </>
    )
}