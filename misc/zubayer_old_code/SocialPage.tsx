import React from "react";
import ProfileInfo from "./components/ProfileInfo";
import WallPostPage from "./components/WallPostPage";
import SideNavbar from "./components/SideNavbar";
import "./SocialPage.css";

const SocialPage: React.FC = () => {
  return (
    <div className="app-container">
      <div className="profile-info">
        <ProfileInfo pictureUrl={require("./cat.png")} name="Meowy" />;
      </div>
      <div className="main-content">
        <div className="wall">
          <WallPostPage />
        </div>
        <div className="side-navbar">
          <SideNavbar />
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
