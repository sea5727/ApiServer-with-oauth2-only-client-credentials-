//const express = require('express');
//const router = express.Router();


//router.get('/', (req, res) => {
//    console.log('recv');
//});

//module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/', (req, res) => {
    console.log('recv');
});

router.get('/productList.do', controller.productList);
router.get('/serviceList.do', controller.serviceList);
router.get('/claimList.do', controller.claimList);
router.get('/bsChargeTypeList.do', controller.bsChargeTypeList);
router.get('/agentList.do', controller.agentList);
router.get('/agentAuth.do', controller.agentAuth);


router.get('/:api', (req, res) => {
    console.log(`/:api .. ${req.params.api}`);
});


module.exports = router;