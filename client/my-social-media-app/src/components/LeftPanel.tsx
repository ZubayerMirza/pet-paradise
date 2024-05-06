import React, { useEffect, useState } from "react";

const LeftPanel: React.FC = () => {
  const panelStyle: React.CSSProperties = {
    padding: "10px",
    borderRight: "1px solid #ddd",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "purple",
    maxWidth: "250px",
    position: "fixed",
    height: "100%",
    width: "100%",
    top: "70px",
  };

  const headerStyle = {
    padding: "10px 0",
    fontWeight: "bold",
    color: "#333",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  const listItemStyle = {
    padding: "8px 10px",
    margin: "5px 0",
    borderRadius: "5px",
    transition: "background-color 0.2s",
    cursor: "pointer",
    backgroundColor: "#8a7f8d",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 500,
  };

  const iconStyle = {
    width: "20px",
    height: "20px",
  };

  const [user, setUser] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const parsedToken = JSON.parse(userToken);
        const userValue = parsedToken.userId;
        const username = parsedToken.username;
        setUser(userValue);
        setUserName(username);
      } catch (error) {
        console.error("Error parsing access token:", error);
      }
    }
  }, []);

  const shortcuts = [
    { name: "AI Chat", icon: "💬", link: "/ai-chat" },
    { name: "Messages", icon: "✉️", link: "/messages" },
    { name: "Game", icon: "🎮", link: "/game" },
    { name: "Followers", icon: "🫂", link: `/follower/${user}` },
    { name: "Following", icon: "👫", link: `/following/${user}` },
    { name: "User Stats", icon: "📅", link: `/stats/${user}` },
    { name: "My History", icon: "📃", link: `/history/${user}` },
    { name: "All Users", icon: "👤", link: `/all-users` },
  ];

  return (
    <div style={panelStyle}>
      <h4 style={headerStyle}>Your Shortcuts</h4>
      <ul style={listStyle}>
        {shortcuts.map((shortcut) => (
          <li key={shortcut.name} style={listItemStyle}>
            <a href={shortcut.link} style={linkStyle}>
              <span style={iconStyle}>{shortcut.icon}</span>
              {shortcut.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftPanel;
