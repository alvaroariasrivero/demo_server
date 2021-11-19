const dataProduct = require('../utils/product')
const Product = require('../models/product');
//const data = require('../models/product') // Leer los datos del array
//console.log(data); // lee el array de datos

const getProduct = async (req,res) => {
    console.log("*******************");
    console.log(req.params);

    // Consulta 
    // Los datos
    // del producto correspondiente
    let data;
    try{
        if(req.params.id){
            // data = await dataProduct.getProductById(req.params.id);
            data = await Product.find({'id': req.params.id}, '-_id -__v')
            res.status(200).json(data[0]) // Creo un array con 1 dato
        } else{
            // data = await dataProduct.getAllProducts();
            data = await Product.find({}, '-_id -__v')
            res.status(200).json({products:data}) // Envio un array con N datos
        }
    } catch(err){
        res.status(400).json({"error":err})
    }
}

const createProduct = async (req,res) => {
    console.log("***************");
    // Se guardaran cosas en la BBDD
    console.log(req.body); // En req.body está el objeto a guardar
    //Guardar en la BBDD MongoDb
    try{
    const product = new Product(req.body); //Genero el nuevo documento
    const result = await product.save(); //Lo guarda en BD

    console.log("Producto creado!!!!!**************");
    console.log(result);
    res.status(201).json(result);
    } catch(err){
        res.status(400).json({"error":err})
    }
}

const product = {
    getProduct,
    createProduct
}
module.exports = product;