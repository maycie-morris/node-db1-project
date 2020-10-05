const router = require('express').Router()
//const { update } = require('../data/dbConfig.js');

// database access using knex
const db = require('../data/dbConfig');



router.get('/', (req, res) => {
        db.select('*')
            .from('accounts')
            .then(accounts => {
                res.status(200).json({ data: accounts })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err.message
                })
            })
    });


router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err.message
            })
        })
});

router.post('/', (req, res) => {
    const accountData = req.body;

    db('accounts')
        .insert(accountData, 'id')
        .then(ids => {
            res.status(200).json({ data: ids })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err.message
            })
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body;

    db('accounts')
        .where({ id: req.params.id })
        .update(changes)
        .then(last => {
            res.status(200).json({
                data: 'The ID of the last item changed', last
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err.message
            })
        })
});


router.delete('/:id', (req, res) => [
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({ data: count })
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        })
]);

module.exports = router;