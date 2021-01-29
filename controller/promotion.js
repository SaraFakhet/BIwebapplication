var controller = {}, _app = {};
var axios = require('axios');

module.exports = function(app) {
    _app = app
    return controller
}


controller.promotion = async function(req, res, next) {

    var web_products = new Map();
    var store_products = new Map();

    await axios.get(process.env.KONG_URL + "/" + process.env.URL_GESTION_COMMERCIALE +'/all-sales').then(function (data) {
        if (!data.data || data.data.length == 0){
            return res.status(200).json([]).end();
        }
        data.data.map(sale => {
            let list = [];
            list.push(sale["product-quantity-map"]);
            list[list.length - 1].map(product => {
                if (sale["sell-type"] === "Web") {
                    web_products.set(product["product-code"], web_products.has(product["product-code"]) ? web_products.get(product["product-code"]) + product["quantity"] : product["quantity"]);
                }
                else {
                    store_products.set(product["product-code"], store_products.has(product["product-code"]) ? store_products.get(product["product-code"]) + product["quantity"] : product["quantity"]);
                }
            })
        })
    }).catch( error => {
        return res.status(200).json([]);
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

    var promo = [];

    if (result.length < 2) {
        return res.status(200).json(promo);
    }

    for (let index = 0; index < result.length; index++) {
        const element = {
            "product-code" : result[index].productCode
        };
        promo.push(element);
    }

    return res.status(200).json(promo);

}