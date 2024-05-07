// ProfileInfo.tsx
import React from "react";
import { Link } from "react-router-dom";
import { increaseScore, decreaseScore, getScore } from "../scoreManager";
import { getLevel } from "../levelManager";
import HungerBar from "../HungerBar";
import AffectionBar from "../AffectionBar";
import "./ProfileInfo.css";

interface ProfileInfoProps {
  pictureUrl: string;
  name: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ pictureUrl, name }) => {
  return (
    <div className="profile-info-container">
      <div className="profile-details">
        <img src={pictureUrl} alt="Profile" className="profile-picture" />
        <div className="profile-text">
          <h2>{name}</h2>
          <div className="level-box">
            <span>🕹️Lvl {getLevel()}</span>
          </div>
          <div className="stats-box">
            <div>
              🍽️Hunger <HungerBar />
            </div>
            <div>
              😻Affection <AffectionBar />
            </div>
          </div>
          <div className="points-box">🪙Points: {getScore()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
