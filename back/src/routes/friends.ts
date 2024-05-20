import express, { Router}  from "express";
import Users from "../models/users";
import { Op } from "sequelize"; // optionTypes from sequelize for queling with filter
import FriendList from "../models/friends/friendsList";
import Pets from "../models/pet/pets";


const router: Router = express.Router();

// let friend : friendInfo;
/*************************************
// find one user and show the info 
**************************************/
router.post('/find_user', async (request, response) => {
    console.log(request.body)
    await Users.findOne({where: 
        {username: request.body.username},//friend name
        include: ['pet']
    }).then(async (res)=>{
    //    console.log(res);
        if(res ===null){
            response.json('No user')
        }
        else{

        if(res?.dataValues.pet !== null){
           
            await Pets.findOne({
                where:{
                    id: res?.dataValues.pet.id,
                    // [Op.or]: [{pet:1},{friend_id:1}]
                 },
                include: ['to', 'from', 'my_level','pet_type','user'],
                
                 
                //   include: {all: true, nested: true}
            //     include: ['from'],
              
                // order:[
                //     ['to','createdAt','DESC']||['from','createdAt','DESC']
                // ]
            }).then((user)=>{
        
                //  console.log(JSON.stringify(user?.dataValues, null, 2));
                // response.json( user?.dataValues.to)
                console.log('to   : ',user?.dataValues.to.length)
                console.log('from : ',user?.dataValues.from.length)
            if((user?.get('id'))===request.body.petId){
                response.json('yourself')
            }
            else if ((user?.dataValues.to.length !==0)&&(user?.dataValues.from.length===0)){
                console.log('------------------------------------ 1')
                // console.log(JSON.stringify(user?.dataValues, null, 2));
                console.log(JSON.stringify(user?.dataValues.to, null, 2));
                let count :number =0;
                user?.dataValues.to.forEach(async (data: any)=>{
                    if((data.Friend_List.friend_id===request.body.petId)&& (data.Friend_List.my_id===user?.get('id'))){
                        console.log('------------------------------------  1-1')
                        return response.json({
                    friend_petId: user?.get('id'), 
                    friend_userId: user?.get('userId'),
                    username: user?.dataValues.user.username,
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    isRequest:data.Friend_List.isRequest,
                    url: user?.dataValues.user.profilePictureUrl,
                    status: "pending" }) 
                    }
                    else{
                        count++;
                    }
                    // console.log(count);
                    // else{
                    //     return response.json({
                    //         friend_petId: user?.get('id'), 
                    //         friend_userId: user?.get('userId'),
                    //         username: user?.dataValues.user.username,
                    //         petname: user?.get('petname'), 
                    //         lv: user?.dataValues.my_level.level, 
                    //         type: user?.dataValues.pet_type.name,
                    //         url: user?.dataValues.user.profilePictureUrl
                    //      }) 
                    // }
                })
                if(count ===user?.dataValues.to.length){
                    count=0;
                        return response.json({
                            friend_petId: user?.get('id'), 
                            friend_userId: user?.get('userId'),
                            username: user?.dataValues.user.username,
                            petname: user?.get('petname'), 
                            lv: user?.dataValues.my_level.level, 
                            type: user?.dataValues.pet_type.name,
                            url: user?.dataValues.user.profilePictureUrl
                         }) 
                }
            }
            else if (((user?.dataValues.from.length !==0)&&(user?.dataValues.to.length===0))){
                console.log('------------------------------------ 2')
                console.log(JSON.stringify(user?.dataValues, null, 2));
                let count: number = 0;
                console.log(count);
                user?.dataValues.from.forEach(async (data: any)=>{
                    if((data.Friend_List.my_id===request.body.petId)&&(data.Friend_List.friend_id===user?.get('id'))){
                        console.log('------------------------------------  2-1')
                         // console.log(data.Friend_List.my_id===request.body.petId) 
                        // console.log(data.Friend_List.friend_id===user?.get('id')) 
                    return response.json({
                    friend_petId: user?.get('id'), 
                    friend_userId: user?.get('userId'), 
                    username: user?.dataValues.user.username,
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    isRequest:data.Friend_List.isRequest,
                    url: user?.dataValues.user.profilePictureUrl,
                    status: "pending" }) 
                    }
                    else{
                        count++;
                    }
                })
                if(count ===user?.dataValues.from.length){
                    count=0;
                        return response.json({
                            friend_petId: user?.get('id'), 
                            friend_userId: user?.get('userId'),
                            username: user?.dataValues.user.username,
                            petname: user?.get('petname'), 
                            lv: user?.dataValues.my_level.level, 
                            type: user?.dataValues.pet_type.name,
                            url: user?.dataValues.user.profilePictureUrl
                         }) 
                }
            }
            else if(((user?.dataValues.from.length>0)&&(user?.dataValues.to.length>0))){
                console.log('3')
                user?.dataValues.to.forEach(async (data: any)=>{
                    if((data.Friend_List.friend_id===request.body.petId)&& (data.Friend_List.my_id===user?.get('id'))){
                        console.log('------------------------------------  3-1')
                       return response.json({
                     friend_petId: user?.get('id'), 
                    friend_userId: user?.get('userId'),
                    username: user?.dataValues.user.username,
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    isRequest:data.Friend_List.isRequest,
                    url: user?.dataValues.user.profilePictureUrl,
                    status: "pending" })  
                }
                })
                user?.dataValues.from.forEach(async (data: any)=>{
                    if((data.Friend_List.my_id===request.body.petId)&& (data.Friend_List.friend_id===user?.get('id'))){
                        console.log('------------------------------------  3-2')
                        return response.json({
                    friend_petId: user?.get('id'), 
                    friend_userId: user?.get('userId'),
                    username: user?.dataValues.user.username,
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    isRequest:data.Friend_List.isRequest,
                    url: user?.dataValues.user.profilePictureUrl,
                    status: "pending" })  
                } 
                })
            }
            else{
                console.log('------------------------------------ 4')
                return response.json({
                    friend_petId: user?.get('id'), 
                    friend_userId: user?.get('userId'),
                    username: user?.dataValues.user.username,
                    petname: user?.get('petname'), 
                    lv: user?.dataValues.my_level.level, 
                    type: user?.dataValues.pet_type.name,
                    url: user?.dataValues.user.profilePictureUrl
                 }) 
            }
            }
            )

        }  
        else{ // in case of pet is not there yet
            response.json('No user')
        }

        } 
    })
})


