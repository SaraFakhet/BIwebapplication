var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}


controller.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
}