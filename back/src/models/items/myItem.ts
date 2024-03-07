import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

// my item table is defined, will be used 
const MyItems = data.define('myItems', {
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false
    },
    index:{
        type: DataTypes.INTEGER,
        autoIncrement: true
    }
},{
    timestamps: false // not to create the date
});

export default MyItems;