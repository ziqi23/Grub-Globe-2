import "./Timer.css";
import timer from '../../assets/sounds/timer.mp3'
import { useEffect, useState } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

const Timer = ({second}) => {
  let hour = 0;
  let minute = 0;
  while (second >= 3600) {
    hour += 1
    second -= 3600
  }
  while (second >= 60) {
    minute += 1
    second -= 60
  }

  const [seconds, setSeconds] = useState(second);
  const [minutes, setMinutes] = useState(minute);
  const [hours, setHours] = useState(hour);
  const [startCountdown, setStartCountdown] = useState(false);

  let interval;
  useEffect(() => {
    if (startCountdown) {
      interval ||= setInterval(countDown, 1000)
    }
    return function () {
      clearInterval(interval)
    }
  }, [startCountdown, seconds])

  useEffect(() => {
    if (startCountdown && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(interval)
      setStartCountdown(false)
      const audio = new Audio(timer);
      audio.play();
    }
  }, [seconds])

  const format = (unit) => {
    return unit.toString().length === 1 ? "0" + unit : unit;
  };

  const countDown = () => {
    if (seconds > 0) {
      setSeconds(seconds => seconds - 1)
      return;
    }
    else if (minutes > 0) {
      setMinutes(minutes => minutes - 1)
      setSeconds(seconds => seconds + 59)
      return;
    }
    else if (hours > 0) {
      setHours(hours => hours - 1)
      setMinutes(minutes => minutes + 59)
      setSeconds(seconds => seconds + 59)
      return;
    }
  }
  
  function handleTimeChange (e, key, direction) {
    switch (key) {
      case "hour":
        switch(direction) {
          case "up":
            if (hours <= 47) {
              setHours(hours => hours + 1)
            }
            break;
          case "down":
            if (hours >= 1) {
              setHours(hours => hours - 1)
            }
            break;
          default:
            break;
        }
        break;
      case "minute":
        switch(direction) {
          case "up":
              setMinutes(minutes => (minutes + 1) % 60)
            break;
          case "down":
            if (minutes >= 1) {
              setMinutes(minutes => minutes - 1)
            }
            break;
          default:
            break;
        }
        break;
      case "second":
        switch(direction) {
          case "up":
            setSeconds(seconds => (seconds + 1) % 60)
            break;
          case "down":
            if (seconds >= 1) {
              setSeconds(seconds => seconds -= 1)
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
  return (
    <>
      <div id="timer-container">
        <div className="timer-unit-container">
          <div onClick={(e, key="hour", direction="up") => handleTimeChange(e, key, direction)}><BiUpArrow /></div>
          <h2 className="timer">{format(hours)}</h2>
          <div onClick={(e, key="hour", direction="down") => handleTimeChange(e, key, direction)}><BiDownArrow /></div>
        </div>
        <h2 className="timer">:</h2>
        <div className="timer-unit-container">
          <div onClick={(e, key="minute", direction="up") => handleTimeChange(e, key, direction)}><BiUpArrow /></div>
          <h2 className="timer">{format(minutes)}</h2>
          <div onClick={(e, key="minute", direction="down") => handleTimeChange(e, key, direction)}><BiDownArrow /></div>
        </div>
        <h2 className="timer">:</h2>
        <div className="timer-unit-container">
          <div onClick={(e, key="second", direction="up") => handleTimeChange(e, key, direction)}><BiUpArrow /></div>
          <h2 className="timer">{format(seconds)}</h2>
          <div onClick={(e, key="second", direction="down") => handleTimeChange(e, key, direction)}><BiDownArrow /></div>
        </div>
      </div>
      <br></br>
      {!startCountdown && (
      <div
        onClick={() => setStartCountdown(true)}
        className="start-timer-button"
      >
        Start Timer
      </div>
      )}
      {startCountdown && (
      <div
        onClick={() => setStartCountdown(false)}
        className="start-timer-button"
      >
        Pause Timer
      </div>
      )}
    </>
  );
};

export default Timer;
