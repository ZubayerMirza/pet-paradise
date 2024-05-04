import { DataTypes } from "sequelize";
import sequelize from "../config/dbconnect";

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePictureUrl: {
      type: DataTypes.STRING(400),
      defaultValue: null,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    name: DataTypes.STRING(100),
    location: DataTypes.STRING(200),
    gender: DataTypes.STRING(45),
    age: DataTypes.INTEGER,
    interests: DataTypes.TEXT,
    bio: DataTypes.TEXT,
    school: DataTypes.STRING,
    coverPicture: DataTypes.STRING(400),
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export default User;
