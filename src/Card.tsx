import { useEffect, useRef, useState } from 'react'
import { Duration } from 'luxon';
import './Card.css'
import CardHeader from './CardHeader';
import { RiResetLeftLine } from 'react-icons/ri';
import type { CardInfo } from './App';

function Card({ cardInfo, index, removeCard }: {
  cardInfo: CardInfo,
  index: number,
  removeCard: (index: number) => void,
}) {
  const [isTicking, setIsTicking] = useState(false)
  const [numberOfMs, setCurrentNumberOfMs] = useState(0);
  const [formattedTime, setFormattedTime] = useState("00:00:00.000");
  const interval = useRef<number>(null);
  const lastTick = useRef<Date>(null);

  useEffect(() => {
    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
    }
  }, []);

  useEffect(() => {
    if (!isTicking && interval.current !== null) {
      clearInterval(interval.current);
      return;
    }


    lastTick.current = new Date();
    interval.current = setInterval(() => {
      const now = new Date();
      const delta = now.getTime() - lastTick.current!.getTime();

      lastTick.current = now;

      setCurrentNumberOfMs((ms) => ms + delta);
    }, 100);
  }, [isTicking]);

  useEffect(() => {
    setFormattedTime(Duration.fromMillis(numberOfMs).toFormat("hh:mm:ss.SSS"));
  }, [numberOfMs]);

  return (
    <>
      <div className="card">

        <CardHeader cardInfo={cardInfo} index={index} removeCard={removeCard} />

        <div className="stopwatch-container">
          <pre>
            <p>{formattedTime}</p>
          </pre>

          <div className="buttons-container">
            <button
              className="pause"
              onClick={() => setIsTicking(!isTicking)}>
              {isTicking ? 'Pause' : 'Start'}
            </button>

            <button
              className="reset"
              onClick={() => { setIsTicking(false); setCurrentNumberOfMs(0); }}>
              <RiResetLeftLine />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
