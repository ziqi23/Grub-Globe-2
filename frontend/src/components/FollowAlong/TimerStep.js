
import Timer from "./Timer";

const TimerStep = ({step}) => {


    // algorithm for timer
    
    return (
        <div className="timer-step-container">
            <h1>{step}</h1>
            <Timer />
            
        </div>
    )
};

export default TimerStep;