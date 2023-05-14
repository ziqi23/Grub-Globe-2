import { ProgressBar, Step } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import "./Badges.css"
const BadgesProgressBar = ({badge}) => {

    const levels = ["Beginner", "Intermediate", "Expert", "Master", "Legend"]

    return (
        <div className="badge-info-container">
            <img src={badge.icon} alt="icon" />
            <h1>{badge.title}</h1>
            <p>{badge.description}</p>
            <ProgressBar 
                percent={55}
                filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"    
            >
                {levels.map((level, i) => (
                    <Step transition="scale" >
                    {({accomplished}) => (
                            <div className="milestone-container">
                                <div className={ accomplished ? "accomplished-milestone-dot" : "milestone-dot"} />
                                <h1>{level}</h1>
                            </div>
                    )}
                </Step>
                ))}
            </ProgressBar>


        </div>
    );
};

export default BadgesProgressBar;