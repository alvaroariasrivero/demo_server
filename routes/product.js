const product = require('../controllers/product')
const hasApiKey = require('../middlewares/hasApiKey')
const routes = require('express').Router();

///////////////////Rutas para la web////////////////////////////
// http://localhost:3000/products/5?API_KEY="hola123"
// http://localhost:3000/products/3
// http://localhost:3000/products
routes.get('/products/:id?', product.getProduct);
routes.post('/products',hasApiKey, product.createProduct); // se pide API_KEY para crear productos


module.exports = routes;