import CreatableReactSelect from 'react-select/creatable'
import {Link} from "react-router-dom"
import { FormEvent, useRef, useState } from 'react'
import { Note, NoteData, Tag } from './App'
import {v4 as uuidV4} from 'uuid'
import {useNavigate} from 'react-router-dom'


export type NoteFormProps = {

    onSubmit : (data : NoteData) => void
    onAddTag : (tag : Tag) => void
    availableTags : Tag[] ;
} & Partial<Note>


const NoteForm = ({onSubmit, onAddTag, availableTags, title = "", tags = [], markdown=""}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null) ;
    const markdownRef = useRef<HTMLTextAreaElement>(null) ; 
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const navigate = useNavigate();
    


    const handleSubmit = (e : FormEvent) =>{
       e.preventDefault();
       onSubmit({
        title : titleRef.current!.value,
        markdown : markdownRef.current!.value,
        tags : selectedTags
       }) 
       navigate("..")
    }

    return (   
    <form onSubmit={handleSubmit}> 
        <div className="flex jusitfy align_items_center row">
            <div className="col">
                <label htmlFor='title' className='block'>Title</label>
                <input type="text" required={true} ref={titleRef} id="title" defaultValue={title}></input>
            </div>
            <div className="col">
                <label htmlFor='tags'>Tags</label>
                <CreatableReactSelect 
                    onCreateOption={label =>{
                        const newTag = {id : uuidV4(), label }
                        onAddTag(newTag)
                        setSelectedTags(prevTags => [...prevTags, newTag])
                    }}
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
        <div className='row'>
            <label htmlFor='markdown' className='block'>Body</label>
            <textarea 
                rows={15}  
                id="markdown" 
                className='w-100' 
                ref={markdownRef} 
                required={true}
                defaultValue={markdown}
            />
        </div>
        <div className='flex align_items_center justify_end row'>
            <button type='submit' >Save</button>
            <Link to="..">
                <button type='button' >Cancel</button>
            </Link>
        </div>    
    </form>
    );

    
}
 
export default NoteForm;