import express, { Router}  from "express";
import Storages from "../models/items/Storage";
import Items from "../models/items/Items";
import ItemList from "../models/items/ItemList";
import Pets from "../models/pet/pets";
import { Op } from "sequelize"; //  queling with filter
const router: Router = express.Router();

router.route('/items')

// get all item lists for shop
.get( async (request, response) => {
    //    response.json('itempage');
    await Items.findAll()
    .then((result)=>{
        response.json(result);
 });
})

//to show items in my storage -> should be changed the link 
.post(async(request, response)=>{
   
    // console.log(request.body)

        // await ItemList.findAll({
        //     // where:{StorageId: request.body.StorageId}, include: Items
        //     where:{StorageId: request.body.StorageId},
        //     order: [['updatedAt' ,'DESC']]
        // }
        //  ).then ((myItem)=>{
        //     console.log(myItem);
        // //    if(myItem?.get().Items.length===0){
        //     if(myItem.length===0){
        //     response.json('empty storage')
        //    }
        //    else{
        //     // console.log(myItem?.get())
        //     console.log(JSON.stringify(myItem, null, 2));
        //     // response.json(myItem?.get().Items)
        //    }
        //    })
        await Storages.findOne({
            where:{id: request.body.StorageId},
                order: [[Items,ItemList,'createdAt','DESC']]
                // ,'DESC'
            , include: Items 
        }
         ).then ((myItem)=>{
           
            // when user have nothing on storage
            if(myItem?.get().Items.length===0){
            // if(myItem.get()ItemList.length===0){
            // response.json('empty storage')
                response.json({quantity: myItem?.get().quantity, Items: myItem?.get().Items});
           }
           else{
        
            // console.log(JSON.stringify(myItem?.get().ItemList, null, 2));
            response.json({quantity: myItem?.get().quantity, Items: myItem?.get().Items})
           }
           })
    // })
})

// items to my storage
.put(async(request, response)=>{
    var isupdated: Boolean = false;
    // console.log(request.body.cartList);
    request.body.cartList.forEach(async (data: any)=>{
    //     console.log(data);
    
    if(data.quantity >0){
        isupdated= true;
        console.log(data.quantity)
        if(data.isContain){
            const C = await ItemList.findOne({where:{
                StorageId: data.StorageId,
                ItemId: data.id,}});
                console.log(C instanceof ItemList)
                // update the quantity as much bought
                await C?.increment({quantity: data.quantity}) 
    }
    else{
        const X = await ItemList.create({
            StorageId: data.StorageId,
            ItemId: data.id,
            quantity: data.quantity
        });
        console.log(X instanceof ItemList);
    }
    }  
    });

    if(isupdated){
      
        response.json('Updated!');
    }
    else{
        response.json('Check the quantity');
    }
   
})
export default router;
