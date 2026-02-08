import './PlaceholderCard.css'
import './Card.css'
import type { CardInfo } from './App';

function PlaceholderCard({pushCard}: {pushCard: (element: CardInfo) => void}) {

  function addCard() {
    pushCard({id: crypto.randomUUID() });
  }

  return (
    <div className="card placeholder-card">
      <div className="card-header">
        <h3>Add a card</h3>
      </div>

      <div className="stopwatch-container">
        {/* Keep this part to have a similar height when it is alone on it's own row */}
        <pre className="noselect">
          <p> </p>
        </pre>

        <button onClick={addCard}>Add a stopwatch</button>
      </div>
    </div>
  )
}

export default PlaceholderCard
