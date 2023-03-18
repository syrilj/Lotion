const Header = ({onToggleSidebar}) => {
  return (
    <header className="grid grid-cols-3 justify-items-center py-3 px-6 border-b-2">
      <button className="text-gray-700 hover:text-gray-900 focus:outline-none text-3xl justify-self-start hover:text-4xl" onClick={onToggleSidebar}>
        &#9776;
      </button>
      <div >
        <h1 className="text-3xl font-bold text-center">Lotion</h1>
        <h2 className='text-xs text-gray-600 font-semibold'>Like Notion, but worse.</h2>
      </div>
    </header>
  )
}

export default Header