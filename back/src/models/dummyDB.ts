import Users from "./users";

const dummySet = [
    {username: "John", password: "123"},
    {username: "test", password: "abcdef"},
    {username: "yay", password: "fffff"},
    {username: "rabbit", password: "djklajf"}];
    

const DummyDB = async () => {
    // testing to check 
    // wheter model is synchronized with mysql
    try {
    await Users.sync({force: false});
    console.log("----- Succeed for table sync -----");  
    }
    catch(error){
        console.log("----- Failed for table sync -----");
    };
   
    // create the table with the dummy data
    dummySet.forEach(async data => {
     try {
        const Test = await Users.create(data);
        // console.log(Test.dataValues);
    }catch(error){
        // console.log("----- Data EXISTANT -----");
     }
    });
  }

  export default DummyDB;