import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const myLevel = data.define('my_level', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        allowNull: true,
        autoIncrement: true
    },
    level:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current_exp:{
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    needed_exp:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
{
    timestamps: false // not to create the date
});

export default myLevel;