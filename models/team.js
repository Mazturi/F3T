const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TeamSchema = new Schema ({
    name:{
        type: String,
        required: true,
        unique : true
    },
    address:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    players : [{
        type : Schema.Types.ObjectId,
        ref: 'Player'
    }]
    
});


module.exports = mongoose.model('Team', TeamSchema);