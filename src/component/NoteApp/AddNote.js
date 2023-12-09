import { useState } from "react";

const AddNote = ({addNote}) => {
  const [text, setText] = useState("");
  const characterLimit = 200;

  const handleChange = (event)=>{
    if(event.target.value.length>=0){
        setText(event.target.value);
    }
  }

  const handleSaveNote=()=>{
    if(text.trim().length>0){
        addNote(text);
        setText('');
    }else{
      alert("Please enter your note first!");
    }
  }
  return (
    <div className="note add-note">
      <textarea
      rows='8'
      cols='10'
      placeholder="Add text here..."
      value={text}
      onChange={handleChange}
      >

      </textarea>
      <div className="note-footer">
        <small>{characterLimit-text.length} remaining </small>
        <div className="save" onClick={handleSaveNote}>
            Save note
        </div>
      </div>
    </div>
  );
};

export default AddNote;
