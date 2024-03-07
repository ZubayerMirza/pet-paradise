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
    },
    createdAt:{
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt:{
        type: DataTypes.DATE,
        allowNull: true
    }
});

export default Pets;