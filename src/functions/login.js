import React from "react";
import { useState } from "react";
import "bulma/css/bulma.css";

function login() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [when, setWhen] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log("submitted", `email is ${email}`);
    setUser(email);
  };

  const onSaveNote = () => {
    const newNote = { title, body, when };
    setNotes([...notes, newNote]);
    setTitle("");
    setBody("");
    setWhen("");
  };

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
          {!user ? (
            <>
              <h2 className="title">Login</h2>
              <form onSubmit={(e) => onFormSubmit(e)}>
                <input
                  className="input"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input type="submit" className="button is-info" value="Submit" />
              </form>
            </>
          ) : (
            <>
              <h2 className="subtitle">Welcome, {user}</h2>
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    <h3 className="subtitle">{note.title}</h3>
                    <p>{note.body}</p>
                    <p>{note.when}</p>
                  </li>
                ))}
              </ul>
              <input
                className="input"
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="textarea my-2"
                cols="10"
                rows="6"
                placeholder="Note Content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <input
                type="datetime-local"
                className="input my-2"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
              <button className="button is-success" onClick={onSaveNote}>
                Save Note
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default login;