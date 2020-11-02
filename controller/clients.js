var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}

controller.clients = async function(req, res, next){
    var result = "Clients : ";
    
    await axios.get(process.env.URL_RELATION_CLIENT + '/clients').then(function (response) {
        result = result.concat(JSON.stringify(response.data));
    }).catch((err) => {
        result = result.concat(err.data);
    });

    res.render('clients', {clients: result});
};