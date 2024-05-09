import React from "react";

interface BoughtFoodProps {
  boughtItems: string[];
}

// Store the food you buy in boughtItems
const BoughtFood: React.FC<BoughtFoodProps> = ({ boughtItems }) => {
  return (
    <div className="bought-food-container">
      <h3>Bought Food</h3>
      <ul>
        {boughtItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default BoughtFood;
