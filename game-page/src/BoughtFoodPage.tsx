import React, { useState } from "react";
import { getBoughtFood, clearBoughtFood } from "./foodManager";
import "./BoughtFoodPage.css"; // Import the CSS file
import { Link } from "react-router-dom";
import { increaseExp } from "./levelManager";

const BoughtFoodPage: React.FC = () => {
  // Retrieve bought food items from the food manager
  const [boughtFood, setBoughtFood] = useState<string[]>(getBoughtFood());

  const handleFeedAll = () => {
    boughtFood.forEach((item) => {
      increaseExp(); // Increase exp for each item
    });
    clearBoughtFood(); // Clear the bought food items after feeding all
    setBoughtFood([]);
  };

  return (
    <div className="bought-food-page-container">
      <h1>Bought Food Page</h1>
      <div className="bought-food-container">
        <ul className="bought-food-list">
          {/* Map over the bought food items and render them as list items */}
          {boughtFood.map((item, index) => (
            <li key={index} className="bought-food-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/petgame" className="button">
        Back to Main Page
      </Link>
      <button className="button" onClick={handleFeedAll}>
        Feed All
      </button>
    </div>
  );
};

export default BoughtFoodPage;
