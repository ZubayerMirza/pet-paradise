import Users from "./users";
import Pets from "./pet/pets";
import PetTypes from "./pet/pettypes";
import { dropDB } from "../config/dbconnect";

const dummySet = [
    {username: "John", password: "123"},
    {username: "test", password: "123"},
    {username: "yay", password: "123"},
    {username: "rabbit", password: "123"}];

const petSelection = [
    {name: "CHERRY", description: '../asset/petA.PNG', hunger: 50, status: 50},
    {name: "CHOCO", description: '../asset/petB.PNG', hunger: 60, status: 50},
    {name: "MOMO", description: '../asset/petC.PNG', hunger: 80, status: 50},
    {name: "LUCKY", description: '../asset/petA.PNG', hunger: 100, status: 100}
];

const DummyDB = async () => {
    
    // will create the tables as Users models in defined 
    try {
        
        // drop -> mysql handling is needed ? 

        //force true : to drop the table and create
        //force falce : not drop 

        // dropDB(); // to use for me
        const Test = await Users.sync({force: false});
        
        await PetTypes.sync({force: false}); 
        await Pets.sync({force: false});

        console.log("----- Succeed for table sync -----");  
    // console.log(Test instanceof Users); // why false? 
    }
    catch(error){ // whether table is created or not 
        console.log("----- Failed for table sync -----");
        throw(error);
    };
    
    // create the table with the dummy data
    dummySet.forEach(async data => {
     try {
        const Test = await Users.create(data);
        console.log(Test.dataValues);
    }catch(error){ // when data is already exist
        // console.log("----- Data EXISTANT -----");
        // throw(error);
     }
    });

    // // working on
    petSelection.forEach(async data => {
        try {
           const T = await PetTypes.create(data);
            console.log(T.dataValues);
       }catch(error){ // when data is already exist
           console.log("----- Data EXISTANT -----");
        }
       });

    
  }
  
  export default DummyDB;