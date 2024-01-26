import { useState } from "react";
import { MdClose } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const AddNote = ({ addNote, setOpenModal }) => {
  const [text, setText] = useState({
    textArea:'',
    emoji:null,
  });
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const characterLimit = 200;

  const handleChange = (event) => {
    if (event.target.value.length >= 0) {
      setText((prevState)=>({
        ...prevState,
        textArea:event.target.value,
      }));
    }
  };

  const handleEmoji =(event)=>{
    setText((prevState)=>({
      ...prevState,
      textArea:prevState.textArea+event.emoji,
    }));
  }
  // const addEmoji = (e) => {
  //   console.log(text);
  //   let sym = e.unified.split("-");
  //   let codesArray = [];
  //   sym.forEach((el) => codesArray.push("0x" + el));
  //   let emoji = String.fromCodePoint(...codesArray);
  //   setText(text + emoji);
  //   console.log(text);
  // };

  const handleSaveNote = () => {
    if (text.textArea.trim().length > 0) {
      addNote(text.textArea);
      setText("");
      setOpenModal(false);
    } else {
      alert("Please enter your note first!");
    }
  };
  return (
    <div className="note add-note">
      <MdClose
        className="close"
        onClick={() => setOpenModal(false)}
        size={"1.3rem"}
      />
      <textarea
        rows="8"
        cols="10"
        placeholder="Add text here..."
        value={text.textArea}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - text.length} remaining </small>
        <div
          className="open-emoji-picker"
          onClick={() =>
            setOpenEmojiPicker((openEmojiPicker) => !openEmojiPicker)
          }
        >
          😃
        </div>
        <div className="save" onClick={handleSaveNote}>
          Save note
        </div>
      </div>
      <div className="emojipicker">
        {openEmojiPicker && <EmojiPicker onEmojiClick={handleEmoji} />}
      </div>
    </div>
  );
};

export default AddNote;