/*************************************
// add friends
**************************************/

router.post('/add_friend', async (request, response) => {

    await FriendList.create({
        isRequest:true,
        friend_id: request.body.recieverId, //request 
        my_id: request.body.senderId, // sender
        sender: request.body.sender,
        receiver: request.body.receiver
    }).then((result)=>{
         // console.log(result instanceof FriendList);
        response.json('success')
       
    })
    .catch((error)=>{
        if (error.original.errno ==1062){
            response.json('success')
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

const friendsList = await Pets.findOne({
    where:{
        id: request.body.id,
    },

    include: ['to', 'from','my_level','pet_type','user'],

}) 


var alllist: any[] = [];
if((friendsList?.dataValues.from.length > 0)){

         friendsList?.dataValues.from.forEach(async (users: any) => {
            if(users.Friend_List.isFriend == 1){
                
                alllist = [...alllist, {id: users.get('id'), petname: users.get('petname')}] // putting in array for querying 
               
            }

            });

            // console.log('a')
    // response.json(friendsList?.dataValues.to)
    
    // response.json(friendsList?.dataValues.to[1].Friend_List.isFriend)
}
else if((friendsList?.dataValues.to.length > 0)){
     friendsList?.dataValues.to.forEach(async (users: any) => {
            if(users.Friend_List.isFriend == 1){
                
                alllist = [...alllist, {id: users.get('id'), petname: users.get('petname')}] // putting in array for querying 
               
            }

            });
 
}


if(list.length >0){
    console.log("list : ", alllist)
    // response.json(list)
    // console.log('d')
}
else{
    response.json('no friends')
}

})



/*************************************
// Check whether invited or not 
**************************************/


interface InvitedList{
    petId : number,
    petname: string,
    username:string
    userId :number,
    isRequest: boolean,
    // url: string
}
var list: InvitedList[] = [];
router.route('/invited')
.post(async (request, response) => {
    

    await Pets.findOne({
        where:{
            id: request.body.petId,
        },
        include: ['from'],
    })
    .then((result)=>{
        
    
        console.log(JSON.stringify(result, null, 2));
        if(result?.dataValues.from.length>0){
            result?.dataValues.from.forEach((users: any) => {
                
                if(users.Friend_List.isRequest == 1){
                // console.log(users.id)
                // Users.findOne({where: 
                //     {id: users.userId},//friend name
                //     include: ['pet']
                // }).then((result)=>{
                    // console.log(result)
                    list.push({
                        "petId": users.id,
                        "petname": users.petname,
                        "username":users.Friend_List.sender,
                        "userId" : users.userId,
                        "isRequest": users.Friend_List.isRequest,
                        // "url": result?.getDataValue("profilePictureUrl")
                    })

                // })
                

            //    console.log('list ',list)
    
               }
               
               
               }); 
              console.log('list ',list)
               var invited_list = JSON.parse(JSON.stringify(list));
               console.log('ivlist ',invited_list) 
               if(invited_list.length >0){
                list=[];
                return response.json(invited_list)
               } 
               
               
        }
        // else if(result?.dataValues.from.length===0) {
        //     return response.json('no request from others');
        //    }

        
        //  
    })
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
    my_id: request.body.senderId, // the one sent 
    friend_id: request.body.receiverId // has to be the one receive
    },
}).then((result)=>{
  
    // response.json(result?.dataValues)
    console.log()
    if (request.body.action === "Reject"){
        // result?.set({isAccepted : false, isFriend: true, isRequest: false})
        result?.destroy()
        result?.save()
         
    }
    else {
        result?.set({isRequest: false, isFriend: true, isAccepted :true})
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

})


export default router;
