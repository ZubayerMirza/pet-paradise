import React, { useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';


function Login() {

  // // to get the object of user information -> try it later
  // type User = { userId: number, userName: string, status: boolean}
  // const [user,setUser] = useState<User | null>(null); 
  
 
  // to navigate
  let navigate = useNavigate();

  const OnSubmitHandler = (e: any) => {
    e.preventDefault();

    const testcase = { 
      username: e.target.username.value, 
      password: e.target.password.value
    };

    // // get works
    // fetch('http://localhost:8000/login', {
    //   method: "GET",
    // }).then(response => {return response.json()})
    // .then( response => {console.log(response)})
    // .catch(error => {
    //   console.error('Something wrong', error);
    // })

    // post fetch Error -> request body as empty
    // headers mattered with the request body parsing
    // -> so initialize the content type *** rememeber ***
     fetch('http://localhost:8000/login', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testcase), // conver to json string
    }).then(response => {return response.json()})
    .then( response => {
      if(response.id){
          navigate("/pet",{state: {name: testcase.username, id: response.id}});
      }
      else if (response === "User not found"){
        alert ("User not found");
      }
      else if (response === "Password is different"){
        alert ("Password is different");
      }
    })
    .catch(error => {
      console.error('Something wrong', error);
    })
  }


  const OnClickHandler = (e: any) => {

    var pageName: string = e.target.id;
    console.log(pageName);
    
   if(e.target.id === "Create"){
    navigate("/signup");
   }
   else
   navigate("/login");
  }

  return (
    <>
    <h1>PET PARADISE</h1>
    <form className='LoginForm' onSubmit={OnSubmitHandler}>
      <div className='BtnBox'>
        <div onClick={OnClickHandler} id="Login">Login</div>
        <div onClick={OnClickHandler} id="Create">Create Account</div>
      </div>    
      <div className='LoginBox'>
        <label><b>Username</b>
        <input type="text" name="username" placeholder="Username" ></input></label>
        </div>
      <div className='LoginBox'>
        <label><b>Password</b>
        <input type="password" name="password" placeholder="Password" ></input></label>
        </div>
      <div className='LoginBox'>
        <button id="logBtn" type="submit">Login</button>
        </div>
      </form>    
    </>
  );
}

export default Login;
