import React from "react";
import Stats from "./Stats1";

const RightPanel: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px",
        borderLeft: "1px solid #ccc",
        position: "fixed",
        top: "70px",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <h2>PET GOES HERE</h2>
      </ul>
      <Stats />
    </div>
  );
};

export default RightPanel;
