import express, { Router } from "express";
// import pet from "./pet";
// import items from "./items";
// import api from "./api";
import Users from "../models/users";
import Pets from "../models/pet/pets";
import { io } from "..";
import db from "../config/db";

// to organize as different usage, router used
export const router: Router = express.Router();

var testcase = {
  username: "",
  password: "",
  socketId: "",
};

// post method for login
// route used when the same address is used
router
  .route("/login")
  .post(async (request, response) => {
    testcase = {
      username: request.body.username,
      password: request.body.password,
      socketId: request.body.socketId,
    };
    // console.log(testcase.username);

    // find the username and password from users tables of db
    await Users.findOne({ where: { username: testcase.username } }).then(
      (res) => {
        if (testcase.password == res?.dataValues.password) {
          res.set({ isLogin: true, socketId: testcase.socketId });
          res.save();

          // id -> userid in frontside,
          return response.json({
            id: res?.dataValues.id,
            username: res?.dataValues.username,
            socketId: res?.dataValues.socketId,
          });
        } else if (testcase.username != res?.dataValues.username) {
          return response.json("User not found");
        } else return response.json("Password is different");
      }
    );
  })

  // from here only in postman works
  // just for later usage
  // maybe when data deletion is needed
  .delete(async (request, response) => {
    // get the username and password with request for now
    testcase = {
      username: request.body.username,
      password: request.body.password,
      socketId: request.body.socketId,
    };
    //might need to check the username and password to securely delete
    await Users.findOne({ where: { username: testcase.username } }).then(
      (res) => {
        if (testcase.password == res?.dataValues.password) {
          //delete row username is found
          Users.destroy({
            where: {
              username: testcase.username,
            },
          }).then((result) => {
            if (result == 1) {
              // if 1, true
              response.json("user is deleted");
            }
          });
        } else if (testcase.username != res?.dataValues.username) {
          return response.json("User not found");
        } else return response.json("Password is different");
      }
    );
  })

  //when change the info is needed,  will be used
  .put(async (request, response) => {
    // get the username and password with request for now
    testcase = {
      username: request.body.username,
      password: request.body.password,
      socketId: request.body.socketId,
    };
    //might to check the username and password for modifying
    await Users.findOne({ where: { username: testcase.username } }).then(
      (res) => {
        console.log(res);
        if (testcase.password == res?.dataValues.password) {
          // change the name to Sofia for now
          Users.update(
            { username: "Sofia" },
            {
              where: {
                username: testcase.username,
              },
            }
          ).then((result) => {
            // result was array type,
            // not sure what is represented
            // console.log(result); // why true in array? but change works..
            if (result[0] == 1) {
              response.json("changed!");
            }
          });
        } else if (testcase.username != res?.dataValues.username) {
          return response.json("User not found");
        } else return response.json("Password is different");
      }
    );
  });

// post method and findorcreate methods for find and creating users
// router.post("/signup", async (request, response) => {
//   // get the username and password from frnot t
//   testcase = {
//     username: request.body.username,
//     password: request.body.password,
//   };
//   // enable for find or create the username
//   const [newUser, create] = await Users.findOrCreate({
//     where: { username: testcase.username, password: testcase.password },
//   });
//   // console.log(newUser.dataValues.username);
//   // console.log(create); // return as boolean

//   // if created,
//   if (create) {
//     return response.json("Created");
//   }
//   return response.json("Username already exist"); // if username exists
// });

router.post("/signup", async (request, response) => {
  const { username, password } = request.body; // Destructure username and password from the request body

  // Find or create the user
  const [user, created] = await Users.findOrCreate({
    where: { username, password }, // Use destructured variables directly
  });

  if (created) {
    // If user is created successfully, insert userId into user_stats table
    const userId = user.dataValues.id; // Access user id through dataValues

    // Insert userId into user_stats table
    const initStatsQuery = "INSERT INTO user_stats (userId) VALUES (?)";
    db.query(initStatsQuery, [userId], (err, statsResult) => {
      if (err) {
        console.error("Error initializing user stats:", err);
        return response
          .status(500)
          .json({ message: "Server error initializing user stats" });
      }

      // Initialize leaderboard entry for the user with wins set to zero
      const initLeaderboardQuery =
        "INSERT INTO leaderboard (id, wins) VALUES (?, 0)";
      db.query(initLeaderboardQuery, [userId], (err, leaderboardResult) => {
        if (err) {
          console.error("Error initializing leaderboard:", err);
          return response
            .status(500)
            .json({ message: "Server error initializing leaderboard" });
        }

        // If user, stats, and leaderboard are created successfully, send response
        return response.status(201).json("Created");
      });
    });
  } else {
    // If user already exists, send response indicating so
    return response.json("Username already exists");
  }
});

export default router;
