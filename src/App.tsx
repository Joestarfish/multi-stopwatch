import { useEffect } from 'react'
import './App.css'
import Card from './Card'
import CardContainer from './CardContainer'
import PlaceholderCard from './PlaceholderCard'
import { useArray } from './hooks/useArray'
import { useLocalStorage } from './hooks/useLocalStorage'

export type CardInfo = {
  id: string
  title?: string
  numberOfMs?: number
}

function App() {

  const [savedCards, setSavedCards] = useLocalStorage<CardInfo[]>('cards', [
    { id: crypto.randomUUID().toString() },
    { id: crypto.randomUUID().toString() },
    { id: crypto.randomUUID().toString() },
  ])

  const {
    array: cards,
    push: pushCard,
    remove: removeCard,
    replace: replaceCard
  } = useArray<CardInfo>(savedCards);

  useEffect(() => {
    setSavedCards(cards);
  }, [cards]);

  return (
    <CardContainer>
      {cards.map((card, index) => (
        <Card key={card.id} cardInfo={card} index={index} removeCard={removeCard} replaceCard={replaceCard} />
      ))}
      <PlaceholderCard pushCard={pushCard} />
    </CardContainer>
  )
}

export default App
