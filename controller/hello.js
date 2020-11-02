var controller = {},
  _app = {};
var axios = require("axios");

module.exports = function (app) {
  _app = app;
  return controller;
};

controller.hello = function (req, res, next) {
  res.json({ decisionnel: "Hello World !" });
};

controller.helloAll = async function(req, res, next) {

  var result = [];
  var error = false;

  await axios.get(process.env.URL_CAISSE + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_E_COMMERCE + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_GESTION_COMMERCIALE + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_BACK_OFFICE_MAGASIN + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_ENTREPROTS + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_REFERENTIEL_PRODUIT + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_GESTION_PROMOTION + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_RELATION_CLIENT + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  await axios.get(process.env.URL_MONETIQUE_PAIEMENT + '/hello').then(function (response) {
      result.push(response.data);
  }).catch((err) => {
      result.push(err.data)
  });

  try {
      var mystring = "Hellos: ";
      for (const elm of result)
          mystring = mystring + JSON.stringify(elm) + ' -- ';

      res.render('hello',{hellos: mystring});
  } catch(err){
      result.push(err.data);
  }
};
