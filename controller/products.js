var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}

controller.products = async function(req, res, next) {
    var result = "Products : ";

    await axios.get(process.env.URL_REFERENTIEL_PRODUIT + '/products').then(function (response) {
        result = result.concat(JSON.stringify(response.data));
    }).catch((err) => {
        result = result.concat(err.data);
    });

    res.render('products', {products: result});
};