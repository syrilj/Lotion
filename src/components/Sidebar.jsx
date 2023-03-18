
import Note from "./Note";
import { Link } from "react-router-dom";

const Sidebar = ({ onAddNote, notes }) => {

  
  return (
    <div className='border-r-2 overflow-y-auto'>
      <div className='flex justify-between py-2 px-4 border-b-2'>
        <h1 className="text-2xl font-bold text-center">Notes</h1>
        <button className='text-xl hover:text-gray-600' onClick={onAddNote}>+</button>
      </div>
      <div>
        {notes.length > 0 ? notes.map((note, index) => {
          return (
            <Link to={`/notes/${index + 1}`} key={index}>
              <Note key={index} title={note.title} text={note.text} time={note.time}/>
            </Link>
          )
        }) : <p className="text-center py-2 text-gray-400">No Notes Yet</p>}
      </div>
    </div>
  );
}

export default Sidebar;







