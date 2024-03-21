import './getpet.css';
import { useNavigate,useLocation} from 'react-router';
import { Link } from 'react-router-dom';

function MyPet() {

    const navigate = useNavigate(); // hook to navigate
    const location = useLocation(); // hook to see the information obout this page
    const testcase = location.state as { 
        userId: number,
        typeId: number,
        petId: number,
        petname: string, 
    }; // access the name and id from passed state

    const OnClickHandler = (e: any) =>{
      e.preventDefault();
      if(e.target.id =="Link"){
       navigate('/login');
      }
      
    }
    
  return (
   <>
   <h1>Pet main page</h1>
    <div className ='petBox' id='Center'>
    <div>
    <div className='mypet'><p>My  petname    :  {testcase.petname}</p></div>
    <div className='mypet'><p>My  petId         :  {testcase.petId}</p></div>
    <div className='mypet'><p>My  userId       :  {testcase.userId}</p></div>
    <div className='mypet'><p>My  petTypeId :  {testcase.typeId}</p></div>
    <div className='mypet'onClick= {OnClickHandler} id="Link">Sign Out</div>
    </div>
    </div>
    </>
  );
}
export default MyPet;
