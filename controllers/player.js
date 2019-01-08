var express = require('express');
var router = express.Router();
var Player = require('../models/player');
var Team = require('../models/team');

router.get('/', (req, res) => {
    Player.find((err, players) => {
        if (err) {
            res.send(err);
        } else if (players.length == 0) {
            res.json('No player found');
        } else {
            res.json(players);
        }
    }).populate('team'); 
});

router.get('/licence/:licence', (req, res) => {
    Player.find({licence: req.params.licence}, (err, player) => {
        if (err) {
            res.send(err);
        } 
        if (! player) {
            res.status(404).json({error : 'Player Not found'});
        }
        res.json(player);
    }); 
});

router.get('/name/:name', (req, res) => {
    Player.find({name: req.params.name}, (err, player) => {
        if (err) {
            res.send(err);
        } 
        if (! player) {
            res.status(404).json({error : 'Player Not found'});
        }
        res.json(player);
    }); 
});

router.get('/lastname/:lastName', (req, res) => {
    Player.find({lastName: req.params.lastName}, (err, player) => {
        if (err) {
            res.send(err);
        } 
        if (! player) {
            res.status(404).json({error : 'Player Not found'});
        }
        res.json(player);
    }); 
});

router.put('/update/:id', (req, res) => {
    let player = {
        licence : req.body.licence,
        name : req.body.name,
        lastName : req.body.lastName,
        birthday : req.body.birthday,
        category : req.body.category,
        ranking : req.body.ranking,
        gender : req.body.gender,
        avatar : req.body.avatar,
        team : req.body.team,
    }
    Team.findOne({players : req.params.id}, (error, team) => {
        if (team != null) {
            let pos = team.players.indexOf(req.params.id);
            team.players.splice(pos, 1);
            team.save(() => {});
        }
    });

    Player.findOneAndUpdate({_id : req.params.id}, player, (err, updated) => {
        if (err) {
            res.send(err);
        } 
        if (! updated ) {
            res.status(404).json({error : 'Player Not found'});
        }

        Team.findById(player.team, (error, team) => {
            if (team != null ) {
                team.players.push(req.params.id);
                team.save(() => {});
            }
        });

        res.redirect('/player');
    });
});

router.delete('/delete/:id', (req, res) => {
    Player.findByIdAndDelete({_id : req.params.id}, (err, player) => {
        if (err) {
            res.send(err);
            return;
        } 
        if (! player) {
            res.status(404).json({error : 'Player Not found'});
            return;
        }
        Team.findOne({players : req.params.id}, (error, team) => {
            if (team != null) {
                let pos = team.players.indexOf(player._id);
                team.players.splice(pos, 1);
                team.save(() => {});
            }
        });
        res.json({success : 'Player deleted successfully !'});
    });
});

router.post('/add', (req, res) => {
    let player = new Player({
        licence : req.body.licence,
        name : req.body.name,
        lastName : req.body.lastName,
        birthday : req.body.birthday,
        category : req.body.category,
        ranking : req.body.ranking,
        gender : req.body.gender,
        team : req.body.team,
    });

    player.save( (err) => {
        if(err) {
            res.send(err);
        }
        res.send('Player added successfully');

        Team.findById(player.team, (error, team) => {
            if (team != null ) {
                team.players.push(player._id);
                team.save(() => {});
            }
        });
    });
})


module.exports = router;