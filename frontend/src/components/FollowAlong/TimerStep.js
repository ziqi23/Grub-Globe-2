const TimerStep = ({step}) => {
    // algorithm for timer
    return (
        <div className="timer-step-container">
            <h1>Bake in oven for 30 minutes</h1>
            <h2 className="timer">00 : 30 : 00</h2>
            <div className="start-timer-button">Start Timer</div>
        </div>
    )
};

export default TimerStep;