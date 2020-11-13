var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}

controller.sales = async function(req, res, next) {
    var result = "Sales : ";

    await axios.get(process.env.URL_GESTION_COMMERCIALE + '/all-sales').then(function (response) {
        result = result.concat(JSON.stringify(response.data));
    }).catch((err) => {
        result = result.concat(err.data);
    });

    res.render('sales', {sales: result});
};