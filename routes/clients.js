var express = require('express');
var router = express.Router();
var app = express();
var clients = require('../controller/clients')(app);

router.get('/decisionnel/clients', clients.clients);

module.exports = router;