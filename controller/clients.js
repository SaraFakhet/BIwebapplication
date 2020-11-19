var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}

controller.clients = async function(req, res, next){
    var result = [];
    
    await axios.get(process.env.URL_RELATION_CLIENT + '/client-account-list').then(function (response) {
        response.data.map((client) => {
            result.push({
                id: client.id,
                account: client.account,
                lastname: client["last-name"],
                firstname: client["first-name"],
                dob: client["date-of-birth"],
                civility: client.civility,
                customerLoyalty: client["customer-loyalty"],
                credit: client.credit,
                payment: client.payment
            })
        })
    }).catch((err) => {
        result = result.concat(err.data);
    });

    res.render('clients', {clients: result});
};