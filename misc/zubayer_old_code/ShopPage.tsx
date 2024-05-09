import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CartItems from "./CartItems"; // Import CartItems component
import "./ShopPage.css";
import { getScore, decreaseScore } from "../scoreManager"; // Import getScore
import BoughtFood from "./BoughtFood";
import { addToBoughtFood, getBoughtFood } from "./foodManager";

const ShopPage: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [points, setPoints] = useState(0); // Local state for the points displayed in the shop
  const [boughtItems, setBoughtItems] = useState<string[]>([]); // State to store bought items

  useEffect(() => {
    setPoints(getScore());
  }, []);

  const handleAddToCart = (itemName: string) => {
    // Calculate the new points after subtracting 50 for the purchase
    const newPoints = points - 50;

    // Check if the purchase would result in a negative value for points
    if (newPoints < 0) {
      alert("Insufficient points to purchase this item.");
      return;
    }

    setPoints(newPoints);
    setCart([...cart, itemName]);
  };

  // Handle buying the items in the cart
  const handlePurchase = () => {
    // Add items from cart to bought items
    cart.forEach((item) => addToBoughtFood(item));
    cart.forEach((item) => decreaseScore());
    setCart([]); // Clear the cart after purchase
  };

  return (
    <div className="shop-page-container">
      <div className="points-container">Points: {points}</div>
      <div className="shop-container">
        <h2>Shop</h2>
        <div className="food-options">
          <div className="food-option">
            <span>Pet Food</span> {/* Item name */}
            <span className="price-points">50 Points</span>{" "}
            {/* Price in points */}
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart("Pet Food")}
            >
              Add to Cart
            </button>
          </div>
          {/* Add more food options here */}
        </div>
        <div className="buy-button-container">
          <button onClick={handlePurchase} className="buy-button">
            Buy
          </button>
        </div>
        <CartItems items={cart} />{" "}
        {/* Render CartItems component with cart items */}
      </div>
      <div className="back-button-container">
        <Link to="/petgame" className="back-button">
          Back to Pet Page
        </Link>
      </div>
    </div>
  );
};

export default ShopPage;
