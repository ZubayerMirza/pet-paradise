import express, { Router}  from "express";
import Users from "../models/users";
import { Op } from "sequelize"; // optionTypes from sequelize for queling with filter
import FriendList from "../models/friends/friendsList";
import Pets from "../models/pet/pets";



const router: Router = express.Router();
/*************************************
// find one user and show the info 
**************************************/
router.post('/find_user', async (request, response) => {
    console.log('hi')
        // http://localhost:8000/find_user
    // {
    //     "petname": "b"
    //    } 
    // /{"petname": "gh", "userId": props.data.userId}
    await Pets.findOne({
        where:{
            petname: request.body.petname,
            // [Op.or]: [{pet:1},{friend_id:1}]
        },
        include: ['to', 'from', 'my_level','pet_type','user'],
        //   include: {all: true, nested: true}
    //     include: ['from'],
      
        // order:[
        //     ['to','createdAt','DESC']||['from','createdAt','DESC']
        // ]
    }).then((user)=>{
        // response.json( user?.dataValues.to)
    //    console.log(user?.dataValues.to.length)
    if (user?.dataValues.to.length !=0){
        user?.dataValues.to.forEach(async (data: any)=>{
            if((data.userId ===request.body.userId)&&(data.Friend_List.isRequest ===true)){
                response.json({
                    friend_id: user?.get('id'), 
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    isLogin: user?.dataValues.user.isLogin,
                    isRequst:data.Friend_List.isRequest }) 
            }
            if((data.userId ===request.body.userId)&&(data.Friend_List.isFriend ===true)){
                response.json({
                    friend_id: user?.get('id'), 
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    isLogin: user?.dataValues.user.isLogin,
                    isFriend:data.Friend_List.isFriend }) 
            }
        })
    }
    else if (user?.dataValues.from.length !=0){
        user?.dataValues.from.forEach(async (data: any)=>{
            if((data.userId ===request.body.userId)&&(data.Friend_List.isRequest ===true)){
                // console.log('hh')
            response.json({
            friend_id: user?.get('id'), 
            petname: user?.get('petname'), 
            lv: user?.dataValues.my_level.level, 
            type: user?.dataValues.pet_type.name,
            isLogin: user?.dataValues.user.isLogin,
            isRequst:data.Friend_List.isRequest }) 
            }
            if((data.userId ===request.body.userId)&&(data.Friend_List.isFriend ===true)){
                response.json({
                    friend_id: user?.get('id'), 
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    isLogin: user?.dataValues.user.isLogin,
                    isFriend:data.Friend_List.isFriend }) 
            }
        })
    }
    else{
        response.json({
            friend_id: user?.get('id'), 
            petname: user?.get('petname'), 
            lv: user?.dataValues.my_level.level, 
            type: user?.dataValues.pet_type.name,
            isLogin: user?.dataValues.user.isLogin }) 
    }
       console.log(JSON.stringify(user?.dataValues, null, 2));
        // if(user?.dataValues.to)
      
    }
    )
})


/*************************************
// add friends
**************************************/

router.post('/add_friend', async (request, response) => {
  
    // http://localhost:8000/add_friend
    // {
    //     "friend_id": 1,
    //     "my_id" : 2
    //  }
      
    await FriendList.create({
        isRequest:true,
        friend_id: request.body.friend_id, //request 
        my_id: request.body.my_id // sender
    }).then((result)=>{
        response.json(result)
        console.log(result instanceof FriendList);
    }).catch((error)=>{
        if (error.original.errno ==1062){
            response.json('already')
            // no response-> just take the error before!
        }
    })
})
  
 
//friends page
router.route('/friends')

// adding friend XXX
.put( async(request, response)=>{ 
})


/*************************************/
// show all friends list of the user
/*************************************/

