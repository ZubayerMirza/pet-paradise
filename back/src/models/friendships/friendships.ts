import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Friendship = data.define(
  "Friendship",
  {
    friendshipId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    followedUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    followingUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: DataTypes.STRING,
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    tableName: "friendships",
    timestamps: false,
  }
);

export default Friendship;
