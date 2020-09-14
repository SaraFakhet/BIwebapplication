var controller = {}, _app = {};

module.exports = function(app) {
    _app = app
    return controller
}

controller.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
  }