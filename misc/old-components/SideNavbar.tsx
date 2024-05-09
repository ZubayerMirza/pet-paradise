import React from "react";
import { Link } from "react-router-dom";
import "./SideNavBar.css";

const SideNavbar: React.FC = () => {
  return (
    <div
      className="side-navbar"
      style={{
        width: "250px",
        backgroundColor: "rgba(255, 99, 71, 0.4)", // Change the color and opacity here
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {/* Navigation links */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link
            className="buttons"
            to="/BoughtFoodPage"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>🍕Feed Pet</button>
          </Link>
        </li>
        <li>
          <Link
            className="buttons"
            to=""
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>🫠Friends</button>
          </Link>
        </li>
        <li>
          <Link
            className="buttons"
            to="/ShopPage"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>🛒Shop</button>
          </Link>
        </li>
        <li>
          <Link
            className="buttons"
            to=""
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>💬Chat</button>
          </Link>
        </li>
        <li>
          <Link
            to="/Casino"
            className="buttons"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button>🎮 Game Zone</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
