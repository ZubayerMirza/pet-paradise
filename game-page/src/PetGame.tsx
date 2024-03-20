import React, { useState } from "react";
import "./PetGame.css"; // Import your CSS file
import { Link } from "react-router-dom";

interface PetGameProps {
  // Define any props you may need
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
    window.alert("You fed your pet!");
  };

  const chat = () => {
    // Logic for chatting with pet
    window.alert("You chatted with your pet!");
  };

  const goToGameZone = () => {
    // Logic to navigate to the game zone
    window.alert("You are entering the game zone!");
  };

  const goToFriends = () => {
    // Logic to navigate to the friends section
    window.alert("You are going to your friends section!");
  };

  const goToShop = () => {
    // Logic to navigate to the lobby
    window.alert("You are going to the shop!");
  };

  const goToMyRoom = () => {
    // Logic to navigate to the user's room
    window.alert("You are entering your room!");
  };

  return (
    <div className="pet-game">
      {/* Gauge box */}
      <div className="gauge-box">
        <div className="gauges">
          <div>LVL {level}</div>
          <div>Hunger: {hunger}</div>
          <div>Affection: {affection}</div>
        </div>
      </div>
      {/* Top Buttons */}
      {/* Top Buttons */}
      <div className="top-buttons">
        <button onClick={feedPet}>🍕Feed Pet</button>
        <button onClick={goToFriends}>🫠Friends</button>
        <button onClick={goToShop}>🛒Shop</button>
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
