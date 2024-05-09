import express, { Router } from "express";
// import pet from "./pet";
// import items from "./items";
// import api from "./api";
import Users from "../models/users";
import Pets from "../models/pet/pets";
import { io } from "..";
// to organize as different usage, router used
export const router: Router = express.Router();

var testcase = {
  username: "",
  password: "",
};

// post method for login
// route used when the same address is used
router
  .route("/login")
  .post(async (request, response) => {
    testcase = {
      username: request.body.username,
      password: request.body.password,
    };
    console.log(testcase.username);

    // find the username and password from users tables of db
    await Users.findOne({ where: { username: testcase.username } }).then(
      (res) => {
        if (testcase.password == res?.dataValues.password) {
          res.set({ isLogin: true });
          res.save();
          // id -> userid in frontside,
          return response.json({
            id: res?.dataValues.id,
            username: res?.dataValues.username,
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
router.post("/signup", async (request, response) => {
  // get the username and password from frnot t
  testcase = {
    username: request.body.username,
    password: request.body.password,
  };
  // enable for find or create the username
  const [newUser, create] = await Users.findOrCreate({
    where: { username: testcase.username, password: testcase.password },
  });
  // console.log(newUser.dataValues.username);
  // console.log(create); // return as boolean

  // if created,
  if (create) {
    return response.json("Created");
  }
  return response.json("Username already exist"); // if username exists
});

export default router;
