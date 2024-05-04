import React from "react";

const RightPanel: React.FC = () => {
  return (
    <div
      style={{
        padding: "10px",
        borderLeft: "1px solid #ccc",
        position: "relative",
        top: "70px",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <h2>PET GOES HERE</h2>
        {/* More chat contacts */}
      </ul>
    </div>
  );
};

export default RightPanel;
