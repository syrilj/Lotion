import { Outlet, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useState, useEffect } from "react"

const Layout = () => {

  // get notes from local storage
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // update notes in local storage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  
  let navigate = useNavigate();

  // add a new note to the notes state
  const handleAddNote = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const newNote = { title: 'Untitled', text: '', html: '', time: ''};
    const updatedNotes = [ newNote, ...savedNotes];
    setNotes(updatedNotes);
    navigate(`/notes/1`);
  }

  const handleNoteChange = (htmlEdit, id, textEdit, titleEdit, timeEdit) => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = savedNotes.map((note, index) => {
      if (index === id - 1) {
        return {
          ...note,
          text: textEdit,
          title: titleEdit,
          time: timeEdit,
          html: htmlEdit
        }
      }
      return note;
    });
    setNotes(updatedNotes);
  }
  
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  return (
    <div className="flex flex-col h-screen">
      <Header onToggleSidebar={handleToggleSidebar} />
      <div className="flex-1 grid grid-cols-4">
        {sidebarOpen && (
          <Sidebar className="flex-grow" onAddNote={handleAddNote} notes={notes} />
        )}
        {sidebarOpen ? 
        <div className="col-span-3">
          <Outlet context={[notes, handleNoteChange]} />
        </div>:
        <div className="col-span-4">
          <Outlet context={[notes, handleNoteChange]} />
        </div>}
        
      </div>
    </div>
  )
}

export default Layout