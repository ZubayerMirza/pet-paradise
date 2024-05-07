import { DataTypes } from "sequelize";
import data from "../../config/dbconnect";

const Gamemode = data.define('gamemodes', {
    game_type:{ // for the game type select
        // one for - casino the other for new game 
        type: DataTypes.STRING,
        allowNull: false
    }
    // mabe user Id                                                                                                                                 
},
{
    timestamps: false // not to create the date
});

export default Gamemode; 