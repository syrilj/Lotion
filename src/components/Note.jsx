import formatDate from "../hooks/formatDate"
const Note = ({title, text, time}) => {
  return (
    <div className="p-2 border-b-2 hover:bg-gray-200">
      <h1 className="text-xl font-semibold">{title}</h1>
      <h2 className="text-xs text-gray-500">{formatDate(time)}</h2>
      <p className="line-clamp-2 text-sm break-all">{text || "..."}</p>
    </div>
  )
}
export default Note