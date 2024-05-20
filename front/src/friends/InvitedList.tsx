import React, { useState,useEffect} from "react";
import "./friend.css";
import { FaCircleUser } from "react-icons/fa6";
import socket from "../home/websocket";

function List (props:any){
 

  const Accept =(senderId:number, receiverId:number,action:string)=>{

    socket.emit("action",{
      message: action, 
      sender: props.data.username,
      receiver: props.info.username,
      receiverId:props.info.userId})
      
    // fetch('http://localhost:8000/invited', {
    //         method: "PUT", 
    //         headers: { // header specifies the content type for the request
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({"senderId": senderId, "receiverId":receiverId, "action":action}),
    //       }).then(response => {return response.json()})
    //       .then(async response => {
    //            console.log(response)
    //            props.fetchInvited();

    //            socket.emit("action",{
    //             message: action, 
    //             sender: props.data.username,
    //             receiver: props.info.username,
    //             receiverId:props.info.userId})
    //   })
    
  }

  
  const onClickHandler=(e:any)=>{
    
    // if(e.target.innerHTML ==="Reject"){
    //   console.log(e.target.innerHTML)
    // }
    // else{
      Accept(e.target.id,props.data.petId,e.target.innerHTML);
    // }

  }
return(<><div className="list-contents">
 {/* {
  props.data.isRequest ===true ? */}
  <> {/* {
    result.url !== null ?
    <div className="list-contents-data">
     <img src={"uploads/" +`${result.url}`}
    alt="Profile"
    style={{height: 30,width: 30,borderRadius: "50%",}}/>
    </div> : */}
   <div className="list-contents-data"><FaCircleUser></FaCircleUser></div>  
{/* } */}
<div className="list-contents-data">{props.info.username}</div>
<div className="list-contents-data">{props.info.petname}</div>
 <div className="list-contents-data color1">Invited</div>
<div className="list-contents-data color"  onClick={onClickHandler} id={props.info.petId}>Accept</div> 
<div className="list-contents-data color2" onClick={onClickHandler} id={props.info.petId}>Reject</div> 
</>
 {/* :<></>} */}
  
</div></>)
};

function InvitedList(props:any) {


const [list,setList]=useState([]);
const [result,setResult]=useState({
  friend_petId: 0,
  friend_userId: 0,
  username: "",
  petname: "",
  // url: "",
  isRequest: false,
}
);


// setResult({
//   friend_petId: 0,
//   friend_userId: 0,
//   username: "",
//   petname: "",
//   lv: 0,
//   type: "",
//   url: "",
//   isRequest: false,
//   status:""
// })
const fetchInvited =()=>{
  

    fetch('http://localhost:8000/invited', {
            method: "POST", 
            headers: { // header specifies the content type for the request
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"userID": props.data.userId, "petId":props.data.petId}),
          }).then(response => {return response.json()})
          .then(async response => {
                // 
                setList(response);
                
      })
}

useEffect(()=>{
fetchInvited();
},[])

useEffect(()=>{
// console.log('result: ', list)
},[{list}])

  return (
    <>
    
    <div className="list-contents-title">
        <div className="list-contents-data"></div>
        <div className="list-contents-data">USER</div>
        <div className="list-contents-data">PET</div>
        <div className="list-contents-data">STATUS</div>
        <div className="list-contents-data">ACTION</div>
        <div className="list-contents-data">ACTION</div>
        </div>
        {
      list.map((data: {username: string, petId: number, petname: string, isRequest: boolean, userId: number},index:number)=>{
       return <List fetchInvited={fetchInvited} info={data} data={props.data}key={index} />
      })
    }
    </>
  );
}
export default InvitedList;