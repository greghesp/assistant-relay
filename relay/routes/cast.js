const express = require('express');
const mdns = require('mdns');
const delay = require('delay');

const {launch, yt} = require('../helpers/cast.js');


const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const adapter = new FileSync('./bin/config.json');

const router = express.Router();

router.post('/search', async(req, res) => {
    const browser = mdns.createBrowser(mdns.tcp('googlecast'));
    browser.start();
    const devices = [];
    browser.on('serviceUp', function(service){
        if(service.txtRecord.md !== 'Google Cast Group') devices.push({name: service.txtRecord.fn, address: service.addresses[0]})
    });
    await delay(5000);
    res.status(200).json({devices});
});

router.post('/launch', (req, res) => {
    launch(req.body.address)
});

router.post('/youtube', (req, res) => {
    yt(req.body.address)
})

module.exports = router;