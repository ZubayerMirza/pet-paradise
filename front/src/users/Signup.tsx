import React,{useState} from 'react';
import './signup.css';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router';
import Header from '../header/Header';
function SignUp() {

    let navigate = useNavigate();

    const OnSubmitHandler = (e: any) => {
      // for defaut preventing 
      // had an issue with refreshing w/o
      e.preventDefault(); 
      
      const testcase = { 
        username: e.target.username.value, 
        password: e.target.password.value,
        confirm: e.target.confirm.value,
        email:e.target.email.value
      };
      
      if(testcase.confirm ===testcase.password){
          fetch('http://localhost:8000/signup', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testcase), // conver to json string
    }).then(response => {return response.json()})
    .then( response => {
      if (response === "Created"){
        alert ("User is created");
        navigate(-1); // go back 
      }
      else if (response === "Username already exist"){
        alert ("Username is already taken");
        navigate(1); // stay this page
      }
    })
    .catch(error => {
      console.error('Something wrong', error);
    })
    // console.log('same')  
      }else(
        alert('Password should be same')
      )
    
    
  }

    return(
      <> 
      <Header></Header>
      <div className='signBox'>
      <form className='signForm' onSubmit={OnSubmitHandler}>   
      <div className='signBoxL'>
        <div className='backLogo'></div>
      {/* <img src={Logo} style={{height:"80%", width: "80%" }} alt="logo"></img> */}
      </div>
      <div className='signBoxR'>
        <h1>Sign Up</h1>
        <div className='typeBox' onSubmit={OnSubmitHandler}>
      <p>Username</p>
      <input type="text" name="username"autoComplete="off" placeholder="  Username" required></input>
      </div>
      <div className='typeBox'>
      <p> Email</p>
      <input  type="email" name="email" autoComplete="off"placeholder="  email@example.com" required></input>
      </div>
      <div className='typeBox'>
      <p>Password</p>
      <input  type="password" name="password"autoComplete="off" placeholder=" Password" required></input>
      </div>
      <div className='typeBox'>
      <p>Confirm Password</p>
      <input  type="password" name="confirm" autoComplete="off"placeholder=" Confirm password" required></input>
      </div>
      <div className='typeBox'>
      <button  type="submit">Create Account</button>
      </div></div>
      
      </form>
      </div>
      </>
    );
  }

  export default SignUp;