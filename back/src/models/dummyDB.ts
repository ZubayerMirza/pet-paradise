import Users from "./users";
import Pets from "./pet/pets";
import PetTypes from "./pet/pettypes";

const dummySet = [
    {username: "John", password: "123"},
    {username: "test", password: "123"},
    {username: "yay", password: "123"},
    {username: "rabbit", password: "123"}];

const petSelection = [
    {id: 1, name: "CHERRY", description: "hi, my name is Cherry!", hunger: 50, status: 50},
    {id: 2, name: "CHOCO", description: "hi, my name is CHOCO!", hunger: 60, status: 50},
    {id: 3, name: "MOMO", description: "hi, my name is MOMO!", hunger: 80, status: 50},
    {id: 4, name: "LUCKY", description: "hi, my name is LUCKY!", hunger: 100, status: 100}
]

const DummyDB = async () => {
    
    // will create the tables as Users models in defined 
    try {
        
        //force true : to drop the table and create
        //force falce : not drop 
        const Test = await Users.sync({force: false});

        // working on for pet data
        // await PetTypes.sync({force: false}); 
        // await Pets.sync({force: false});
    
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
        // console.log(Test.dataValues);
    }catch(error){ // when data is already exist
        // console.log("----- Data EXISTANT -----");
        // throw(error);
     }
    });

    // // working on
    // petSelection.forEach(async data => {
    //     try {
    //        await PetTypes.create(data);
    //    }catch(error){ // when data is already exist
    //        // console.log("----- Data EXISTANT -----");
    //     }
    //    });
  }
  
  export default DummyDB;