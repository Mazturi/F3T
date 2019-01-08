const express = require('express');
const router = express.Router();
const MatchSet = require('../models/set');
const Match = require('../models/match');

router.get('/', (req, res) => {
    MatchSet.find( (err, sets) => {
        if (err) {
            res.senf(err);
        }
        else if (sets.length == 0) {
            res.send('No set found');
        }
        else {
            res.json({sets : sets});
        }
    }).populate('match');
});

router.get('/:id', (req, res) => {
    MatchSet.findById(req.params.id, (err, set) => {
        if (err) {
            res.json({error : error});
            return;
        }
        if (! set) {
            res.status(404).json({message : 'Set not found'});
            return;
        }
        res.json(set);
    });
});

router.post('/add', (req, res) => {
    set = new MatchSet ({
        setWinner : req.body.setWinner,
        match : req.body.match,
    });

    set.save((err) => {
        Match.findById(set.match, (error, match) => {
            if (match != null ) {
                match.sets.push(set._id);
                match.save(() => {});
            }
        });

        if(err) {
            res.send(err);
        } 
        res.send('set added successfully !');
    });
});

router.put('/update/:id', (req, res) => {
    set = {
        setWinner : req.body.setWinner,
        match : req.body.match,
    };

    Match.findOne({sets : req.params.id}, (error, match) => {
        if (match != null) {
            let pos = match.sets.indexOf(req.params.id);
            match.sets.splice(pos, 1);
            match.save(() => {});
        }
    });

    MatchSet.findOneAndUpdate({_id : req.params.id}, set, (err, updated) => {
        if (err) {
            res.send(err);
        } 
        if (! updated) {
            res.status(404).json({error : 'Set Not found'});
        }

        Match.findById(set.match, (error, match) => {
            if (match != null ) {
                match.sets.push(req.params.id);
                match.save(() => {});
            }
        });

        res.send('Set updated successfully!')
    });
});


router.delete('/delete/:id', (req, res) => {
    MatchSet.findOne({_id : req.params.id}).exec((err, player) => {

        MatchSet.deleteOne({_id : req.params.id}, (err, set) => {
            if (err) {
                res.send(err);
            } 
            if (! set) {
                res.status(404).json({error : 'Set Not found'});
            }
            res.json({success : 'Set deleted successfully !'});
        });

        Match.findOne({sets : req.params.id}, (err, match) => {
            if (match != null) {
                let pos = match.sets.indexOf(req.params.id);
                match.sets.splice(pos, 1);
                match.save(() => {});
            }
        });
    });
});

module.exports = router;