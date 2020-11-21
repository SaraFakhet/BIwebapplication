var controller = {}, _app = {};
var axios = require('axios');
const products = require('./products');

module.exports = function(app) {
    _app = app
    return controller
}


controller.productsQuantity = async function(req, res, next) {

    var web_products = new Map();
    var store_products = new Map();
    await axios.get(process.env.URL_GESTION_COMMERCIALE +'/all-sales').then(function (data) {
        data.data.map(sale => {
            let list = [];
            list.push(sale["product-quantity-map"]);
            list[list.length - 1].map(product => {
                if (sale["sell-type"] === "Web") {
                    console.log(product["quantity"]);
                    web_products.set(product["product-code"], web_products.has(product["product-code"]) ? web_products.get(product["product-code"]) + product["quantity"] : product["quantity"]);
                }
                else {
                    store_products.set(product["product-code"], store_products.has(product["product-code"]) ? store_products.get(product["product-code"]) + product["quantity"] : product["quantity"]);
                }
            })
        })
    })

    var result = [];

    var productSet = new Set();
    for (let key of web_products.keys()) {
        productSet.add(key);
    }
    for (let key of store_products.keys()) {
        productSet.add(key);        
    }

    productSet.forEach(name => {
        const elm = {
            productCode: name,
            totalQuantity: 0,
            webQuantity: 0,
            storeQuantity: 0
        }
        if (web_products.has(elm.productCode)) {
            elm.webQuantity += web_products.get(elm.productCode);
            elm.totalQuantity += web_products.get(elm.productCode);
            if (store_products.has(elm.productCode)) {
                elm.storeQuantity += store_products.get(elm.productCode);
                elm.totalQuantity += store_products.get(elm.productCode);
            }
        }
        else {
            elm.storeQuantity += store_products.get(elm.productCode);
            elm.totalQuantity += store_products.get(elm.productCode);
        }
        result.push(elm);
    })

    result.sort((a, b) => a.totalQuantity - b.totalQuantity)

    res.render('sales', {productquantity: result});

}