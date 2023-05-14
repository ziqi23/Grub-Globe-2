import "./Timer.css"
import { useEffect, useState } from "react";
import {BiUpArrow, BiDownArrow} from "react-icons/bi"

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [startCountdown, setStartCountdown] = useState(false)

    const format = (unit) => {
        return unit.toString().length === 1 ? "0" + unit : unit
    }

    const increase = (num, setter) => {
        if (num < 0 || num === 59 ) {
            return undefined
        } else if ( num < 60 ) {
            setter(num + 1)
        }
    }

    const decrease = (num, setter) => {
        if (num <= 0 || num === 60 ) {
            return undefined
        } else if ( num < 60 ) {
            setter(num - 1)
        }
    }

    const countdown = () => {
        if (seconds === 0 && minutes === 0 && hours === 0 ) {
            setStartCountdown(false);
            return undefined
        };
        if (seconds === 0) {
            setTimeout(setMinutes(minutes - 1), 1000)
            setTimeout(setSeconds(59), 1000)
        } else if (seconds > 0 && seconds < 60) {
            setTimeout(setSeconds(seconds - 1), 1000)
        }

        if (minutes === 0) {
            setHours(hours - 1)
        }
    }

    useEffect(() => {
        if (startCountdown) {
            countdown();
        }
    }, [startCountdown, seconds, minutes, hours])
    return (
        <>
            <form>
                <select name="hours" id="hours">
                    

                </select>
            </form>
            <div id="timer-container">
                <div className="timer-unit-container" >
                    {/* <BiUpArrow onClick={() => increase(hours, setHours)} className="increase-decrease-button" /> */}
                    <h2 className="timer">{format(hours)}</h2>
                    {/* <BiDownArrow onClick={() => decrease(hours, setHours)} className="increase-decrease-button" /> */}
                </div>
                <h2 className="timer">:</h2>
                <div className="timer-unit-container">
                    {/* <BiUpArrow onClick={() => increase(minutes, setMinutes)} className="increase-decrease-button" /> */}
                    <h2 className="timer">{format(minutes)}</h2>
                    {/* <BiDownArrow onClick={() => decrease(minutes, setMinutes)} className="increase-decrease-button" /> */}
                </div>
                <h2 className="timer">:</h2>
                <div className="timer-unit-container">
                    {/* <BiUpArrow onClick={() => increase(seconds, setSeconds)} className="increase-decrease-button" /> */}
                    <h2 className="timer">{format(seconds)}</h2>
                    {/* <BiDownArrow onClick={() => decrease(seconds, setSeconds)} className="increase-decrease-button" /> */}
                </div>
            </div>
            <br></br>
            <div onClick={() => setStartCountdown(true)} className="start-timer-button">Start Timer</div>
        </>
    )
};

export default Timer;