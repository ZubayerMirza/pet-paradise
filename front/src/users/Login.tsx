import React, { useEffect } from 'react';
import './login.css';
import '../home/home.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import socket from '../home/websocket';

function Login() {
 
  // useNavigate hook to the link setup
  const navigate = useNavigate(); 
  const [socketId,setSocketId] = useState('');

  // to handle the summit botton 
  const OnSubmitHandler = (e: any) => {
    e.preventDefault();

    // taking the value along with summit
    const testcase = { 
      username: e.target.username.value, 
      password: e.target.password.value,
      socketId: socketId
    };
    // console.log(testcase);
    
    /* 
    fetch method to ask request data of server as response
    according to response,
    navigate pet select page or alert occured  */

     fetch('http://localhost:8000/login', {
      method: "POST",
      headers: { // header specifies the content type for the request
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testcase), // conver to json string to request
    }).then(response => {return response.json()}) // return the json value from response 
    .then( response => { // the return json to use
      
      //set up the token to store in loval storage
      const token = JSON.stringify({
        username:response.username,
        userId: response.id,
        
      });
      
      // Store the token in localStorage
      localStorage.setItem("userToken", token);
      
      if(response.id){ // response should have id and username from serverside
          // if true -> passing the state with the username and user id 
          socket.emit('userIn',testcase.username,(res: string)=>{
            // console.log(res)
          });
          navigate("/pet",{state: {name: testcase.username, id: response.id, socketId: response.socketId}});
      }
      else if (response === "User not found"){ // if no user
        alert ("User not found");
      }
      else if (response === "Password is different"){ // if password matters
        alert ("Password is different");
      }
    })
    .catch(error => { 
      console.error('Something wrong', error);
    })
  }

  // passing the function for the button click event handle
  const OnClickHandler = (e: any) => {
   
    // acording to id it would navigate to 
    // signup page or login page
   if(e.target.id === "Create"){
    navigate("/signup");
   }
   else
   navigate("/login");
  }

  useEffect(()=>{
    socket.emit("socketid", (res:string) => {
      // console.log(res);
      setSocketId(res)
    });
  },[])

  useEffect(()=>{
      console.log('socketId : ', socketId);
  },[{socketId}])

  return (
    <>
    <div className='home'>
    <h1 id='logoTitle'>PET PARADISE</h1>
    <form className='LoginForm' onSubmit={OnSubmitHandler}>
      <div className='BtnBox'>
        <div onClick={OnClickHandler} id="Login">Login</div>
        <div onClick={OnClickHandler} id="Create">Create Account</div>
      </div>    
      <div className='LoginBox'>
        <label><b>Username</b>
        <input className="input" type="text" name="username" placeholder="Username" ></input></label>
        </div>
      <div className='LoginBox'>
        <label><b>Password</b>
        <input className="input" type="password" name="password" placeholder="Password" ></input></label>
        </div>
      <div className='LoginBox'>
        <button id="logBtn" type="submit">Login</button>
        </div>
      </form> 
      </div>   
    </>
  );
}

export default Login;

/*  ignore 
Error I had to remember

post fetch Error -> request body as empty
  : headers mattered with the request body parsing
  : header focusing on the content that will be used for request 
  : so initialize the content type *** rememeber ***

*/

 // -- ignore
  // // to get the object of user information -> try it later
  // type User = { userId: number, userName: string, status: boolean}
  // const [user,setUser] = useState<User | null>(null); 
  