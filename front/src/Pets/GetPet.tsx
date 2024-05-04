import React, { useEffect, useState } from 'react';
import './getpet.css';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

function GetPet() {

  interface data {
    id: number, 
    name: string, 
    description: string,
    hunger: number,
    status: number
  }
  interface petType  { 
    data: data,
    userid: number
  } 
    let navigate = useNavigate(); // hook to navigate
    const location = useLocation(); // hook to see the information obout this page

     // id: 1, name: 'CHERRY', description: '../asset/petA.PNG', hunger: 50, status: 50
     const pet = location.state as petType; // access the name and id from passed state

    //  console.log(pet.data.description)
    
    // giving a pet name 
     const OnSubmitHandler=(e: any)=>{
      e.preventDefault();
      
      // console.log(e.target.petname.value);
      // console.log(pet.userid)
      
      const test = {
        userId: pet.userid,
        petname: e.target.petname.value,
        typeId: pet.data.id
      }

      fetch('http://localhost:8000/petget', {
        method: "POST", 
        headers: { // header specifies the content type for the request
          "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
      }).then(response => {return response.json()})
      .then(async response => {
        //create my pet
        // console.log(response)
       //{id: 1, petname: 'Json', userId: 4, typeId: 1, updatedAt: '2024-03-20T21:55:24.260Z', 
       if (response.id){
        navigate('/petmain', { state: { 
          petId: response.id, 
          petname: response.petname, 
          typeId: response.typeId,
          userId: response.userId
        }}); 
       }
       else if(response === "Already exist"){
        alert ("Already exist");
       }
       else if(response ==="petname must be unique"){
        alert ("Pet name is already exist");
       }
      }).catch(error=>{
        console.log(error);
      })
    }

    // back
    const OnClickHandler =(e: any)=>{
      e.preventDefault();
      
      console.log(e.target.value);
      navigate(-1); // back 
    }
    // console.log(pet);

  return (
   <>
   <h1>Your Pet</h1>
   <div className ='petBox'>
   <div className='petSelectCard' onClick={OnClickHandler} id={pet.data.name}></div>
   <div className='petSelectCard'>
   <div className='aboutData'>
    <div className='about' > 
   <p> About Pet...</p>
   </div>
    <div id='typ' >
      <p> Type : {pet.data.name}</p>
      </div>
      </div>
    
    <div >
      <div id='defalut'><p> Defalut status</p></div>
      <div className='petData'>
        <p>Happiness Status</p>
        <p>  {pet.data.status}</p>
      </div>
      <div className='petData'>
        <p>Hunger Status</p>
        <p>       {pet.data.hunger}</p>
      </div>
    </div>
    <form onSubmit={OnSubmitHandler}>  
    <div className='petName'>
      <label><b>Petname</b>
      <input type="text" name="petname" placeholder="Pet name" ></input>
      </label>
    </div>
    <div className='button'>
      <button id="logBtn" type="submit"> Adopt </button>
    </div>
      </form>
    </div>
    </div>
    <div onClick={OnClickHandler} id="Back">Back</div>
     
    </>
  );
}
export default GetPet;
