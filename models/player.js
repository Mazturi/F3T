const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PlayerSchema = new Schema ({
    licence:{
        type: String,
        minlength: 8,
        maxlength: 8,
        required: true,
        unique: true
    },
    name:{
        type: String,
        match: /[a-z]/,
        required: true
    },
    lastName:{
        type: String,
        match: /[a-z]/,
        required: true
    },
    birthday:{
        type: Date,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    ranking:{
        type: Number,
        required: true
    },
    gender:{
        type: Boolean,
        required: true
    },
    avatar: {
        type: String,
        default : 'https://u.cubeupload.com/Akram/download.png'
    },
    team: {
        type : Schema.Types.ObjectId,
        ref: 'Team'
    }
});


module.exports = mongoose.model('Player', PlayerSchema);

