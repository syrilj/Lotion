import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LoginPage from "../pages/LoginPage";
import { useState, useEffect } from "react";



const Layout = () => {
  // get notes from local storage
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedInUser")) || false
  );

  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("userEmail")) || null
  ); // state to store email information

  // update notes in local storage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  
  useEffect(() => {
    localStorage.setItem("isLoggedInUser", JSON.stringify(loggedIn));
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem("userEmail", JSON.stringify(email));
  }, [email]);

  // read loggedIn state from local storage on app load
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("isLoggedInUser"));
    if (loggedInUser) {
      setLoggedIn(true);
    }
  }, []);
  let navigate = useNavigate();

  // add a new note to the notes state
  const handleAddNote = () => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const newNote = { title: "Untitled", text: "", html: "", time: "" };
    const updatedNotes = [newNote, ...savedNotes];
    setNotes(updatedNotes);
    navigate(`/notes/1`);
  };

  const handleNoteChange = (htmlEdit, id, textEdit, titleEdit, timeEdit) => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = savedNotes.map((note, index) => {
      if (index === id - 1) {
        return {
          ...note,
          text: textEdit,
          title: titleEdit,
          time: timeEdit,
          html: htmlEdit,
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = (email) => {
    setEmail(email);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setEmail(null);
    setLoggedIn(false);
    localStorage.removeItem("token");
    window.localStorage.removeItem("isLoggedInUser");
    navigate('/');
  };



  return (
    <div className="flex flex-col h-screen">
      <Header
        onToggleSidebar={handleToggleSidebar}
        onLogout={handleLogout}
        email={email} // pass email information to Header component as prop
        isLoggedIn={loggedIn}
      />
      {loggedIn ? (
        <div className="flex-1 grid grid-cols-4">
          {sidebarOpen && (
            <Sidebar
              className="flex-grow"
              onAddNote={handleAddNote}
              notes={notes}
            />
          )}
          {sidebarOpen ? (
            <div className="col-span-3">
              <Outlet context={[notes, handleNoteChange]} />
            </div>
          ) : (
            <div className="col-span-4">
              <Outlet context={[notes, handleNoteChange]} />
            </div>
          )}
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
  
      }
export default Layout;
