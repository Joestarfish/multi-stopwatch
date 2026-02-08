import { useEffect, useRef, useState } from 'react'
import { Duration } from 'luxon';
import './Card.css'
import CardHeader from './CardHeader';

function Card() {
  const [isTicking, setIsTicking] = useState(false)
  const [numberOfMs, setCurrentNumberOfMs] = useState(0);
  const interval = useRef<number>(null);
  const lastTick = useRef<Date>(null);
  const formattedTime = useRef("00:00:00.000");

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
    formattedTime.current = Duration.fromMillis(numberOfMs).toFormat("hh:mm:ss.SSS");
  }, [numberOfMs]);

  return (
    <>
      <div className="card">

      <CardHeader />
       
        <div className="stopwatch-container">
          <pre>
            <p>{formattedTime.current}</p>
          </pre>
          <button onClick={() => setIsTicking(!isTicking)}>{isTicking ? 'Pause' : 'Start'}</button>
        </div>
      </div>
    </>
  )
}

export default Card
