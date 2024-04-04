import express, { Router}  from "express";
import Pets from "../models/pet/pets";
import PetTypes from "../models/pet/pettypes";
import Users from "../models/users";
import { Op } from "sequelize"; // optionTypes from sequelize for queling with filter
import Storages from "../models/items/Storage";
const router: Router = express.Router();

//pet page 
router.route('/pet')

.post(async (request, response) => {

    await Pets.findOne({where: {userId: request.body.id}})
    .then(async res => {
       
        if(res === null){ // if there is no pet data for user
        // will lead to the pet select page

        PetTypes.findAll({
            where:{
                id:{
                    [Op.lt]: 4 // id is less than 4 
                } // type related 4 planned for uniqe pettype for later used 
            }
            
            
        }).then(async (typeResult)=>{
            // pet types will be response 
            response.json(typeResult);
           
        });
       }
       else {
        // when the pet is exist, -> sending the information of pet 
        response.json(res); // sending the pet data belong to this user
       
       }
    })
    // return response.json('hi');
})

router.post('/petget', async (request, response) => {
    
    await Pets.findOne({where: {userId: request.body.userId}})
    .then(async (res)=>{
        if (res === null){
            
            //create user pet data
            await Pets.create({
                petname: request.body.petname, 
                userId: request.body.userId, 
                typeId: request.body.typeId})
                .then(async (res)=>{
                    // response.json('Pet Created') // Pet created with user & type info
                    console.log(res instanceof Pets);  // true
                    
                    // assign the storage to pet 
                    const storage = await Storages.create({quantity: 10})
                    res.set({StorageId: storage.get().id});
                    res.save(); // assign the storage to pet
           
                    
                    response.json(res.dataValues)
           
        }).catch(async (error)=>{
               
        if (error.original.errno === 1062){
            response.json( "petname must be unique");
        }

    });
        }
        else{
            response.json('Already exist')
        }
    })
})


export default router;