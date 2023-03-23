import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Title from '../components/Title';

const Edit = () => {
  const [notes, handleNoteChange, handleDelete] = useOutletContext();
  const { id } = useParams();
  const [note, setNote] = useState({});

  useEffect(() => {
    if (notes !== null) {
      const note = notes.find((note) => note.note_id === id);
      setNote(note);
    }
   }, [notes, id]);

  const handleContentChange = (htmlEdit) => {
    if (quillRef.current) { // <-- add null check here
      //get the quill text
      const text = quillRef.current.getEditor().getText() || '';
      //update the note useState
      setNote(prevNote => ({
        ...prevNote,
        text: text,
        html: htmlEdit
      }));
    }
  }
  
  const handleTitleChange = useCallback((titleEdit) => {
    setNote(prevNote => ({
      ...prevNote,
      title: titleEdit
    }));
  }, []);

  const handleTimeChange = (timeEdit) => {
    setNote(prevNote => ({
      ...prevNote,
      timestamp: timeEdit.target.value,
    }));
  };

  const handleNoteSave = useCallback(() => {
    let title = titleRef.current.getEditor().getText();
    handleNoteChange(note.html, note.text, title, note.timestamp, note.email, note.note_id);
  }, [handleNoteChange, note]);

  const quillRef = useRef(null);
  const titleRef = useRef(null);

  return (
    <>
      <Title
        title={note.title}
        time={note.timestamp}
        id={id}
        mode="edit"
        handleNoteSave={handleNoteSave}
        handleTitleChange={handleTitleChange}
        titleRef={titleRef}
        handleTimeChange={handleTimeChange}
        handleDelete={handleDelete}
      />
      <ReactQuill
        ref={quillRef}
        value={note.html}
        onChange={handleContentChange}
        className="textEdit"
      />
    </>
  );
};

export default Edit;

