// Creates a battle page in which you can fight your friends' pets
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/Battle.css";
import playerImage from "../images/comic-dog.jpg";
import opponentImage from "../images/comic-cat.jpg";
import NavigationBar from "./NavigationBar";

// Interface for pet
interface Pet {
  health: number;
  attack: number;
  evasion: number;
  critical: number;
}

// Augment pets stats based on user interaction with site
interface Stats {
  postCount: number;
  commentCount: number;
  likeCount: number;
  friendCount: number;
}

// The battle code that allows you to attack your opponent and you opponent to attack you
const Battle: React.FC = () => {
  // State Variables that store information about the player and the user like the name and stats
  const { userId: opponentId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [opponentName, setOpponentName] = useState<string | null>(null);
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
  // Game state variables for start and attack
  const [gameStatus, setGameStatus] = useState<string>("");
  const [canAttack, setCanAttack] = useState<boolean>(true); // State to control attack button

  // Get the userId
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        setUser(parsedToken.userId);
        setUserName(parsedToken.username);
        fetchStats(parsedToken.userId, true);
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    }
    if (opponentId) {
      fetchStats(opponentId, false);
      setOpponentName("Opponent");
    }
  }, [opponentId]);

  // Fetch the stats and change the player and opponents pet stats
  const fetchStats = async (id: string, isPlayer: boolean) => {
    try {
      const response = await fetch(`http://localhost:8000/api/stats/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const stats: Stats = await response.json();
      updatePetStats(stats, isPlayer);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updatePetStats = (stats: Stats, isPlayer: boolean) => {
    const petStats = {
      health: 100 + stats.postCount * 10,
      attack: 15 + stats.commentCount,
      evasion: 10 + stats.likeCount * 0.1,
      critical: 5 + stats.friendCount * 0.05,
    };
    if (isPlayer) {
      setPlayerPet(petStats);
    } else {
      setOpponentPet(petStats);
    }
  };

  // Win condition and posting the score to table
  useEffect(() => {
    if (opponentPet.health <= 0 || playerPet.health <= 0) {
      const winner = opponentPet.health <= 0 ? user : opponentId;
      setGameStatus(opponentPet.health <= 0 ? "You win!" : "You lose!");
      if (winner) {
        postWinToLeaderboard(winner);
      }
      setCanAttack(false); // Disable attacking after game over
    }
  }, [playerPet.health, opponentPet.health]);

  const postWinToLeaderboard = async (winnerId: string) => {
    try {
      await fetch(`http://localhost:8000/leaderboard/${winnerId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ increment: "wins" }),
      });
    } catch (error) {
      console.error("Error posting win to leaderboard:", error);
    }
  };

  // Allow attack only after opponent attacks
  const handlePlayerAttack = () => {
    if (!canAttack || gameStatus) return;

    setCanAttack(false); // Disable further attacks until opponent moves
    if (Math.random() < opponentPet.evasion / 100) {
      alert("Opponent evaded the attack!");
      setCanAttack(true);
      return;
    }

    // Damage dealing metrics
    const isCritical = Math.random() < playerPet.critical / 100;
    const damage = isCritical ? playerPet.attack * 1.5 : playerPet.attack;
    const newHealth = opponentPet.health - damage;
    setOpponentPet({ ...opponentPet, health: newHealth > 0 ? newHealth : 0 });

    if (newHealth > 0) {
      setTimeout(() => {
        handleOpponentAttack();
        setCanAttack(true); // Re-enable attacks after opponent's move
      }, 1000);
    }
  };

  const handleOpponentAttack = () => {
    if (gameStatus) return;

    if (Math.random() < playerPet.evasion / 100) {
      alert("You evaded the attack!");
      return;
    }

    const isCritical = Math.random() < opponentPet.critical / 100;
    const damage = isCritical ? opponentPet.attack * 1.5 : opponentPet.attack;
    const newHealth = playerPet.health - damage;
    setPlayerPet({ ...playerPet, health: newHealth > 0 ? newHealth : 0 });
  };
  // Display the battle ground
  return (
    <>
      <NavigationBar />
      <div className="game">
        <div className="opponent-area">
          <img src={opponentImage} alt="Opponent Pet" />
          <div className="stats">
            Health: {opponentPet.health} | Attack: {opponentPet.attack} |
            Evasion: {opponentPet.evasion}% | Critical: {opponentPet.critical}%
          </div>
          <div
            className="health-bar"
            style={{ width: `${opponentPet.health}%` }}
          ></div>
          <h2>{opponentName}</h2>
        </div>
        <div className="player-area">
          <img src={playerImage} alt="Player Pet" />
          <div className="stats">
            Health: {playerPet.health} | Attack: {playerPet.attack} | Evasion:{" "}
            {playerPet.evasion}% | Critical: {playerPet.critical}%
          </div>
          <div
            className="health-bar"
            style={{ width: `${playerPet.health}%` }}
          ></div>
          <button disabled={!canAttack} onClick={handlePlayerAttack}>
            Attack
          </button>
          <h2>Player: {userName}</h2>
        </div>
        {gameStatus && <h2 className="game-status">{gameStatus}</h2>}
      </div>
    </>
  );
};

export default Battle;
