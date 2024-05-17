// Model for likes backend

import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Like = data.define(
  "Like",
  {
    likeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "likes",
    timestamps: false,
  }
);

export default Like;
