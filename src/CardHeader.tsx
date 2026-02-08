import './CardHeader.css'

function CardHeader() {
  return (
    <div className="card-header">
      <h3>Title</h3>
      <button className="close-button" onClick={() => console.log("TODO: Add a close featuer")}>x</button>
    </div>
  )
}

export default CardHeader
