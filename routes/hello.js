var express = require('express');
var router = express.Router();
var app = express();
var hello = require('../controller/hello')(app);

router.get('/decisionnel/hello', hello.hello);
router.get('/decisionnel/hello/all', hello.helloAll);

module.exports = router;