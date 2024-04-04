import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

// pets table is defined, for pet information
// will have userid, my item, pet type as foriegn keys

const Pets = data.define('pets', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true, 
        autoIncrement: true
    },
    petname:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
    // ,
    // hunger:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    // status:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    // gold: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // }
});

export default Pets;