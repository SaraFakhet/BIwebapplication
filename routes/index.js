var express = require('express');
var router = express.Router();
var app = express();
var logger = require('../logs');

var User = require('../models/user_template')(app);

var Segmentation = require('../models/segmentation');
var LeastSold = require('../models/leastSoldProducts');
var MostSold = require('../models/mostSoldProducts');
const { response } = require('express');

var template = require('../controller/template_controller')(app);
var hello = require('../controller/hello')(app);
var product = require('../controller/products')(app);
var client = require('../controller/clients')(app);
//var vente = require('../controller/sales')(app);
var segmentation = require('../controller/segmentation')(app);

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', template.index)

router.get(process.env.KONG_URL + '/decisionnel/hello', hello.hello);
router.get(process.env.KONG_URL + '/decisionnel/hello/all', hello.helloAll);
router.get(process.env.KONG_URL + '/decisionnel/clients', client.clients);
router.get(process.env.KONG_URL + '/decisionnel/produits', product.products);
//router.get('/decisionnel/ventes', vente.sales);
//router.get('/decisionnel/ventes-magasin', vente.storeSales);
//router.get('/decisionnel/ventes-web', vente.webSales);

router.get('/decisionnel/products-quantity', segmentation.productsQuantity);

/**@swagger
 * /users:
 *   get:
 *     tags:
 *       - Products
 *     summary: get users page
 *     responses:
 *       200:
 *         description: Return users html
 */
router.get('/users', function(req, res, next) {
  //
  User.findAll().then(function(users) {
    logger.info(users);
    res.render('users', {title: 'Users', users: users});
  });
});

/**@swagger
 * /api/user:
 *   get:
 *     tags:
 *       - Products
 *     summary: get all users
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return an array of users
 *         schema:
 *           type: array
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Failed to retrieve data
 */
router.get('/api/user', function(req, res, next) {
  try {
    User.findAll().then(user => res.status(200).json(user));
  } catch (e) {
    res.status(404).json({'error': 'FindAll'});
  }
});

/**@swagger
 * /api/user:
 *   post:
 *     summary: get all users
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Return created user
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Failed to create data
 */
router.post('/api/user', function(req, res, next) {
  try {
    logger.info(req.body);
    User.create(req.body).then(function (user) {
      res.status(200).json(user);
    });
  } catch (e) {
    res.status(404);
  }
});

module.exports = router;



