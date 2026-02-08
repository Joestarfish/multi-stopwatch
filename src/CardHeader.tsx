import { useEffect, useState } from 'react';
import './CardHeader.css'

function CardHeader() {
  const DEFAULT_TITLE = "Title";

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // If the field was emptied we do not want to let it disappear
    if (!editing && !title.trim()) {
      setTitle(DEFAULT_TITLE);
    }
  }, [editing]);

  return (
    <div className="card-header">
      {editing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
        />
      ) : (
        <h3 onClick={() => setEditing(true)}>{title}</h3>
      )}

      <button className="close-button" onClick={() => console.log("TODO: Add a close feature")}>x</button>
    </div>
  )
}

export default CardHeader
