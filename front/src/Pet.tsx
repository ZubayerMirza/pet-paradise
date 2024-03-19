import React, { useEffect, useState } from 'react';
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
    const para = location.state as {name: string, id: string}; // access the name and id from passed state
   
    const [petType, setPetType] = useState('');

    const OnClickHandler = (e: any) => {
       e.preventDefault();
       
       navigate('/gametest'); 
    }
    
    const Fetch = () =>{
        // had to check once with the id  first
      // to pass the pet selection  
     const test = {
      id: para.id,
      name: para.name
      }
      console.log(test.id);

      // then get the pet type data 
      fetch('http://localhost:8000/pet', {
        method: "POST", 
        headers: { // header specifies the content type for the request
          "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
      }).then(response => {return response.json()})
      .then( response => {console.log(response)})
      .catch(error => {
        console.error('Something wrong', error);})

    }
    useEffect(()=>
    {
      Fetch();
    },[])
    
  return (
   <>
   <p>Hello, {para.name}</p>
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
