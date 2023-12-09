import { MdDeleteForever } from 'react-icons/md';

const Note = (props) =>{
  
    return(
        <div className="note">
            <span>
                {props.text}
            </span>
            <div className="note-footer">
                <small>{props.date}</small>
                <MdDeleteForever className="delete" onClick={()=>props.handleDeleteNote(props.id)} size={'1.3rem'}/>
            </div>
        </div>
    )
}

export default Note;