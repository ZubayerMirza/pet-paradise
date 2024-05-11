import React, { useState, useEffect } from "react";
import "../style/Battle.css";
import player from "../images/comic-dog.jpg";
import opponent from "../images/comic-cat.jpg";
import NavigationBar from "./NavigationBar";

interface Pet {
  health: number;
  attack: number;
  evasion: number;
  critical: number;
}

const Battle: React.FC = () => {
  const [playerPet, setPlayerPet] = useState<Pet>({
    health: 100,
    attack: 20,
    evasion: 15,
    critical: 10,
  });
  const [opponentPet, setOpponentPet] = useState<Pet>({
    health: 100,
    attack: 15,
    evasion: 10,
    critical: 5,
  });
  const [gameStatus, setGameStatus] = useState<string>("");

  useEffect(() => {
    if (opponentPet.health <= 0) {
      setGameStatus("You win!");
    } else if (playerPet.health <= 0) {
      setGameStatus("You lose!");
    }
  }, [playerPet.health, opponentPet.health]);

  const handlePlayerAttack = () => {
    if (Math.random() < opponentPet.evasion / 100) {
      alert("Opponent evaded the attack!");
      return;
    }

    const isCritical = Math.random() < playerPet.critical / 100;
    const damage = isCritical ? playerPet.attack * 1.5 : playerPet.attack;
    const newHealth = opponentPet.health - damage;
    setOpponentPet({ ...opponentPet, health: newHealth > 0 ? newHealth : 0 });

    setTimeout(handleOpponentAttack, 1000); // Delay for opponent's attack
  };

  const handleOpponentAttack = () => {
    if (Math.random() < playerPet.evasion / 100) {
      alert("You evaded the attack!");
      return;
    }

    const isCritical = Math.random() < opponentPet.critical / 100;
    const damage = isCritical ? opponentPet.attack * 1.5 : opponentPet.attack;
    const newHealth = playerPet.health - damage;
    setPlayerPet({ ...playerPet, health: newHealth > 0 ? newHealth : 0 });
  };

  return (
    <>
      <NavigationBar />
      <div
        className="game"
        style={{
          backgroundColor: "antiquewhite",
        }}
      >
        <div className="opponent-area">
          <img src={opponent} alt="Opponent Pet" />
          <div className="stats">
            Health: {opponentPet.health} | Attack: {opponentPet.attack} |
            Evasion: {opponentPet.evasion}% | Critical: {opponentPet.critical}%
          </div>
          <div
            className="health-bar"
            style={{ width: `${opponentPet.health}%` }}
          ></div>
        </div>
        <div className="player-area">
          <img src={player} alt="Player Pet" />
          <div className="stats">
            Health: {playerPet.health} | Attack: {playerPet.attack} | Evasion:{" "}
            {playerPet.evasion}% | Critical: {playerPet.critical}%
          </div>
          <div
            className="health-bar"
            style={{ width: `${playerPet.health}%` }}
          ></div>
          <button onClick={handlePlayerAttack}>Attack</button>
        </div>
        {gameStatus && <h2>{gameStatus}</h2>}
      </div>
    </>
  );
};

export default Battle;
