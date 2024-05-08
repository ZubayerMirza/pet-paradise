import React from 'react';
import './home.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { io } from "socket.io-client";
// const PORT = "http://localhost:8000/"
import socket from './websocket';
function Home() {

  const navigate = useNavigate();
  
  //fetching the data from server - connection check
  fetch('http://localhost:8000/', {
    method: "GET", 
  }).then(response => {return response.json()})
  .then(response => {console.log(response)})
  .catch(error => {
    console.error('Something wrong', error);
  })

  // effects at first
  useEffect(()=>{
    // after 2sec, to login page
    setTimeout(()=>{
      navigate('/login');
    },2000)
  },[]);

 
  return (
  <>
  <div className='home'>
  <h1 id='h1'>Hello, we are Team 7</h1>
  </div>
  </>
  );
}


function Main () {
  
 
 
  const navigate = useNavigate();

 

  const onclickHandler =(e:any)=>{
    if(e.target.id ==="login"){
      navigate('/login');
    }
    if(e.target.id==="game"){
      navigate('petgame');
    }
  }
  return (<>
  <div className='home'>
  <h1>Click</h1>
  <div>
    <div onClick={onclickHandler}>
      <button id="game">Game</button>
      <button id="login">Login</button>
    </div>
  </div>
  </div>
  </>)
}

export default Main;
