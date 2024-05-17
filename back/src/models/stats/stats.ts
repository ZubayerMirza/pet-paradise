// Model for stats backend

import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const UserStats = data.define(
  "UserStats",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "users", // name of the Users table
        key: "userId",
      },
    },
    postCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    friendCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shareCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_stats",
    timestamps: false,
  }
);

export default UserStats;
