import CreatableReactSelect from 'react-select/creatable'
import {Link} from "react-router-dom"
import { useRef, useState } from 'react'
import { NoteData, Tag } from './App'

export type NoteFormProps = {
    onSubmit : (data : NoteData) => void
}


const NoteForm = ({onSubmit}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null) ;
    const markdownRef = useRef<HTMLTextAreaElement>(null) ; 
const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleSubmit = (e : SubmitEvent) =>{
       e.preventDefault();
       onSubmit({
        title : titleRef.current!.value,
        markdown : markdownRef.current!.value,
        tags : selectedTags
       }) 
    }
    return (   
    <form onSubmit={() =>handleSubmit}> 
        <div className="flex jusitfy align_items_center row">
            <div className="col">
                <label htmlFor='title' className='block'>Title</label>
                <input type="text" required={true} ref={titleRef} id="title"></input>
            </div>
            <div className="col">
                <label htmlFor='tags'>Tags</label>
                <CreatableReactSelect 
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