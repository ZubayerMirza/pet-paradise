import React, { useState, useRef  } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png";
import "./friend.css";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaUserPlus } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import AddFriends from './AddFriends';
import { FaMagnifyingGlass } from "react-icons/fa6";
import InvitedList from './InvitedList';
import socket from '../home/websocket';

function Return(props: any){
    console.log(props.friendList)

    const ref =useRef('Add');
    const onClickHandler=(e:any)=>{
        // e.preventDefault();
        // console.log(e.target.id)

        // if(e.target.id=="add"){
        //     props.AddFriend({"f_id": props.friendList[0].friend_id, "u_id": props.data.userId});
        // }

    }

    if(props.friendList.length>0){
      console.log('more')

      return(
        <>{
       props.friendList.map((data: { id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; petname: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; isRequest: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; },index:any) => {
        <div key={index} className="list-contents">
        <div className="list-contents-data">{data.id}</div>
         <div className="list-contents-data">{data.petname}</div>
        <div className="list-contents-data">{data.isRequest}</div>
         {/* <div  onClick={onClickHandler} className="list-contents-data color" id="add">{ref.current}</div> */}
        </div>
            //     <Return key={index} getFriends={getFriends} friendList={friendList} data={data} />
        })}
        </>)
    }

    return(
      <>
     
       <div className="list-contents">
   <div className="list-contents-data">{props.data.id}</div>
    <div className="list-contents-data">{props.data.name}</div>
   <div className="list-contents-data">{props.data.isRequest}</div>
    <div  onClick={onClickHandler} className="list-contents-data color" id="add">{ref.current}</div>
   </div>

       {/* <div className="list-contents">
            <div >Gi</div>
             </div> */}
      </>)
}

