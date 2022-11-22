import { Link } from "react-router-dom"
import { Tag } from "./App"



type NoteCardProps = {
    id : string
    title : string
    tags : Tag[]
}


const NoteCard = ({id , title, tags} :NoteCardProps ) => {
    return ( 
        <Link to={`/${id}`}> 
        <div className="notecard margin_auto">
            <h2 className="row title_card text_align_center mb-10 mt-2" >{title}</h2>
            {tags.length > 0 &&
            <div className="row tags_card flex wrap gap-4">
                 
                {tags.map(tag => {return (
                    <span key={tag.id} className='badge'>{tag.label}</span>
                )})}
               
            </div>
             }
        </div>
        </Link> 
     );
}
 
export default NoteCard;