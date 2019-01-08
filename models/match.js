const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var matchSchema = new Schema ({
    type: {
        type : String,
        required : true
    },
    date: {
        type : Date,
        required : true
    },
    room: {
        type : String,
        required : true
    },
    tableNumber: {
        type : Number,
        required : true
    },
    players: [
        {
            type : Schema.Types.ObjectId,
            ref : 'Player'
        }
    ],
    sets : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Set'
        }
    ],
});

module.exports = mongoose.model('Match', matchSchema);