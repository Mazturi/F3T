const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TournamentSchema = new Schema ({
    name : {
        type : String,
        required : true,
        unique : true
    },
    startDate  : {
        type : Date,
        required : true,
        default : Date.now
    },
    endDate  : {
        type : Date,
        required : true,
        default : Date.now
    },
    description  : {
        type : String,
        required : true
    },
    prize  : {
        type : Number,
        required : true
    },
    rankingPoints  : {
        type : Number,
        required : true
    },
    draw  : {
        type : Number,
        required : true
    },
    teams  : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Team',
            required : true    
        }
    ], 
    matches  : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Match'
        }
    ] 
});

module.exports = mongoose.model('Tournament', TournamentSchema);