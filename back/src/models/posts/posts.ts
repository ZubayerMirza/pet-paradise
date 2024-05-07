import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";
// import Friend_List from "../friends/friendsList";
// pets table is defined, for pet information
// will have userid, my item, pet type as foriegn keys

const Post = data.define(
    "Post",
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      createTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "posts",
      timestamps: false,
    }
  );

// Pets.belongsToMany(Pets,{as:"from", foreignKey:"friend_id", through: Friend_List});
// Pets.belongsToMany(Pets,{ as:"to", foreignKey:"my_id",through: Friend_List});


export default Post;