var express = require('express');
var router = express.Router();
var app = express();
var logger = require('../logs');

var User = require('../models/user_template')(app);
var template = require('../controller/template_controller')(app);
var hello = require('../controller/hello')(app);
var product = require('../controller/products')(app);
var client = require('../controller/clients')(app);

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', template.index)
router.get('/decisionnel/hello', hello.hello);
router.get('/decisionnel/hello/all', hello.helloAll);
router.get('/decisionnel/clients', client.clients);
router.get('/decisionnel/produits', product.products);


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



