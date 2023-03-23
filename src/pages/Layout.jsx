import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LoginPage from "../pages/LoginPage";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const Layout = () => {

  const [notes, setNotes] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedInUser")) || false
  );

  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("userEmail")) || null
  ); // state to store email information


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


  const handleAddNote = () => {
    const uuid = uuidv4();
    const base_url = `https://qqh42evuovuh6yj43esr3sse5a0yqvqt.lambda-url.ca-central-1.on.aws/`
    const current_time = new Date().toISOString().slice(0, 16);

    const params = new URLSearchParams({
      email: email,
      note_id: uuid,
      title: "Untitled",
      html: "",
      text: "",
      timestamp: current_time
    });

    axios
      .post(`${base_url}?${params}`)
      .then((response) => {
        if(response.status === 200){
          const updatedNotes = [response.data.note, ...notes];
          setNotes(updatedNotes);
          navigate(`/notes/${response.data.note.note_id}`);
        }
      });
  };

  const handleNoteChange = (htmlEdit, textEdit, titleEdit, timeEdit, email, uuid) => {

    const base_url = `https://qqh42evuovuh6yj43esr3sse5a0yqvqt.lambda-url.ca-central-1.on.aws/`
    const params = new URLSearchParams({
      email: email,
      note_id: uuid,
      title: titleEdit,
      html: htmlEdit,
      text: textEdit,
      timestamp: timeEdit
    });

    //check if the note actually changed
    const note = notes.find((note) => note.note_id === uuid);
    if (note.html === htmlEdit && note.text === textEdit && note.title === titleEdit && note.timestamp === timeEdit) {
      return;
    }

    axios
      .post(`${base_url}?${params}`)
      .then((response) => {
        if(response.status === 200){
          //Find the note that was updated and update it in the notes state
          const updatedNotes = notes.map((note) => {
            if (note.note_id === response.data.note.note_id) {
              return response.data.note;
            }
            return note;
          });
          setNotes(updatedNotes);
        }
      });
  };

  const handleDelete = (id) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {

      const base_url = `https://6j35fygjjkpgx4voyxpjkenn5m0tavjq.lambda-url.ca-central-1.on.aws/`
      const params = new URLSearchParams({
        email: email,
        note_id: id
      });
  
      axios
        .delete(`${base_url}?${params}`)
        .then((response) => {
          if(response.status === 200){
            //Update notes state
            const updatedNotes = notes.filter((note) => note.note_id !== id);
            setNotes(updatedNotes);
            navigate(`/notes`);
          }
        });

    }
  }

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

  //Get notes when app is created and email changes
  useEffect(() => {
    const baseURL = `https://dauvuem7d7izepkhvt2cvl2slu0akbvk.lambda-url.ca-central-1.on.aws/?email=${email}`
    axios.get(`${baseURL}`).then((response) => {
      setNotes(response.data);
    });
  }, [email]);


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
              <Outlet context={[notes, handleNoteChange, handleDelete]} />
            </div>
          ) : (
            <div className="col-span-4">
              <Outlet context={[notes, handleNoteChange, handleDelete]} />
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
