import { useEffect, useState } from 'react';
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

  useEffect(() => {
    // If the field was emptied we do not want to let it disappear
    if (!editing && !title.trim()) {
      setTitle(DEFAULT_TITLE);
    }
  }, [editing]);

  useEffect(() => {
    cardInfo.title = title;
    replaceCard(index, cardInfo);
  }, [title]);

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

      <button className="close-button" onClick={() => removeCard(index)}>x</button>
    </div>
  )
}

export default CardHeader
