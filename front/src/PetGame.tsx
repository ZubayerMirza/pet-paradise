import React, { useState } from "react";
import "./PetGame.css"; // Import your CSS file
import { Link } from "react-router-dom";
import { increaseScore, decreaseScore, getScore } from "./scoreManager";
import { getLevel } from "./levelManager";

interface PetGameProps {
  // Define any props need
}

const PetGame: React.FC<PetGameProps> = () => {
  // State for pet's level, hunger, and affection
  const [level, setLevel] = useState<number>(1);
  const [hunger, setHunger] = useState<number>(0);
  const [affection, setAffection] = useState<number>(0);

  // Functions to handle pet actions
  const feedPet = () => {
    // Logic to increase pet's hunger
    // setHunger(hunger + amount);
  };

  const chat = () => {
    // Logic for chatting with pet
  };

  const goToGameZone = () => {
    // Logic to navigate to the game zone
  };

  const goToFriends = () => {
    // Logic to navigate to the friends section
  };

  const goToShop = () => {
    // Logic to navigate to the lobby
  };

  const goToMyRoom = () => {
    // Logic to navigate to the user's room
  };

  return (
    <div className="pet-game">
      {/* Gauge box */}
      <div className="gauge-box">
        <div className="gauges">
          <div>LVL {getLevel()}</div>
          <div>Hunger: {hunger}</div>
          <div>Affection: {affection}</div>
          <div>Points: {getScore()}</div>
        </div>
      </div>
      {/* Top Buttons */}
      {/* Top Buttons */}
      <div className="top-buttons">
        <button onClick={feedPet}>
          <Link to="/BoughtFoodPage">🍕Feed Pet</Link>
        </button>
        <button onClick={goToFriends}>🫠Friends</button>
        <button onClick={goToShop}>
          <Link to="/ShopPage">🛒Shop</Link>
        </button>
        <button onClick={goToMyRoom}>🏠My Room</button>
      </div>

      {/* Display pet animation */}
      <div className="pet-animation"></div>

      {/* Bottom Buttons */}
      <div className="buttons">
        <button onClick={chat}>💬Chat</button>
        <button onClick={goToGameZone}>
          <Link to="/Casino">🎮 Game Zone</Link>
        </button>
      </div>
    </div>
  );
};

export default PetGame;
