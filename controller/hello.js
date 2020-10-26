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

controller.helloAll = async function (req, res, next) {
  var result = [];
  var urls = [
    { name: "Relation Client : ", url: process.env.URL_RELATION_CLIENT },
    { name: "Monétique et Paiement : ", url: process.env.URL_DECISIONNEL },
    { name: "Gestion Promotion : ", url: process.env.URL_GESTION_PROMOTION },
    {
      name: "Référenciel Produit : ",
      url: process.env.URL_REFERENTIEL_PRODUIT,
    },
    { name: "Caisse : ", url: process.env.URL_CAISSE },
    { name: "Gestion Commercial : ", url: process.env.URL_GESTION_COMMERCIALE },
    { name: "Back Office : ", url: process.env.URL_BACK_OFFICE_MAGASIN },
    { name: "E-Commerce : ", url: process.env.URL_E_COMMERCE },
    { name: "Entrepôts : ", url: process.env.URL_ENTREPROTS },
  ];
  urls.map(async (url) => {
          await axios
              .get(process.env.url.url + "/hello")
              .then(function (response) {
                  result.push(JSON.stringify(response.data));
              })
              .catch((e) => {
                  result.push(url.name + e);
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
