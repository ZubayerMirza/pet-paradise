import { DataTypes } from "sequelize";
import data from "../config/dbconnect";
import Pets from "./pet/pets";
import PetTypes from "./pet/pettypes";
import Storages from "./items/Storage";
import Items from "./items/Items";
// import ItemList from "./items/ItemList";
import ItemList from "./items/ItemList";
import myLevel from "./levels/myLevel";
import Level from "./levels/Level";
import Friend_List from "./friends/friendsList";
import Chat from "./chats/chat";
import Post from "./posts/posts";
import Comment from "./comments/comments";
// Model is defined with define fuction of seq
// represnets as a table of the database
// each will be colums of the tables

// later with sync -> create table users (this model)
const Users = data.define('users', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { //not 
        type: DataTypes.STRING,
        allowNull: true
    },
    isLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    //for zubyar : social media 
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
});

// relation between tables 


//pets table have connected to users table with userid
Users.hasOne(Pets); // each user have one pet
Pets.belongsTo(Users, { foreignKey: 'userId'});
// Pets.hasOne(Users); // update later! 
// Users.belongsTo(Pets, { foreignKey: 'petId'})

//pets table have connected to pettype table with typeId
Pets.belongsTo(PetTypes, {foreignKey: 'typeId'});

Pets.belongsTo(Storages);
Storages.belongsToMany(Items,{through: ItemList});
Items.belongsToMany(Storages,{through: ItemList});


// myLevel.hasOne(Pets);
// Pets.belongsTo(myLevel,{foreignKey: 'myLevel_Id'});
Pets.hasOne(myLevel);
//either one maybe has to be changed? 
myLevel.hasOne(Pets, {foreignKey: 'myLevel_Id'});
myLevel.belongsTo(Pets,{foreignKey: 'petId'});
// myLevel.has One(Level);
Level.hasMany(myLevel);



/************************************
 * zubyar's database relationship 
 * *********************************/

// Post 
Users.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(Users, { foreignKey: "userId" });

// Comment 
Comment.belongsTo(Users, { foreignKey: "userId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

//
// friends relations of between user and user
// Users.belongsToMany(Users,{as:"from", foreignKey:"friend_id", through: Friend_List});
// Users.belongsToMany(Users,{ as:"to", foreignKey:"my_id",through: Friend_List});

// game room data relation is neneded

//chat room
// Chat.belongsTo(Users);

export default Users;


// const User = sequelize.define(
//     "User",
//     {
//       userId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       passwordHash: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       profilePictureUrl: {
//         type: DataTypes.STRING(400),
//         defaultValue: null,
//       },
//       createTime: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },
//       name: DataTypes.STRING(100),
//       location: DataTypes.STRING(200),
//       gender: DataTypes.STRING(45),
//       age: DataTypes.INTEGER,
//       interests: DataTypes.TEXT,
//       bio: DataTypes.TEXT,
//       school: DataTypes.STRING,
//       coverPicture: DataTypes.STRING(400),
//     },
//     {
//       tableName: "users",
//       timestamps: false,
//     }
//   );
  