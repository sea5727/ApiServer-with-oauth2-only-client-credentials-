var express = require('express');
var router = express.Router();

const controller = require('./controller');

router.use(controller.authenticate)

// router.use(controller.error);
// exports.error = controller.auth_error;

exports.router = router;