.post(async (request, response) => { 

//http://localhost:8000/friends
// {
//     "id": 2
    
//  }
//level보내야한
 console.log(request.body)
const friendsList = await Pets.findOne({
    where:{
        id: request.body.id,
    },
//     // include: {all: true, nested: true}
    include: ['to', 'from','my_level','pet_type','user'],
//     include: ['from'],

    // order:[
    //     ['to','createdAt','DESC']||['from','createdAt','DESC']
    // ]
}) 

// console.log(JSON.stringify(friendsList, null, 2));
// response.json(friendsList)


var list: any[] = [];


if((friendsList?.dataValues.from.length != 0)){
//     console.log('here')
    
    // if((friendsList?.dataValues.to[0].Friend_List.isInvited == 1)){
    //     response.json('this pet is invited')
    // }
    // else if(friendsList?.dataValues.to[1].Friend_List.isFriend == 1){
    //     response.json('they r friends')
    // }
         friendsList?.dataValues.from.forEach(async (users: any) => {
            if(users.Friend_List.isFriend == 1){
                
                list = [...list, {id: users.get('id'), petname: users.get('petname')}] // putting in array for querying 
               
            }

            });

            console.log('a')
    // response.json(friendsList?.dataValues.to)
    
    // response.json(friendsList?.dataValues.to[1].Friend_List.isFriend)
}
else if((friendsList?.dataValues.to.length!= 0)){
     friendsList?.dataValues.to.forEach(async (users: any) => {
            if(users.Friend_List.isFriend == 1){
                
                list = [...list, {id: users.get('id'), petname: users.get('petname')}] // putting in array for querying 
               
            }

            });

            console.log('b')
}
// else{ // when invited from other users exist
//     // if(friendsList?.dataValues.from.length != 0){
    
//     //     friendsList?.dataValues.from.forEach(async (users: any) => {
//     //         if(users.Friend_List.isFriend == 1){
                
//     //             list = [...list, {id: users.get('id')}] // putting in array for querying 
               
//     //         }

//     //         });

        
//     //     console.log(list)


//     //from -> array[0] -> friend_list 
//     //user has to take one pet as forien key to see the name with one query!
//     // console.log(JSON.stringify(friendsList.dataValues.from[0].friend_list, null, 2));
//     // have to send it as it is to show the request list

// }
else if (((friendsList?.dataValues.from.length == 0) && (friendsList?.dataValues.to.length)==0) || (list.length==0)){
    response.json('no friends')
    console.log('c')
}// when both user aksed, is invited from others

if(list.length >0){
    response.json(list)
    console.log('d')
}
else{
    response.json('no friends')
}

    // else if(friendsList?.dataValues.to.length != 0){

    //     friendsList?.dataValues.to.forEach(async (users: any) => {
    //         if(users.Friend_List.isFriend == 1)
    //         {
    //             list = [...list, {id: users.get('id')}] // putting in array for querying 
               
    //         }
    //     });

    // }
// }


// await Pets.findAll({
//     where:{
//         // id: request.body.id,
//         [Op.or]: list
//     }, 
//     include: ['my_level','pet_type','user'],
// }).then((myfriend)=>{
    
//     list = [] // make empty to contain new 
  
//     myfriend.forEach(async (data: any) => {
       
//      list = [...list, { friend_id: data.get('id'), 
//                 petname: data.get('petname'), 
//                 lv: data.dataValues.my_level.level, 
//                 type: data.dataValues.pet_type.name,
//                 isLogin: data.dataValues.user.isLogin,
//                 }]
//             })
  
// })

//  var friends_list = JSON.parse(JSON.stringify(list)); 
// response.json(friends_list)
})



/*************************************
// Check whether invited or not 
**************************************/
router.route('/invited')
.post(async (request, response) => {
    var list: any[] = [];

    await Pets.findOne({
        where:{
            id: request.body.id,
            // [Op.or]: [{pet:1},{friend_id:1}]
        },
        
        include: ['from'],
        //   include: {all: true, nested: true}
    //     include: ['from'],
    
        // order:[
        //     ['to','createdAt','DESC']||['from','createdAt','DESC']
        // ]
    })
    .then((result)=>{
        // response.json(result)
    
        // console.log(JSON.stringify(result, null, 2));
        if(result?.dataValues.from.length>0){
            result?.dataValues.from.forEach(async (users: any) => {
            
                if(users.Friend_List.isRequest == 1){
                // console.log(users.id)
                list.push({
                    "id": users.id,
                    "petname": users.petname,
                    "isRequest": users.Friend_List.isRequest
                })
               
    
               }
               
               });
        }

       
           var invited_list = JSON.parse(JSON.stringify(list)); 
           if(invited_list.length >0){
            response.json(invited_list)
           }
           else{
            response.json('no request from others');
           }
        //  
    })

    
    //http://localhost:8000/invited
    // {
//    "id" : 4
// }


// // if(request.body.case =="from"){
//  await Pets.findOne({
//         where:{
//             id: request.body.id,
//             // [Op.or]: [{pet:1},{friend_id:1}]
//         }, 
//         include: ['to'],
//         //   include: {all: true, nested: true}
//     //     include: ['from'],
    
//         // order:[
//         //     ['to','createdAt','DESC']||['from','createdAt','DESC']
//         // ]
//     }) 
//     .then((result)=>{
        
//         console.log(JSON.stringify(result, null, 2));
//         var list: any[] = [];
//         if(result?.dataValues.from.length==0){
//             response.json('no request friend');
//         }
//         else{
//             result?.dataValues.from.forEach(async (users: any) => {

//                 if(users.Friend_List.isRequest == 1){
//                  // console.log(users.id)
//                  list.push({
//                      "invited_id": users.id,
//                      "invited_name": users.petname,
//                      "isInvited": users.Friend_List.isRequest
//                  })
//                 }
                 
//                 });
//                 var invited_list = JSON.parse(JSON.stringify(list)); 
//                 response.json(invited_list);
//         }
//     })
 
     
})




