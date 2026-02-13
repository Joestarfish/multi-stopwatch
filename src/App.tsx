import { useEffect } from 'react'
import './App.css'
import Card from './Card'
import CardContainer from './CardContainer'
import PlaceholderCard from './PlaceholderCard'
import { useArray } from './hooks/useArray'
import { useLocalStorage } from './hooks/useLocalStorage'
import { v4 } from 'uuid'

export type CardInfo = {
  id: string
  title?: string
  numberOfMs?: number
}

function App() {

  const [savedCards, setSavedCards] = useLocalStorage<CardInfo[]>('cards', [
    { id: v4() },
    { id: v4() },
    { id: v4() },
  ])

  const {
    array: cards,
    push: pushCard,
    remove: removeCard,
    replace: replaceCard
  } = useArray<CardInfo>(savedCards);

  useEffect(() => {
    setSavedCards(cards);
  }, [cards, setSavedCards]);

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
