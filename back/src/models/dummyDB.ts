import Users from "./users";
import Pets from "./pet/pets";
import PetTypes from "./pet/pettypes";
import { dropDB } from "../config/dbconnect";
import Items from "./items/Items";
import Storages from "./items/Storage";
import ItemList from "./items/ItemList";
import data from "../config/dbconnect";
import Level from "./levels/Level";
import Model from "sequelize";
import Chat from "./chats/chat";
import Friendship from "./friendships/friendships";
import Post from "./posts/posts";
import Comment from "./comments/comments";
import Like from "./likes/likes";
import UserStats from "./stats/stats";
import Leaderboard from "./leaderboard/leaderboard";
// import { Model } from "sequelize";
import { UserData, ItemData, PetTypeData, levelData } from "./itemData";
import {
  PostData,
  CommentData,
  LikeData,
  FriendData,
  StatData,
  LeaderboardData,
} from "./socialData";
import { Optional } from "sequelize";

const dummyToDB = (data: any, model: any) => {
  // console.log(data);
  data.forEach(async (items: any) => {
    try {
      const Test = await model.create(items);
      //    console.log(Test.dataValues);
    } catch (error) {
      // when data is already exist
      // console.log("----- Data EXISTANT -----");
      // throw(error);
    }
  });
};
const DummyDB = async () => {
  // will create the tables as Users models in defined
  try {
    //force true : to drop the table and create
    //force falce : not drop
    // dropDB(); //  to use for me

    await data.sync({ force: true }); // sync at once
  } catch (error) {
    // whether table is created or not
    console.log("----- Failed for table sync -----");
    throw error;
  }

  // create the table with the dummy data
  dummyToDB(UserData, Users);
  dummyToDB(PetTypeData, PetTypes);
  dummyToDB(ItemData, Items);
  dummyToDB(levelData, Level);
  dummyToDB(PostData, Post);
  dummyToDB(LikeData, Like);
  dummyToDB(CommentData, Comment);
  dummyToDB(FriendData, Friendship);
  dummyToDB(StatData, UserStats);
  dummyToDB(LeaderboardData, Leaderboard);
};

export default DummyDB;
