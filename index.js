const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const player = require('./controllers/player');
const team = require('./controllers/team');
const match = require('./controllers/match');
const matchSet = require('./controllers/set');
const tournament = require('./controllers/tournament');

// grab data from post's body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/f3t', { useNewUrlParser: true });

let router = express.Router();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Accept, Origin, X-Requested-With');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    next();
});

app.use('/', router);
app.use('/team', team);
app.use('/player', player);
app.use('/match', match);
app.use('/tournament', tournament);
app.use('/match/:matchId/set', matchSet);

router.get('/', function(req, res) {
    res.json({message: 'Home'});
});

app.listen(3000, function() {
    console.log('server listening on port');
});