/**********************************/
// accept or not for the request

.put( async (request, response) => {

    // http://localhost:8000/invited
    // {
    //     "my_id" : 1,
    //     "isAccepted": true,
    //     "friend_id" : 3
    //   }
      
   
await FriendList.findOne({
    where:{
    my_id: request.body.sender_id, // the one sent 
    friend_id: request.body.receve_id // has to be the one receive
    },
}).then((result)=>{
  
    // response.json(result?.dataValues)

    if (request.body.isAccepted === true){
        result?.set({isAccepted : true, isFriend: true, isRequest: false})
        result?.save()
         
    }
    else {
        result?.set({isRequest: false, isFriend: false, isAccepted :false})
        result?.save()
        // response.json(result)
    }
    response.json(result)

})
   
})


/*************************************
// Check whether invited or not 
**************************************/
router.route('/waiting')
.post(async (request, response) => {
    var list: any[] = [];

    await Pets.findOne({
        where:{
            id: request.body.id,
            // [Op.or]: [{pet:1},{friend_id:1}]
        },
         
        include: ['to'],
        //   include: {all: true, nested: true}
    //     include: ['from'],
    
        // order:[
        //     ['to','createdAt','DESC']||['from','createdAt','DESC']
        // ]
    })
    .then((result)=>{
        // response.json(result)
    
        // console.log(JSON.stringify(result, null, 2));
        if(result?.dataValues.to.length>0){
            result?.dataValues.to.forEach(async (users: any) => {
            
                if(users.Friend_List.isRequest == 1){
                // console.log(users.id)
                list.push({
                    "friend_id": users.id,
                    "friend_name": users.petname,
                    "isWaiting": users.Friend_List.isRequest
                })
               
    
               }
               
               });
        }

       
           var invited_list = JSON.parse(JSON.stringify(list)); 
           if(invited_list.length >0){
            response.json(invited_list)
           }
           else{
            response.json('no waiting friend');
           }
        //  
    })

    
    //http://localhost:8000/invited
    // {
//    "id" : 4
// }


// // if(request.body.case =="from"){
//  await Pets.findOne({
//         where:{
//             id: request.body.id,
//             // [Op.or]: [{pet:1},{friend_id:1}]
//         }, 
//         include: ['to'],
//         //   include: {all: true, nested: true}
//     //     include: ['from'],
    
//         // order:[
//         //     ['to','createdAt','DESC']||['from','createdAt','DESC']
//         // ]
//     }) 
//     .then((result)=>{
        
//         console.log(JSON.stringify(result, null, 2));
//         var list: any[] = [];
//         if(result?.dataValues.from.length==0){
//             response.json('no request friend');
//         }
//         else{
//             result?.dataValues.from.forEach(async (users: any) => {

//                 if(users.Friend_List.isRequest == 1){
//                  // console.log(users.id)
//                  list.push({
//                      "invited_id": users.id,
//                      "invited_name": users.petname,
//                      "isInvited": users.Friend_List.isRequest
//                  })
//                 }
                 
//                 });
//                 var invited_list = JSON.parse(JSON.stringify(list)); 
//                 response.json(invited_list);
//         }
//     })
 
     
})


export default router;
