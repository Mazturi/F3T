const express = require('express');
const router = express.Router();
const Team = require('../models/team');

router.get('/', (req, res) => {
    Team.find((err, teams) => {
        if(err) {
            res.send(err);
            return;
        } else if (teams.length == 0) {
            res.json('There is no team');
            return;
        } else { 
            res.json(teams);
        }
    }).populate('players');
});

router.get('/:name', (req, res) => {
    Team.find({name: req.params.name}, (err, team) => {
        if (err) {
            res.send(err);
        } 
        if (! team) {
            res.status(404).json({error : 'Team Not found'});
        }
        res.json(team);
    }).populate('players');
});


router.post('/add', (req, res) => {
    let team = new Team ({
        name : req.body.name,
        description : req.body.description,
        address : req.body.address,
    }); 
    team.save( (err) => {
        if (err) {
            res.send(err);
        }
        //res.send('Team added successfully');
        res.redirect('/team/');
    });
});

router.put( '/update/:name', (req, res) => {
    let team = {
        name : req.body.name,
        address : req.body.address,
        description : req.body.description,
    }

    Team.findOneAndUpdate({name : req.params.name}, team, (err, updated) => {
        if (err) {
            res.send(err);
            return;
        }
        if (!updated) {
            res.status(404).json({error : 'Team not found!'});
            return;
        }
        res.send('Team updated successfully');
    })
});

router.delete('/delete/:name', (req, res) => {
    Team.deleteOne({name : req.params.name}, (err) => {
        if (err) {
            res.send(err);
        }
        res.send('Team deleted successfully');
    })
})

module.exports = router;