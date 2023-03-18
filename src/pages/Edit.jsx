import { useState, useRef } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Title from '../components/Title';
const Edit = () => {
  const [notes, handleNoteChange] = useOutletContext();
  const { id } = useParams(); 
  const [note, setNote] = useState(notes[id - 1] || {});
  
  const handleContentChange = (htmlEdit) => {
    //get the quill text
    const text = quillRef.current.getEditor().getText() || '';
    //update the note useState
    setNote({
      ...note,
      text: text,
      html: htmlEdit
    });
    console.log(note)
  }
 
  const handleTitleChange = (titleEdit) => {
      setNote({
        ...note,
        title: titleEdit,
      });
  }

  const handleTimeChange = (timeEdit) => {
    setNote({
      ...note,
      time: timeEdit.target.value,
    });
  }

  const handleNoteSave = () => {
    let title = titleRef.current.getEditor().getText();
    handleNoteChange(note.html, id, note.text, title, note.time);
  }



  //create a useRef for quill DOM element
  const quillRef = useRef(null);
  const titleRef = useRef(null);

  return (
    <>
      <Title title={note.title} time={note.time} id={id} mode="edit" handleNoteSave={handleNoteSave} handleTitleChange={handleTitleChange} titleRef={titleRef} handleTimeChange={handleTimeChange}/>
      <ReactQuill ref={quillRef} value={note.html} onChange={handleContentChange} className='textEdit'/>
    </>
  )
}

export default Edit