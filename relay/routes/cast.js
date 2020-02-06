const express = require('express');
const delay = require('delay');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const {search, cast} = require('../helpers/cast.js');
const path = require('path');
const adapter = new FileSync('./bin/config.json');

const router = express.Router();

router.post('/search', async(req, res) => {
    try {
        const devices = await search();
        res.status(200).json(devices);
    } catch (e) {
        res.status(500).send(e.message)
    }
});

router.post('/', async(req, res) => {
    try {
        await cast(req.body);
        res.status(200);
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router;