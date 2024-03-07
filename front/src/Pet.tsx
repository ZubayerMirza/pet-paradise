import React from 'react';
import './Pet.css';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

/*
still working for the page : for now have pet select 
  will be updated for both front and back
  1. with giving a name 
  2. checking whether user has a pet or not
  3. if user has -> main page 
    not -> pet select 
*/
function Pet() {

    const navigate = useNavigate(); // hook to navigate
    const location = useLocation(); // hook to see the information obout this page
    const para = location.state as {name: string}; // access the name and id from passed state
    const name: string = para.name;

    const OnClickHandler = (e: any) => {
       e.preventDefault();
       
       navigate('/gametest'); 
       console.log(e.target.id);
    }
    
  return (
   <>
   <p>Hello, {name}</p>
   <h1>Choose your pet</h1>
    <div className='petBox'>
        <div className='petCard' onClick={OnClickHandler} id="A">A</div>
        <div className='petCard'onClick={OnClickHandler} id="B">B</div>
        <div className='petCard' onClick={OnClickHandler} id="C">C</div>
    </div>
    </>
  );
}
export default Pet;
