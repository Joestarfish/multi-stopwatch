import './App.css'
import Card from './Card'
import CardContainer from './CardContainer'
import PlaceholderCard from './PlaceholderCard'
import { useArray } from './hooks/useArray'

export type CardInfo = {
  id: string
  title?: string
}

function App() {

  const { array: cards, push: pushCard, remove: removeCard } = useArray<CardInfo>([
    { id: crypto.randomUUID().toString() },
    { id: crypto.randomUUID().toString() },
    { id: crypto.randomUUID().toString() },
  ]);

  return (
    <CardContainer>
      {cards.map((card, index) => (
        <Card key={card.id} cardInfo={card} index={index} removeCard={removeCard} />
      ))}
      <PlaceholderCard pushCard={pushCard} />
    </CardContainer>
  )
}

export default App
