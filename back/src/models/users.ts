import { DataTypes } from "sequelize";
import data from "../config/dbconnect";

// Model is defined with define fuction of seq
// represnets as a table of the database
const Users = data.define('users', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
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

export default Users;