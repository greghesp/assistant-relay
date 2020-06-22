const express = require('express');
const delay = require('delay');

const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const {search, cast, stop} = require('../helpers/cast.js');
const path = require('path');
const adapter = new FileSync('./bin/config.json');

const router = express.Router();

router.post('/search', async(req, res) => {
    try {
        const devices = await search();
        res.status(200).json(devices);
    } catch (e) {
        res.status(500).send({success: false, error: e})
    }
});

router.post('/', async(req, res) => {
    try {
        const data = await cast(req.body);
        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).send({success: false, error: e})
    }
});

router.post('/stop', async(req, res) => {
    try {
        const data = await stop(req.body);
        res.status(200).json({success: true});
    } catch (e) {
        res.status(500).send({success: false, error: e})
    }
});

module.exports = router;
