import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

// my item table is defined, will be used 
const Storages = data.define('Storages', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},{ 
    timestamps: false // not to create the date
});

export default Storages;