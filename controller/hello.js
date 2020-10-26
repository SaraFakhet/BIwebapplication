var controller = {},
  _app = {};
var axios = require("axios");
const { response } = require("express");

module.exports = function (app) {
  _app = app;
  return controller;
};

controller.hello = function (req, res, next) {
  res.json({ decisionnel: "Hello World !" });
};

controller.helloAll = async function (req, res, next) {
  var result = [];
  var urls = [
    { url: process.env.URL_RELATION_CLIENT },
    { url: process.env.URL_DECISIONNEL },
    { url: process.env.URL_GESTION_PROMOTION },
    { url: process.env.URL_REFERENTIEL_PRODUIT },
    { url: process.env.URL_CAISSE },
    { url: process.env.URL_GESTION_COMMERCIALE },
    { url: process.env.URL_BACK_OFFICE_MAGASIN },
    { url: process.env.URL_E_COMMERCE },
    { url: process.env.URL_ENTREPROTS },
  ];
  urls.map(async (url) => {
          await axios
              .get(process.env.url.url + "/hello")
              .then(function (response) {
                  result.push(response.data);
              })
              .catch((e) => {
                  result.push(e);
              });
      });
  try {
    var mystring = "Hellos: ";
    for (const elm of result)
      mystring = mystring + JSON.stringify(elm) + " -- ";

    res.render("hello", { hellos: mystring });
  } catch (err) {
    result.push(err.data);
  }
};
