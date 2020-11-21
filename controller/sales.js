var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}

controller.sales = async function(req, res, next) {
    var result = "All types of Sales : ";

    await axios.get(process.env.URL_GESTION_COMMERCIALE + '/all-sales').then(function (response) {
        result = result.concat(JSON.stringify(response.data));
    }).catch((err) => {
        result = result.concat(err.data);
    });

    res.render('sales', {sales: result});
};

controller.webSales = async function(req, res, next) {
    var result = "Web Sales : ";
    await axios.get(process.env.URL_GESTION_COMMERCIALE + "/web-sales").then(function (response) {
        result = result.concat(JSON.stringify(response.data));
    }).catch((err) => {
        result = result.concat(err.data);
    });
    res.render('webSales', {webSales: result});
}

controller.storeSales = async function(req, res, next) {
    var result = "Store Sales : ";
    await axios.get(process.env.URL_GESTION_COMMERCIALE + "/store-sales").then(function (response) {
        result = result.concat(JSON.stringify(response.data));
    }).catch((err) => {
        result = result.concat(err.data);
    });
    res.render('storeSales', {storeSales: result});
}