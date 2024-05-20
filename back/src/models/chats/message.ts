import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";


//has to be modified 
const Messages = data.define('messages', {
    
    room:{
        type:DataTypes.INTEGER,
    }
    ,message:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    sender:{  //making array of types using getter/setter func 
        type: DataTypes.INTEGER,
    },
    isRead:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    count:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    url:{
        type:DataTypes.STRING,
        allowNull: true
    }
   
});


export default Messages;