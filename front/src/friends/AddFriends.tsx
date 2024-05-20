import React, { useState,useEffect} from "react";
import "./friend.css";
import { FaCircleUser } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";


function AddFriends(props:any) {
//  console.log(props.data)
const [result,setResult]=useState({
  friend_petId: 0,
  friend_userId: 0,
  username: "",
  petname: "",
  lv: 0,
  type: "",
  url: "",
  isRequest: false,
  status: ""
}
);
const [user,setUser]=useState('');
const [isUser,setIsUser]=useState('');
const Submit =(e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
      
        if(user!==props.data.username){
            fetchOneFriend();
        }
        else if(user === props.data.username){
            setIsUser('yourself')
            setUser("");
        }
    }
}
const onClickHandler =()=>{
  if(user!==props.data.username){
    fetchOneFriend();
}
else if(user === props.data.username){
    setIsUser('yourself')
    setUser("");
}
}

const fetchOneFriend =()=>{
  setResult({
    friend_petId: 0,
    friend_userId: 0,
    username: "",
    petname: "",
    lv: 0,
    type: "",
    url: "",
    isRequest: false,
    status:""
  })

    fetch('http://localhost:8000/find_user', {
            method: "POST", 
            headers: { // header specifies the content type for the request
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": `${user}`, "userID": props.data.userId, "petId":props.data.petId}),
          }).then(response => {return response.json()})
          .then(async response => {
            
                if(response === "No user"){
                setIsUser("no")
                setUser("");
                setResult({
                  friend_petId: 0,
                  friend_userId: 0,
                  username: "",
                  petname: "",
                  lv: 0,
                  type: "",
                  url: "",
                  isRequest: false,
                  status:""
                })
                }
                else if(response === "yourself"){
                  setIsUser('yourself')
                  setUser("");
                }
                else{
                  console.log('response : ',response)
                  setResult(response);
                  setIsUser("")
                  setUser("");
                }
      })
}
const Send=()=>{
  
// console.log(result.friend_petId)
fetch('http://localhost:8000/add_friend', {
  method: "POST", 
  headers: { // header specifies the content type for the request
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({"friend_id": data.f_id,my_id: data.u_id}),
  body: JSON.stringify({"recieverId":result.friend_petId,"senderId": props.data.petId,"receiver": result.username, "sender": props.data.username}),
}).then(response => {return response.json()})
.then(async response => {
               
                if (response==="success"){
                    setIsUser(response)
                    setUser(""); 
                }
                else{
                    console.log(parseInt(response.length))
                }
        
})
}

useEffect(()=>{
console.log('result1: ', result)
console.log(result.friend_petId)
},[{result}])

  return (
    <>
    <div className="friend-serch-box">
    <input type="text" 
    className="search-finder" 
    placeholder='Search the user'
    value={user}
    onChange={(e)=>{setUser(e.target.value)}}
    onKeyDown={Submit}></input>
    <button className="search-img" onClick={onClickHandler}><FaMagnifyingGlass style={{width:"12px", height:"12px"}} /></button>
    </div>
    {
      
        isUser === "no" ? 
        <div className="list-contents">No user found</div> :
        isUser === "yourself" ?
        <div className="list-contents">You can't search your name</div> :
        result.username !== "" ?<>
        <div className="list-contents-title">
        <div className="list-contents-data"></div>
        <div className="list-contents-data">USER</div>
        <div className="list-contents-data">PET</div>
        <div className="list-contents-data">ACTION</div>
        </div>
        <div className="list-contents">
          {
             result.url !== null ?
             <div className="list-contents-data">
              <img src={"uploads/" +`${result.url}`}
             alt="Profile"
             style={{height: 30,width: 30,borderRadius: "50%",}}/>
             </div> :
            <div className="list-contents-data"><FaCircleUser></FaCircleUser></div>  
        }
        <div className="list-contents-data">{result.username}</div>
         <div className="list-contents-data">{result.petname}</div>
         {
          ((result.isRequest === true)&&(result.status="request")) ?
          <div className="list-contents-data color1" id="add">pending</div> 
          :
          ((result.isRequest === true)&&(result.status="invited")) ?
          <div className="list-contents-data color1" id="add">Invited</div> :
          (isUser ==="success")? 
          <div className="list-contents-data color1" id="add">Requested</div> :
           <div  onClick={Send} className="list-contents-data color" id="add">Add</div>
         }
         
        </div>
        </> :
        <></>
    }
    </>
  );
}
export default AddFriends;