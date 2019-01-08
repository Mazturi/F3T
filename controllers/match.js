const express = require('express');
const router = express.Router();
const Match = require('../models/match');

router.get('/', (req, res) => {
    Match.find( (err, matchs) => {
        if (err) {
            res.send(err);
        }
        else if (matchs.length == 0) {
            res.send('No match is registred yet');
        }
        else {
            res.json(matchs);
        }
    }).populate('players sets');
});

router.get('/:id', (req, res) => {
    Match.findById(req.params.id, (err, match) => {
        if (err) {
            res.json({error : error});
            return;
        }
        if (! match) {
            res.status(404).json({message : 'Match not found'});
            return;
        }
        res.json(match);
    });
});

router.post('/add', (req, res) => {

    let match = new Match ({
        type : req.body.type,
        date : req.body.date,
        room : req.body.room,
        tableNumber : req.body.tableNumber,
        players : [req.body.player, req.body.opponent]
    });
    
    match.save((err) => {
        if(err) {
            res.send(err);
        } 
        res.send('match added successfully !');
    });
});

router.put('/update/:id', (req, res) => {

    let match = {
        type : req.body.type,
        date : req.body.date,
        room : req.body.room,
        tableNumber : req.body.tableNumber,
        players : [req.body.player, req.body.opponent]
    };
    
    Match.findOneAndUpdate({_id : req.params.id}, match, (err, updated) => {
        if (err) {
            res.send(err);
        } 
        if (! updated) {
            res.status(404).json({error : 'Match Not found'});
        }
        res.json({success : 'Match updated successfully !'});
    });
});

router.delete('/delete/:id', (req, res) => {
    Match.findByIdAndDelete(req.params.id, (err, match) => {
        if (err) {
            res.send(err);
        } 
        if (! match) {
            res.status(404).json({error : 'Match Not found'});
        }
        res.json({success : 'Match deleted succefully !'});
    });
});


module.exports = router;