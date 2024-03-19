import express, { Router}  from "express";
import Pets from "../models/pet/pets";
import PetTypes from "../models/pet/pettypes";
import Users from "../models/users";
import { Op } from "sequelize"; // optionTypes from sequelize for queling with filter

const router: Router = express.Router();

//pet page -> not done yet
router.route('/pet')

.post(async (request, response) => {

    await Pets.findAll({where: {userid: request.body.id}})
    .then(async A => {

       if (A === null){ // if there is no pet data for user
        // will lead to the pet select page
        console.log('pet is not there');
        // response.send('pet is not there!. ')
        const Test = PetTypes.findAll({
            where:{
                id:{
                    [Op.lt]: 4 // id is less than 4 
                } // type related 4 planned for uniqe pettype for later used 
            }
        }).then(async (Test)=>{

            // console.log(Test)
            // response.send(Test)
          
            // const Pet = await Pets.create({petname: request.body.name, userId: 2, typeId: 2})
            // .then(async (res)=>{
            //     const Test = await Pets.findAll({include: {model: PetTypes, as: "typeid" }});
            //     console.log(JSON.stringify(Test, null, 2));
            // }).catch((error)=>{
            //     // console.log(error);
            // });
            
          
            // // work
            // console.log(Pet instanceof Pets); 
            // Pet.set({
            //     petname: "Hell" 
            // }) 
            // await Pet.save();
            
            // not working
            // // Array to take objects of pettypes
            // var arr = new Array();

            // Test.forEach(info => {

            // var value = {
            //     id: info.dataValues.id,
            //     des: info.dataValues.description,
            //     name: info.dataValues.name,
            //     hunger: info.dataValues.hunger,
            //     status: info.dataValues.status
            //  }
            //  console.log(info.dataValues)
            //  arr.push(value);
             
            // }
            // )
 
        });
       }
       else {
        const Test = await Pets.findAll({include: {model: PetTypes, as: "typeid" }});
        // console.log(JSON.stringify(Test, null, 2));

        const B =  await Users.findAll({include: {model: Pets}});
        // console.log(B)
        console.log(JSON.stringify(B, null, 2));
        return response.json('pet here')
        // find the pet and lead to the main page
       }
    })
    // return response.json('hi');
})

.put(async (request, response) => {
 
   
    
})


//delete, put, get

export default router;