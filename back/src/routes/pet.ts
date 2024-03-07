import express, { Router}  from "express";
import Pets from "../models/pet/pets";

const router: Router = express.Router();

//pet page -> not done yet
router.get('/pet', async (request, response) => {
    // var testcase = {
    //     userId: 1
    // }

    //  await Pets.findOne({where: {userId: testcase.userId}})
    // .then(res => {
    //    if (res === null){
    //     // will lead to the pet select page
    //     console.log('pet is not there');

    //    }
    //    else {
    //     // find the pet and lead to the main page
    //    }
    // })
    // return response.json('Created');
})

//delete, put, get

export default router;