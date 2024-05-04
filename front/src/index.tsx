import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import Pet from './Pet';
import SignUp from './Signup';
import Login from './Login';
import MyPet from './Pets/MyPet';
import GetPet from './Pets/GetPet';
// import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  
  // react router for navigation to another link
  // rander by routes and route
  
    <BrowserRouter>
    {/* <React.StrictMode> */}
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/signup" element={<SignUp />}></Route>
    <Route path="/pet" element={<Pet />}></Route>
    <Route path="/petget" element={<GetPet />}></Route>
    <Route path="/petmain" element={<MyPet />}></Route>
    </Routes>
    {/* </React.StrictMode> */}
    </BrowserRouter>
   
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
