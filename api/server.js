const express = require("express");

// const db = require("../data/dbConfig.js");

const server = express();


server.use(express.json());

const AccountsRouter = require('../accounts/accounts-router')


server.get('/', (req, res) => {
    // res.status(200).json({ api: "up" })
    res.send(`<h1>Up</h1>`)
})

server.use('/api/accounts', AccountsRouter)

module.exports = server;

