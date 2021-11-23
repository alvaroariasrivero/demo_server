const express = require('express')
const productRouter = require('./routes/product') 
const productApiRouter = require('./routes/productApi')

require('dotenv').config() // carga fichero variables de entorno
require('./utils/dbmongocon') // Lanzo la base de datos de mongo

const app = express()
const port = 3000

app.use(express.json()) // Para habilitar envio de JSON al servidor

app.set('view engine', 'pug');
app.set('views','./views');

/******Rutas**********/

app.get('/',(req, res) => {
  res.send('Mi home de productos')
})


///////////////////Rutas para la web////////////////////////////
app.use('/', productRouter)

////////////////////RUTAS PARA LA API///////////////////////////////////////////////////////
app.use('/api', productApiRouter)

//Capture All 404 errors
app.use(function (req,res,next){
  const data = {
    message:"Error! 404 not found",
    error:404
  }
	res.status(404).render('error',{data});
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = server;