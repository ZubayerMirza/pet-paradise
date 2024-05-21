import React, { useEffect, useState } from 'react';
import './header.css';
import Logo from '../assets/logo-crop.png';
import { useNavigate } from 'react-router-dom';
// function AnotherHeader(props:any) {
  function AnotherHeader() {
    // const onClickHandler =(e:React.DOMAttributes<HTMLButtonElement>)=>{
    //   console.log(e);
    // }
    const navigate=useNavigate();
  
    // useEffect(()=>{
    //   socket.on('head',(res:string)=>{
    //     console.log(res);
    //   })
    // },[])
  
  return (
  <><div className='headerBox'>
  <div className='header-logo'> 
  {/* <img src={Logo} style={{ height:"4vh", width: "5vh" }} alt="logo"> */}
    {/* </img> */}
    Pet Paradise</div>
  <div className='header-inner'>
  {/* <button onClick={()=>{navigate("/signup")}} >Friend</button> */}
  {/* <button onClick={()=>{navigate("/signup")}} >Chat</button> */}
  {/* <button onClick={()=>{navigate("/items")}} >Shop</button> */}
  {
    // props.isLogin===true ? <><button>User : {props.testcase.name} in the pet selection</button>
    // <button onClick={()=>{navigate("/")}} value="logout">Logout</button></> 
    // : 
    <><button onClick={()=>{navigate("/login")}} value="login">Login</button>
    <button onClick={()=>{navigate("/signup")}} value="signup">Signup</button></>
  }
  
  </div>
  </div></>
  );
}
export default AnotherHeader;