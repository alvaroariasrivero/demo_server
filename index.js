const express = require('express')
const product = require('./controllers/product')

const app = express()
const port = 3000

app.use(express.json()) //Habilitar envío de json al servidor

app.set('view engine', 'pug');
app.set('views','./views');

function hasApiKey(req, res, next){

}




///////////////////////RUTAS///////////////////////////

app.get('/', (req, res) => {
  res.send('Home de productos')
})

app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });

app.get('/products/:id?', product.getProduct);

app.post('/products', product.createProduct);

app.get('/first_template', function(req, res){
    res.render('first_view');
 });

//Capture all 404 errors
app.use(function(req, res, next) {
  res.status(404).render('error404')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})