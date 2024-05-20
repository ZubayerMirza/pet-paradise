import React, { useEffect, useState } from 'react';
import './header.css';
import Logo from '../assets/logo-crop.png';
import { useNavigate } from 'react-router-dom';
function AnotherHeader() {
  // const onClickHandler =(e:React.DOMAttributes<HTMLButtonElement>)=>{
  //   console.log(e);
  // }
  const navigate=useNavigate();

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
  <button onClick={()=>{navigate("/login")}} value="login">Login</button>
  <button onClick={()=>{navigate("/signup")}} value="signup">Signup</button>
  </div>
  </div></>
  );
}
export default AnotherHeader;