import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Points = data.define('points', {
    index:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    current_exe:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hunger:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

export default Points;