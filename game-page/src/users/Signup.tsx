import React,{useState} from 'react';
import './login.css';
import '../home/home.css';
import { useNavigate } from 'react-router';

function SignUp() {

    let navigate = useNavigate();

    const OnSubmitHandler = (e: any) => {
      // for defaut preventing 
      // had an issue with refreshing w/o
      e.preventDefault(); 
      
      const testcase = { 
        username: e.target.username.value, 
        password: e.target.password.value
      };

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
    
  }

    return(
      <> 
      <div className='home'>
      <form className='LoginForm' onSubmit={OnSubmitHandler}>   
      <div className='LoginBox' onSubmit={OnSubmitHandler}>
      <label><b>Username</b> 
      <input type="text" name="username" placeholder="Username" required></input></label>
      </div>
      <div className='LoginBox'>
      <label><b>Password</b>
      <input type="password" name="password" placeholder="Password" required></input></label>
      </div>
      <div className='LoginBox'>
      <button id="CrtBtn" type="submit">Create Account</button>
      </div>
      </form>
      </div>
      </>
    );
  }

  export default SignUp;