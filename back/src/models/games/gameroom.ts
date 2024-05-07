import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Gameroom = data.define('gamerooms', {
    index:{ // for the game type select
        // one for - casino the other for new game 
        type: DataTypes.INTEGER,
        allowNull: false
    },
    count:{ // users in room limited to 6
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status:{ // waiting for game members or gaming 
        type: DataTypes.STRING,
        allowNull: false
    }                                                                                                                            
},
{
    timestamps: false // not to create the date
});

export default Gameroom;