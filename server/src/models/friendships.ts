import { DataTypes } from "sequelize";
import sequelize from "../config/dbconnect";
import User from "./users";

const Friendship = sequelize.define(
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
  },
  {
    tableName: "friendships",
    timestamps: false,
  }
);

Friendship.belongsTo(User, { foreignKey: "followedUser" });
Friendship.belongsTo(User, { foreignKey: "followingUser" });

export default Friendship;
