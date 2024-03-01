import express, { Router}  from "express";
import Users from "../models/users";

const router: Router = express.Router();
var testcase = {
    username: "",
    password: ""
}
// // get
// router.get('/login', async (request, response) => {
//     return response.json("Hi Get");
// })

// post method for login  
router.post('/login', async (request, response) => {
    
    testcase = {
        username: request.body.username,
        password: request.body.password
    }
    console.log(testcase.username);
  
    // find the username and password 
    await Users.findOne({where: {username: testcase.username}})
    .then(res => {
        if (testcase.password == res?.dataValues.password){
            return response.json({id: res?.dataValues.id, username: res?.dataValues.username});
        }
        else if(testcase.username != res?.dataValues.username){
            return response.json('User not found');
        }
        else
        return response.json('Password is different');
    }) 
})

// post method for creating  
router.post('/signup', async (request, response) => {

    testcase = {
        username: request.body.username,
        password: request.body.password
    }

    // enable for find or create the username 
    const [newUser, create] = await Users.findOrCreate({
        where: { username: testcase.username, password: testcase.password},
    });
    // console.log(newUser.dataValues.username);
    // console.log(create); // return as boolean 

    // if created,
    if (create) { 
        return response.json('Created');
        
    } // if username exists
    return response.json('Username already exist');
    
})


//delete, put, get
export default router;