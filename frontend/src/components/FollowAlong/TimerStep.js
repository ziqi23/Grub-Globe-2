import Timer from "./Timer";

const TimerStep = ({step}) => {
    const numberMapping = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9,
        "ten": 10,
        "fifteen": 15,
        "twenty": 20,
        "thirty": 30,
        "forty": 40,
        "fifty": 50,
        "sixty": 60
    }

    const unitMapping = {
        "second": 1,
        "minute": 60,
        "hour": 3600
    }

    // Format recipe instructions e.g. from 'twenty minutes' to '20 minutes'
    let formattedStep = step;
    for (let word in numberMapping) {
        formattedStep = formattedStep.replaceAll(word, numberMapping[word])
    }

    // Match for time range, e.g. "2 - 3 minutes, 1 - 1.5 hours, 45 minutes - 1 hour, fifteen to twenty minutes"
    const regex = /([0-9]+)\s*(second|minute|hour|)*s*\s*(?:-|to)\s*([0-9]+\.*[0-9]*)\s*(minute|hour)/; //add flags. 
    const match = formattedStep.match(regex)
    
    // Match for multiple units of time, e.g. "3 minutes and 30 seconds, 1 hour and 15 minutes"
    const regex2 = /([0-9]+)\s*(second|minute|hour|)s*\s*and\s*([0-9]+)\s*(second|minute|hour|)/
    const match2 = formattedStep.match(regex2)

    // Match for single unit of time, e.g. "Ten minutes, 20 minutes" NEED: 1 1/2 hours
    const regex3 = /([0-9]+)\s*(second|minute|hour)+/
    const match3 = formattedStep.match(regex3)

    // Parse matched RegEx into seconds to be passed into timer
    let second = 0;
    switch (true) {
        case (!!match): // e.g. 45 minutes - 1 hour
            console.log(match)
            let lowerEndQuantity = parseInt(match[1])
            let lowerEndUnit = match[2] ? match[2] : match[4]
            let higherEndQuantity = parseInt(match[3])
            let higherEndUnit = match[4]
            if (lowerEndUnit !== higherEndUnit) {
                higherEndQuantity *= 60;
            }
            switch (lowerEndUnit) {
                case "hour":
                    second = (lowerEndQuantity + higherEndQuantity) / 2 * 3600
                    break;
                case "minute":
                    second = (lowerEndQuantity + higherEndQuantity) / 2 * 60
                    break;
                case "second":
                    second = (lowerEndQuantity + higherEndQuantity) / 2
                    break;
                default:
                    break;
            }
            break;
        case (!!match2): // e.g. 1 hour and 15 minutes
            let higherEndQuantity2 = parseInt(match2[1])
            let higherEndUnit2 = match2[2]
            let lowerEndQuantity2 = parseInt(match2[3])
            let lowerEndUnit2 = match2[4]
            if (higherEndUnit2 !== lowerEndUnit2) {
                higherEndQuantity2 *= 60
            }
            switch (lowerEndUnit2) {
                case "hour":
                    second = (lowerEndQuantity2 + higherEndQuantity2) * 3600
                    break;
                case "minute":
                    second = (lowerEndQuantity2 + higherEndQuantity2) * 60
                    break;
                case "second":
                    second = (lowerEndQuantity2 + higherEndQuantity2)
                    break;
                default:
                    break;
            }
            break;
        case (!!match3): // e.g. 20 minutes
            let lowerEndQuantity3 = parseInt(match3[1])
            let lowerEndUnit3 = match3[2]
            switch (lowerEndUnit3) {
                case "hour":
                    second = lowerEndQuantity3 * 3600
                    break;
                case "minute":
                    second = lowerEndQuantity3 * 60
                    break;
                case "second":
                    second = lowerEndQuantity3
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

    return (
        <div className="timer-step-container">
            <h1>{step}</h1>
            <Timer second={second}/>
            
        </div>
    )
};

export default TimerStep;