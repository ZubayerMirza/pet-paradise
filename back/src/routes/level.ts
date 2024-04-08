import express, { Router}  from "express";
import Level from "../models/levels/Level";
import myLevel from "../models/levels/myLevel";
import Pets from "../models/pet/pets";
// to organize as different usage, router used  
export const router: Router = express.Router();

// post method for login
// route used when the same address is used  
router.put('/mylevel', async (request, response) => {
    // http://localhost:8000/mylevel
    // {
    //     "myLevel_Id": 2,
    //     "exp": 30
    //  }
    var new_exe = 0;
    await myLevel.findOne({
        where:{
            id: request.body.myLevel_Id
        },
        // include: {all: true, nested: true}
    }).then(async (myLevel)=>{
     
        myLevel?.set({current_exp: (request.body.exp + myLevel?.get('current_exp'))});
        myLevel?.save();
        // response.json(myLevel);
        // (myLevel?.get('needed_exp')
      
        if(myLevel?.dataValues.current_exp >= myLevel?.dataValues.needed_exp){
            new_exe = myLevel?.dataValues.current_exp-myLevel?.dataValues.needed_exp;
            console.log(new_exe);
            const next = await Level.findOne({
                where:{
                    level: myLevel?.dataValues.level+1
                }
            });
            myLevel?.set({
                levelId: next?.dataValues.level, 
                current_exp: new_exe, 
                level: myLevel.dataValues.level+1,
                needed_exp: next?.dataValues.needed_exp
            })
            myLevel?.save();           
        }
        response.json(myLevel)
}
)
})

router.put('/gold', async (request, response) => {
    
    // http://localhost:8000/gold
    // {
    //     "id": 2,
    //     "gold": 30
    //  }

    await Pets.findOne({
        where:{
            id: request.body.id
        },
        // include: {all: true, nested: true}
    }).then(async (myPet)=>{
     
        myPet?.set({gold: (request.body.gold + myPet?.get('gold'))});
        myPet?.save();
        response.json(myPet);
      
}
)

})

router.put('/status', async (request, response) => {
    // http://localhost:8000/status
    // {
    //     "id": 2,
    //     "status": 30
    //  }
    await Pets.findOne({
         where:{
             id: request.body.id
         },
         // include: {all: true, nested: true}
     }).then(async (myPet)=>{
      
         myPet?.set({status: (request.body.status + myPet?.get('status'))});
         myPet?.save();
         response.json(myPet);
       
 }
 )
})

router.put('/hunger', async (request, response) => {
    
    // http://localhost:8000/status
    // {
    //     "id": 2,
    //     "hunger": 30
    //  }
    await Pets.findOne({
        where:{
            id: request.body.id
        },
        // include: {all: true, nested: true}
    }).then(async (myPet)=>{
     
        myPet?.set({status: (request.body.status + myPet?.get('hunger'))});
        myPet?.save();
        response.json(myPet);
      
}
)

})

export default router;