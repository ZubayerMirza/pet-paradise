// Model for leaderboard backend

import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Leaderboard = data.define(
  "Leaderboard",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "leaderboard",
    timestamps: false,
  }
);

export default Leaderboard;
