import Title from '../components/Title'
import { useParams, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Home = () => {

  const { id } = useParams();  
  const [notes] = useOutletContext();
  //Get notes from local storage and use the the getParams hook to get the id of the note using useEffect
  useEffect(() => {
    if (notes !== null) {
      setNote(notes[id - 1]);
    }

   }, [notes, id]);



  const [note, setNote] = useState({});
  
  return (
    <>
      {note === undefined ? 
      <div className='flex justify-center items-center h-full'>
      <h1 className='text-3xl text-gray-400'>Select a note, or create a new one.</h1>
      </div> 
      :
      <>
        <Title title={note.title || 'Untitled'} time={note.time || new Date().toLocaleString()} id={id}/>
        <div dangerouslySetInnerHTML={{ __html: note.html}} className='px-3 py-2'></div>
      </>
      }
    </>

  )
}

export default Home