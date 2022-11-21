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
        <div className="flex vertical">
            <div className="row title_card" >{title}</div>
            <div className="row tags_card flex">
                {tags.length > 0 && 
                tags.map(tag => {return (
                    <span key={tag.id}>tag.label</span>
                )})
                }
            </div>
        </div>
        </Link> 
     );
}
 
export default NoteCard;