const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SetSchema = new Schema ({
    setWinner : {
        type : Schema.Types.ObjectId,
        ref : 'Player',
        required : true
    },
    match : {
        type : Schema.Types.ObjectId,
        ref : 'Match',
    }
});

module.exports = mongoose.model('Set', SetSchema);