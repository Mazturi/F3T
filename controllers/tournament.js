const express = require('express');
const router = express.Router();
const Tournament = require('../models/tournament');

router.get('/', (req, res) => {
    Tournament.find((err, tournaments) => {
        if(err) {
            res.json({error : err});
        }
        if(tournaments.length == 0) {
            res.json({message : 'No tournament found'})
        }
        res.json({tournaments : tournaments});
    }).populate('teams');
});

router.post('/add', (req, res) => {
    tournament = new Tournament ({
        name : req.body.name,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        description : req.body.description,
        prize : req.body.prize,
        rankingPoints : req.body.rankingPoints,
        draw : req.body.draw,
        teams  : req.body.teams 
    });

    tournament.save((err) => {
        if(err) {
            res.json({error : err});
            return;
        }
        res.json({message : 'Tournaments added successfully!'});
    })
});

router.put('/update/:id', (req, res) => {
    tournament = {
        name : req.body.name,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        description : req.body.description,
        prize : req.body.prize,
        rankingPoints : req.body.rankingPoints,
        draw : req.body.draw,
        teams  : req.body.teams 
    };

    Tournament.findOneAndUpdate({_id : req.params.id}, tournament, (err, updated) => {
        if(err) {
            res.json({error : err});
        }
        if(! updated) {
            res.status(404).json({error : 'Tournament not found'});
        }
        res.json({message : 'Tournaments updated successfully!'});
    })
});

router.delete('/delete/:id', (req, res) => {
    Tournament.findByIdAndDelete({_id : req.params.id}, (err, deleted) => {
        if(err) {
            res.json({error : err});
        }
        if(! deleted) {
            res.status(404).json({error : 'Tournament not found'});
        }
        res.json({message : 'Tournaments deleted successfully!'});
    })
});

module.exports = router;