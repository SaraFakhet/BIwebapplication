var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}


controller.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
}

controller.hello = function(req, res, next) {
    res.json({'decisionnel' : 'Hello World !'});
    res.end();
}

controller.helloall = async function(req, res, next) {
    var result = [];

    await axios.get(process.env.URL_BACK_OFFICE_MAGASIN + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('back-office-magasin : ' + err.data);
    });

    await axios.get(process.env.URL_CAISSE + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('caisse : ' + err.data);
    });

    await axios.get(process.env.URL_E_COMMERCE + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('e-commerce : ' + err.data);
    });

    await axios.get(process.env.URL_GESTION_COMMERCIALE + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('gestion-commerciale : ' + err.data);
    });

    await axios.get(process.env.URL_ENTREPROTS + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('gestion-entrepots : ' + err.data);
    });

    await axios.get(process.env.URL_GESTION_PROMOTION + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('gestion-promotion : ' + err.data);
    });

    await axios.get(process.env.URL_MONETIQUE_PAIEMENT + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('monetique-paiement :' + err.data);
    });

    await axios.get(process.env.URL_REFERENTIEL_PRODUIT + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('relation-client : ' + err.data)
    });

    await axios.get(process.env.URL_RELATION_CLIENT + '/hello').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push('referentiel-produit : ' + err.data)
    });

    res.render('hello',{helloworldall: result});
};

controller.produits = async function(req, res, next) {
    var result = [];

    await axios.get(process.env.URL_REFERENTIEL_PRODUIT + '/produits').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push(err.data);
    });

    res.render('produits', {products: result});
};

controller.clients = async function(req, res, next){
    var result = [];
    await axios.get(process.env.URL_RELATION_CLIENT + '/clients').then(function (response) {
        result.push(JSON.stringify(response.data));
    }).catch((err) => {
        result.push(err.data);
    });

    res.render('clients', {clients: result});
};