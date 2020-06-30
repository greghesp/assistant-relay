const express = require('express');
const router = express.Router();

router.post('/assistant', async(req, res) => {
    console.log('post req')
    res.sendStatus(200);
});

module.exports = router;