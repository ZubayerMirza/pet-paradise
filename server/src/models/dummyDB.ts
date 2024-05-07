import data from "../config/dbconnect";

import User from "./users";
import UserStats from "./user_stats";
import Post from "./posts";
import Comment from "./comments";
import Like from "./likes";
import Friendship from "./friendships";

import {
  UserData,
  PostData,
  CommentData,
  LikeData,
  FriendData,
  UserStatsData,
} from "./socialData";

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

    await data.sync({ force: false }); // sync at once
  } catch (error) {
    // whether table is created or not
    console.log("----- Failed for table sync -----");
    throw error;
  }

  // create the table with the dummy data
  dummyToDB(UserData, User);
  dummyToDB(PostData, Post);
  dummyToDB(CommentData, Comment);
  dummyToDB(LikeData, Like);
  dummyToDB(FriendData, Friendship);
  dummyToDB(UserStatsData, UserStats);
};

export default DummyDB;
