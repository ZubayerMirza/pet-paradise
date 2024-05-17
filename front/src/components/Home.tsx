// Old Homepage of the Social Media Site

import React from "react";
import NavigationBar from "./NavigationBar";
import LeftPanel from "./LeftPanel";
import Feed from "./Feed";
import RightPanel from "./RightPanel";

const Home: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <div style={{ display: "flex", backgroundColor: "#c9c9c9" }}>
        <div style={{ width: "20%" }}>
          <LeftPanel />
        </div>
        <div style={{ width: "50%", backgroundColor: "#dcdcdc" }}>
          <Feed />
        </div>
        <div style={{ width: "30%" }}>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
