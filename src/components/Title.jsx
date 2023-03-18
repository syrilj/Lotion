import { Link } from "react-router-dom";
import formatDate from "../hooks/formatDate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const Title = ({title, time, id, mode, handleNoteSave, handleTitleChange, titleRef, handleTimeChange}) => {
  
  
  const handleDelete = () => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      const savedNotes = JSON.parse(localStorage.getItem('notes'));
      const filteredNotes = savedNotes.filter((note, index) => index !== parseInt(id) - 1);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
      if(savedNotes.length === 1) {
        window.location.href = '/notes';
      }
      else {
        window.location.href = '/notes/1';
      }
    }
  }




  return (
    <>
      {mode === 'edit' ? 
      <div className='flex justify-between items-center px-3 py-4 border-b-2'>
        <div>
          <ReactQuill ref={titleRef} theme={null} value={title} onChange={handleTitleChange} className="title"/> 
          <input type="datetime-local" value={time} className="text-xs text-gray-500" onChange={handleTimeChange}/>
        </div>
        <div className='flex gap-8'>
          <Link to={`/notes/${id}`}>
            <button className="hover:bg-gray-200 py-3 px-7 border-2 rounded-lg" onClick={handleNoteSave}>Save</button>
          </Link>
          <button onClick={handleDelete} className="hover:bg-gray-200 py-3 px-7 border-2 rounded-lg">Delete</button>
          </div>
      </div> : 
      <div className='flex justify-between items-center px-3 py-4 border-b-2'>
        <div>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <h2 className='text-xs text-gray-500'>{formatDate(time)}</h2>
        </div>
        <div className='flex gap-8 '>
          <Link to={`/notes/${id}/edit`}>
            <button className="hover:bg-gray-200 py-3 px-7 border-2 rounded-lg">Edit</button>
          </Link>
          <button onClick={handleDelete} className="hover:bg-gray-200 py-3 px-7 border-2 rounded-lg">Delete</button>
          </div>
      </div>
      }
    </>
  )
}

export default Title