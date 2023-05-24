import { FiSquare } from "react-icons/fi";
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";
import "./Macronutrients.css";
import { useState } from "react";

const Macronutrients = ({ macronutrients, tooltipOpen, setTooltipOpen }) => {
  const [nutrientInfoExpanded, setNutrientInfoExpanded] = useState(false);

  const macronutrientsOrdering = {
    Calories: 1,
    Protein: 10,
    Fat: 20,
    Carbohydrates: 30,
    "Saturated Fat": 100,
    "Net Carbohydrates": 200,
    Sugar: 300,
    Cholesterol: 1000,
    Sodium: 2000,
    Manganese: 3000,
    "Vitamin A": 10000,
    "Vitamin B6": 10000,
    "Vitamin B3": 10000,
    "Vitamin B2": 10000,
    "Vitamin B1": 10000,
    "Vitamin B5": 10000,
    "Vitamin B12": 10000,
    "Vitamin D": 10000,
    "Vitamin K": 10000,
    "Vitamin E": 10000,
    "Vitamin C": 10000,
  };

  const macronutrientsColoring = {
    0: "#3D550C", // Calories color
    1: "#86B049", // Three large macro categories color
    2: "#BFD834", // Sub-categories color
    3: "#BDD99E", // Elements (e.g. metals) color
    4: "#ECF87F", // Vitamins color
  };

  function compare(a, b) {
    const aOrder = macronutrientsOrdering[a.name] || 9999;
    const bOrder = macronutrientsOrdering[b.name] || 9999;
    if (aOrder && bOrder) {
      if (aOrder > bOrder) {
        return 1;
      }
      if (aOrder < bOrder) {
        return -1;
      }
    }
    return 0;
  }
  macronutrients = macronutrients?.sort(compare);

  let emptySquares = [];
  for (let i = 0; i < 10; i++) {
    emptySquares.push(<FiSquare className="nutrient-empty-square" />);
  }

  macronutrients = macronutrients?.map((macronutrient) => {
    let order = macronutrientsOrdering[macronutrient.name] || 9999;
    let digits = 0;
    while (order >= 10) {
      order /= 10;
      digits += 1;
    }
    const color = macronutrientsColoring[digits];
    const fullSquareCount = Math.min(
      10,
      Math.floor(macronutrient.percentOfDailyNeeds / 10)
    );
    let filledSquares = [];
    for (let i = 0; i < fullSquareCount; i++) {
      filledSquares.push(
        <FiSquare
          fill={color}
          className="nutrient-filled-square"
          id={`nutrient-filled-square-${i}`}
        />
      );
    }
    if (fullSquareCount !== 10) {
      filledSquares.push(
        <FiSquare fill={color} className="nutrient-half-filled-square" />
      );
    }
    return { ...macronutrient, filledSquares };
  });

  function handleMouseOver(e) {
    e.preventDefault();
    if (setTooltipOpen) {
      setTooltipOpen(parseInt(e.currentTarget.getAttribute("data-idx")));
    }
  }

  function handleExpandClick(e) {
    e.preventDefault();
    setNutrientInfoExpanded(!nutrientInfoExpanded);
  }

  {
    if (nutrientInfoExpanded)
      return (
        <>
          {macronutrients?.map((macronutrient, i) => (
            <div
              data-idx={i}
              className="single-macro-container"
              onMouseOver={handleMouseOver}
            >
              <div className="nutrient-text">
                <p key={i}>{macronutrient.name}</p>
                <p>
                  {Math.floor(macronutrient.amount)} {macronutrient.unit}
                </p>
              </div>
              <div className="nutrient-square-container">
                <div className="nutrient-empty-square-container">
                  {emptySquares}
                </div>
                <div className="nutrient-filled-square-container">
                  {macronutrient.filledSquares}
                </div>
              </div>
              {tooltipOpen === i && (
                <h1 className="macro-tooltip">{`${Math.floor(
                  macronutrient.percentOfDailyNeeds
                )}% DV (Recommended Daily Value)`}</h1>
              )}
            </div>
          ))}
          <div onClick={handleExpandClick}>
            <MdOutlineExpandLess /> See Less
          </div>
        </>
      );
  }
  {
    if (!nutrientInfoExpanded)
      return (
        <>
          {macronutrients?.slice(0, 4).map((macronutrient, i) => (
            <div
              data-idx={i}
              className="single-macro-container"
              onMouseOver={handleMouseOver}
            >
              <div className="nutrient-text">
                <p key={i}>{macronutrient.name}</p>
                <p>
                  {Math.floor(macronutrient.amount)} {macronutrient.unit}
                </p>
              </div>
              <div className="nutrient-square-container">
                <div className="nutrient-empty-square-container">
                  {emptySquares}
                </div>
                <div className="nutrient-filled-square-container">
                  {macronutrient.filledSquares}
                </div>
              </div>
              {tooltipOpen === i && (
                <h1 className="macro-tooltip">{`${Math.floor(
                  macronutrient.percentOfDailyNeeds
                )}% DV (Recommended Daily Value)`}</h1>
              )}
            </div>
          ))}
          <div className="nutrient-expand-info" onClick={handleExpandClick}>
            <MdOutlineExpandMore /> See More
          </div>
        </>
      );
  }
};

export default Macronutrients;
