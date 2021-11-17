const data = require('../models/product'); //lee los datos
// console.log(data); //lee el array de datos

const product = {
    getProduct: (req, res) => {
        if (req.params.id) {
            res.status(200).render('product', {products:[data[req.params.id]]});
         } else {
            res.status(200).render('product', {products:data});
         }
        
    },
    createProduct: (req, res) => {
        console.log(req.body)
        res.status(201).send('Nuevo producto creado');
    }
}

module.exports = product;