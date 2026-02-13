import { useEffect, useRef, useState } from 'react'
import { Duration } from 'luxon';
import './Card.css'
import CardHeader from './CardHeader';
import { RiResetLeftLine } from 'react-icons/ri';
import type { CardInfo } from './App';

function Card({ cardInfo, index, removeCard, replaceCard }: {
  cardInfo: CardInfo,
  index: number,
  removeCard: (index: number) => void,
  replaceCard: (index: number, newElement: CardInfo) => void
}) {
  const [isTicking, setIsTicking] = useState(false)
  const [numberOfMs, setCurrentNumberOfMs] = useState(cardInfo.numberOfMs ? cardInfo.numberOfMs : 0);
  const nextAnimationFrame = useRef<number>(null);
  const lastTick = useRef<number>(null);


  function pause() {
    setIsTicking(false);
    replaceCard(index, { ...cardInfo, numberOfMs });
  }

  function start() {
    setIsTicking(true);
  }

  function reset() {
    setIsTicking(false);
    setCurrentNumberOfMs(0);
    replaceCard(index, { ...cardInfo, numberOfMs: 0 });
  }


  useEffect(() => {
    if (!isTicking) {
      return;
    }

    function doTick(timestamp: number) {
      if (!isTicking) {
        return;
      }

      if (lastTick.current) {
        const delta = timestamp - (lastTick.current ?? 0);
        setCurrentNumberOfMs((ms) => ms + delta);
      }

      lastTick.current = timestamp;
      nextAnimationFrame.current = requestAnimationFrame(doTick);
    }

    nextAnimationFrame.current = requestAnimationFrame(doTick);

    return () => cancelAnimationFrame(nextAnimationFrame.current!);
  }, [isTicking]);

  const formattedTime = Duration.fromMillis(numberOfMs).toFormat("hh:mm:ss.SSS");

  return (
    <>
      <div className="card">

        <CardHeader cardInfo={cardInfo} index={index} removeCard={removeCard} replaceCard={replaceCard} />

        <div className="stopwatch-container">
          <pre>
            <p>{formattedTime}</p>
          </pre>

          <div className="buttons-container">
            <button
              className="pause"
              onClick={isTicking ? pause : start}>
              {isTicking ? 'Pause' : 'Start'}
            </button>

            <button
              className="reset"
              onClick={reset}>
              <RiResetLeftLine />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
