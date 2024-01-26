import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import Note from "./Note";
import AddNote from "./AddNote";
import SearchNote from "./SearchNote";
import Modal from "./Modal";

const AllNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "My first note",
      date: "07/11/1999",
    },
    {
      id: nanoid(),
      text: "My 2nd note",
      date: "08/11/1999",
    },
    {
      id: nanoid(),
      text: "My 3rd note",
      date: "09/11/1999",
    },
    {
      id: nanoid(),
      text: "My 4th note",
      date: "10/11/1999",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [previousMode, setPreviousMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // const getNotes = JSON.parse(localStorage.getItem('my-notes'));
    // if(getNotes){
    //   setNotes(getNotes);
    // }
    axios
      .get(
        "https://mynotes-fbc86-default-rtdb.asia-southeast1.firebasedatabase.app/"
      )
      .then(
        (res) => setNotes(res.data.notes)
        // console.log(res)
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // localStorage.setItem('my-notes',JSON.stringify(notes));
    axios
      .put(
        "https://mynotes-fbc86-default-rtdb.asia-southeast1.firebasedatabase.app/",
        { notes }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [notes]);

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    setNotes([...notes, newNote]);
  };

  return (
    <div className={`${previousMode && "dark-mode"}`}>
      <div className="container">
        <Header handleTheme={setPreviousMode} setOpenModal={setOpenModal} />
        <SearchNote handleSearch={setSearchText} />
        {openModal &&
        <Modal>
          <AddNote addNote={addNote} setOpenModal={setOpenModal}/>
        </Modal>
          }

        <div className="allNotes-container">
          {notes
            .filter((note) => note.text.toLowerCase().includes(searchText))
            .map((note) => (
              <Note
                id={note.id}
                text={note.text}
                date={note.date}
                handleDeleteNote={handleDeleteNote}
                handleAddNote={addNote}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const Header = ({ handleTheme, setOpenModal }) => {
  return (
    <div className="header">
      <h1>My Notes</h1>
      <button
        className="save"
        onClick={() => handleTheme((previousMode) => !previousMode)}
      >
        Toggle Theme
      </button>
      <button className="save" onClick={() => setOpenModal(true)}>
        Add Note
      </button>
    </div>
  );
};

export default AllNotes;
