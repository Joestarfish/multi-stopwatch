import { useState } from 'react';
import './CardHeader.css'
import type { CardInfo } from './App';

function CardHeader({ cardInfo, index, removeCard, replaceCard }: {
  cardInfo: CardInfo,
  index: number,
  removeCard: (index: number) => void,
  replaceCard: (index: number, newElement: CardInfo) => void
}) {
  const DEFAULT_TITLE = "Title";

  const [title, setTitle] = useState(cardInfo.title ? cardInfo.title : DEFAULT_TITLE);
  const [editing, setEditing] = useState(false);

  function validateAndSaveTitle() {
    const newTitle = title.trim() || DEFAULT_TITLE;
    setTitle(newTitle);
    replaceCard(index, { ...cardInfo, title: newTitle });
    setEditing(false);
  }

  return (
    <div className="card-header">
      {editing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={validateAndSaveTitle}
          onKeyDown={(e) => e.key === "Enter" && validateAndSaveTitle()}
        />
      ) : (
        <h3 onClick={() => setEditing(true)}>{title}</h3>
      )}

      <button className="close-button" onClick={() => removeCard(index)}>x</button>
    </div>
  )
}

export default CardHeader