function Friend (props: any) {

  const navigate = useNavigate();
  // const navigate = useNavigate(); // hook to navigate
const [msg, setMsg]= useState("");

interface Friends  { 
    id: number, 
    petname: string,
    type: string,
    lv: number,
    isFriend: boolean,
    isLogin: boolean,
    isRequst:boolean
  };

  interface Friend  { 
    friend_id: string,
    id: number, 
    name: string,
    info: string,
  };

 
  let friend: Friends []=[];
  const [friendList,setFriendList] = useState<typeof friend>([]);
// let myFriend: Friends [] =[];


  const OnClickHandler = (e:any)=>{
    e.preventDefault();
    let test =e.target.id;
    if (e.target.id =="all"){
        FetchFriends();
    }else if(e.target.id =="search"){
        SearchFriend(test);
    }else if(e.target.id =="request"){
        // SearchFriend(test);
        setMsg("request")
    }else if(e.target.id =="add"){
      setMsg("Add");
      // AddFriend(test);
    }else if(e.target.id=="wait"){
      WaitingFriend(test);
        // Accept();
    }

  }

  // to get all friends 
  const FetchFriends = ()=>{
    
    // console.log(props.data)
    fetch('http://localhost:8000/friends', {
        method: "POST", 
        headers: { // header specifies the content type for the request
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({"id": props.data.petId}),
      }).then(response => {return response.json()})
      .then(async response => {
       if (response == "no friends"){
        setMsg("no friends");
        }
        else{
          console.log(response)
        }
      
      }); 
    }

    const Reset=()=>{
        friend = [];
        setMsg("");
       
    }

    const SearchFriend = (data: any)=>{
        Reset();
        setFriendList([]);
        var test ="";
        if (data =="wait"){
            test="to";
        }
        else{
            test="from";
        }
        fetch('http://localhost:8000/find_user', {
            method: "POST", 
            headers: { // header specifies the content type for the request
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"petname": "Vivi", "userId": props.data.userId, "case": test}),
          }).then(response => {return response.json()})
          .then(async response => {
            
        //     //create my pet
            // console.log(response);
            if (response){
                // console.log('here')
                friend = [...friend, response];
                // console.log(friend)
            }
            else{
                console.log(parseInt(response.length))
            }
            // response.map((data: any)=>{
            //     // item= data;
            
            //   })
            console.log(friend);
              setFriendList(friend);
        //    //{id: 1, petname: 'Json', userId: 4, typeId: 1, updatedAt: '2024-03-20T21:55:24.260Z', 
        //    if (response == "no friends"){
            
        //     return(<>
        //     <div className="list-contents" >Start add friends!</div>
        //     </>)
        //     }}); 
            //    }
    //    else if(response === "Already exist"){
    //     alert ("Already exist");
    //    }
    //    else if(response ==="petname must be unique"){
    //     alert ("Pet name is already exist");
    //    }
    //   }).catch(error=>{
    //     console.log(error);
    
      })
        }
        
        
        const AddFriend = (data: any)=>{
            Reset();
        setFriendList([]);
            
            console.log("data: " ,data);
            fetch('http://localhost:8000/add_friend', {
                method: "POST", 
                headers: { // header specifies the content type for the request
                  "Content-Type": "application/json",
                },
                // body: JSON.stringify({"friend_id": data.f_id,my_id: data.u_id}),
                body: JSON.stringify({"friend_id": 1,my_id: 3}),
              }).then(response => {return response.json()})
              .then(async response => {
                
            //     //create my pet
                console.log(response);
                if (response){
                    // console.log('here')
                    friend = [...friend, response];
                    // console.log(friend)
                }
                else{
                    console.log(parseInt(response.length))
                }
                // response.map((data: any)=>{
                //     // item= data;
                
                //   })
                // console.log(friend);
                  setFriendList(friend);
            //    //{id: 1, petname: 'Json', userId: 4, typeId: 1, updatedAt: '2024-03-20T21:55:24.260Z', 
            //    if (response == "no friends"){
                
            //     return(<>
            //     <div className="list-contents" >Start add friends!</div>
            //     </>)
            //     }}); 
                //    }
        //    else if(response === "Already exist"){
        //     alert ("Already exist");
        //    }
        //    else if(response ==="petname must be unique"){
        //     alert ("Pet name is already exist");
        //    }
        //   }).catch(error=>{
        //     console.log(error);
        
          })
            }

    const WaitingFriend = (data: any)=>{
        // id: request.body.id,
        Reset();
        setFriendList([]);

        fetch('http://localhost:8000/invited', {
            method: "POST", 
            headers: { // header specifies the content type for the request
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"id": props.data.userId}),
          }).then(response => {return response.json()})
          .then(async response => {
            
        //     //create my pet
            // console.log(response)
        //    //{id: 1, petname: 'Json', userId: 4, typeId: 1, updatedAt: '2024-03-20T21:55:24.260Z', 
           if (response == "no request from others"){
            setMsg("no request");
            // return(<>
            // <div className="list-contents" >Start add friends!</div>
            // </>)
            } 
            else{
              // console.log(response);
              response.map((data: any)=>{
                //     // item= data;
                friend = [...friend, data];
                  })
            
              // console.log(friend)
            }
            //    }
            setFriendList(friend);
    //    else if(response === "Already exist"){
    //     alert ("Already exist");
    //    }
    //    else if(response ==="petname must be unique"){
    //     alert ("Pet name is already exist");
    //    }
    //   }).catch(error=>{
    //     console.log(error);
    
      })
     
        }

     
    const Accept = (data:any)=>{
        Reset();
        setFriendList([]);
        // id: request.body.id,
             // http://localhost:8000/invited
    // {
    //     "my_id" : 1,
    //     "isAccepted": true,
    //     "friend_id" : 3
    //   }
        fetch('http://localhost:8000/invited', {
            method: "PUT", 
            headers: { // header specifies the content type for the request
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"receve_id": props.data.userId, "sender_id_id":1}),
          }).then(response => {return response.json()})
          .then(async response => {
            
            console.log(response)
        
      })
        }


  const getFriends = () =>{

    if(msg ==="no friends"){
        
        return(<> 
        <div className="list-contents">You have no friends yet !</div>
       </>)
       
    }
    else if(msg ==="no request"){
        return(<> 
            <div className="list-contents">You have no request from yet !</div>
           </>)
    }
    else if(msg ==="Add"){
      return(<><AddFriends data={props.data}></AddFriends></>)
    }
    if(friendList.length>0){
  
        return(<> 
                <Return  data ={props.data} getFriends={getFriends} friendList={friendList} AddFriend={AddFriend} />
           </>)
    }
    
    return(<>
    {/* <div className="list-contents">
   <div className="list-contents-data">id</div>
    <div className="list-contents-data">name</div>
   <div className="list-contents-data">isRequest</div>
    <div  className="list-contents-data color" id="add">??</div>
   </div> */}
    </>)
  }
  const [set,setSet]=useState({message: "",
  sender: 0,
  receiver:"",
  receiverId: 0,
  url:""})

  useEffect(()=>{
    socket.on("actionTest", (response:{message: string,
      sender: number,
      receiver: string,
      receiverId: number,
      url: string})=>{
        setSet(response);
      })
    console.log('count');
      
    },[])
    
    useEffect(()=>{
      console.log(set)
      },[{set}])

  return (
  <>
{/* <div className='side-bar'> */}
 
 <div className="friend-box">
 <div className="friend-sidebar"> 
 <div className='friend-contents' onClick={OnClickHandler} id="all"><LiaUserFriendsSolid /> Friends</div>
 <div className='friend-contents' onClick={OnClickHandler} id="add"><FaUserPlus />  Add</div>
<div className='friend-contents' onClick={OnClickHandler} id="request"><FaCheckCircle />   Requeted</div>
<div className='friend-contents' onClick={OnClickHandler} id="wait">Waiting</div>

 </div>
 <div className="friend-body">
  {
    msg ==="no friends" ? <> <div className="list-contents">You have no friends yet !</div></> :
    msg ==="Add" ? <AddFriends data={props.data}></AddFriends> :
    msg ==="request" ? <InvitedList data={props.data}></InvitedList> :
    <></>
  }
 
          {/* <div className="list-contents">
          {friendList.map((data,index)=>{
            <div >{data.id}</div>
          })}
             </div> */}
          
       
 {/* <Return  data ={props.data} getFriends={getFriends} friendList={friendList} AddFriend={AddFriend} /> */}
 </div>
 </div>
 </>)
}


export default Friend;