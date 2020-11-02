var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}

controller.sells = async function(req, res, next) {
    var result = "Sells : ";

    await axios.get(process.env.URL_GESTION_COMMERCIALE + '/all-sales').then(function (response) {
        result = result.concat(JSON.stringify(response.data));
    }).catch((err) => {
        result = result.concat(err.data);
    });

    res.render('sells', {sells: result});
};