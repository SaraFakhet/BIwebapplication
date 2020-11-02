var express = require('express');
var router = express.Router();
var app = express();
var products = require('../controller/products')(app);

router.get('/decisionnel/produits', products.products);

module.exports = router;