import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

// pets type models is defined
const PetTypes = data.define('pet_types', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true, 
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    hunger:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    timestamps: false // not to create the date
});

export default PetTypes;