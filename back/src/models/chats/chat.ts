import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

//has to be modified 
const Chat = data.define('chat', {
    user:{  //making array of types using getter/setter func 
        type: DataTypes.INTEGER,
        allowNull: false,
        // get(){
        //     // const user = this.getDataValue('users');
        //     return this.getDataValue.split(',') : null;
        // },
        // set(value: string[]){
        //     // const array = value ? value.join(',') : '';
        //     this.setDataValue('users', value.join(';'));
        // },

    }
   
});


export default Chat;