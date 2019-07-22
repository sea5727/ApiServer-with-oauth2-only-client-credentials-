
const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/', (req, res) => {
    console.log('recv insMng');
});

router.post('/insertMultiAnnounceIS.do', controller.insertMultiAnnounceIS);


router.get('/:api', (req, res) => {
    console.log(`/:api ..insMng ${req.params.api}`);
});


module.exports = router;