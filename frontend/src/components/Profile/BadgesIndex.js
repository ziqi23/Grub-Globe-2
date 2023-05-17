import BadgesProgressBar from "./BadgesProgressBar";
import aroundTheWorldIcon from "../../assets/icons/badge-icons/icons8-around-the-globe-100.png";
import broccoliIcon from "../../assets/icons/badge-icons/icons8-broccoli-100.png";
import composeIcon from "../../assets/icons/badge-icons/icons8-compose-100.png";
import kawaiiIceCreamIcon from "../../assets/icons/badge-icons/icons8-kawaii-ice-cream-100.png";
import restaurantIcon from "../../assets/icons/badge-icons/icons8-restaurant-100.png";
import roadmapIcon from "../../assets/icons/badge-icons/icons8-roadmap-100.png";
import spachelorIcon from "../../assets/icons/badge-icons/icons8-spachelor-100.png";
import "./Badges.css"
import { useEffect } from "react";

const BadgesIndex = ({numCompleted, numReviews, uniqueCountries, numHealthyRecipes}) => {

    const calculateBadgeProgress = (progress) => {
            return (progress / 20) * 100
        // if (progress >= 25) {
        //     return 100;
        // } else if (progress >= 20) {
        //     return 75;
        // } else if (progress >= 15) {
        //     return 50;
        // } else if (progress >=10) {
        //     return 25;
        // } else if (progress >=5) {
        //     return 0;
        // }
        // return 0;
    }
    const badges = {
        explorer: {
            title: "Global Gastronaut",
            icon: aroundTheWorldIcon,
            description: " The Global Gastronaut badge is awarded to adventurous food enthusiasts who have embarked on a culinary journey, exploring the diverse flavors and cultures of the world through their love for cooking. These intrepid individuals have fearlessly experimented with recipes from various countries, expanding their palate and broadening their culinary horizons.",
            progress: calculateBadgeProgress(uniqueCountries),
            numCompleted: uniqueCountries
        },
        critic: {
            title: "Tastemaker Extraordinaire",
            icon: composeIcon,
            description: "The Tastemaker Extraordinaire badge is awarded to those passionate individuals who have shared their culinary expertise through numerous insightful reviews of recipes they've tried. These dedicated food critics have gone above and beyond in providing valuable feedback, sharing their experiences, and helping others make informed decisions about what to cook. Their reviews serve as a trusted guide in the vast world of recipes, making them an invaluable resource for fellow food enthusiasts.",
            progress: calculateBadgeProgress(numReviews),
            numCompleted: numReviews
        },
        chef: {
            title: "Culinary Connoisseur",
            icon: spachelorIcon,
            description: "The Culinary Connoisseur badge is bestowed upon those passionate individuals who have embarked on a culinary journey, demonstrating their dedication to the art of cooking through the preparation of numerous recipes. These talented individuals have honed their skills in the kitchen, exploring diverse cuisines, techniques, and ingredients, and have delighted their taste buds and those of others with their culinary creations.",
            progress: calculateBadgeProgress(numCompleted),
            numCompleted: numCompleted
        },
        veganator: {
            title: "Plant-Based Prodigy",
            icon: broccoliIcon,
            description: "The Plant-Based Prodigy badge is bestowed upon those exceptional individuals who have embraced the world of vegetarian and/or vegan cuisine, demonstrating their commitment to plant-based cooking through the preparation of numerous recipes. These dedicated cooks have not only explored the vast realm of meatless and dairy-free dishes but have also showcased their culinary prowess, creativity, and compassion for a sustainable and ethical lifestyle",
            progress: calculateBadgeProgress(numHealthyRecipes),
            numCompleted: numHealthyRecipes
        }
    }


    return (
        <div id="badges-index-container">
            {Object.values(badges).map((badge, i) => (
                <BadgesProgressBar key={i} badge={badge} numCompleted={numCompleted} uniqueCountries={uniqueCountries} numReviews={numReviews} numHealthyRecipes={numHealthyRecipes} />
            ))}
        </div>
    )
};

export default BadgesIndex;
