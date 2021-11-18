const express = require('express')
const product = require('./controllers/product')

const app = express()
const port = 3000

app.use(express.json()) //Habilitar envío de json al servidor

app.set('view engine', 'pug');
app.set('views','./views');


//http://localhost:3000/products?API_KEY=hola123
function hasApiKey(req,res,next){
  if(req.query.API_KEY && req.query.API_KEY=="hola123"){
    next();
  }
  else {
    const data = {
      message:"API KEY no válida o inexistente",
      url:"https://i.pinimg.com/originals/75/17/10/7517102abcd06433c5f0bcf8e199a14a.jpg"
    }
    res.status(403).render("error",data);
  }
}

// app.use(hasApiKey); //añadir el middleware. Descomentar para probar



///////////////////////RUTAS///////////////////////////

app.get('/', (req, res) => {
  res.send('Home de productos')
})


// http://localhost:3000/things/pepe/5?age=3&location=madrid
app.get('/things/:name/:id', function(req, res) {
  console.log('********************')  
  console.log(req.params)
  console.log(req.query)
  res.send(`He recibido esto: --> id: ${req.params.id} and name:${req.params.name}
            Y de query params : ${req.query.age} ${req.query.location}
  `);
 });

app.get('/products/:id?', product.getProduct);

app.post('/products', product.createProduct);

app.get('/first_template', function(req, res){
    res.render('first_view');
 });

//Capture All 404 errors
app.use(function (req,res,next){
  const data = {
    message:"Error! 404 not found",
    url:"https://cdn.dribbble.com/users/1000681/screenshots/3466109/media/272b3a5f18cac0f0e77c3e340d98c99a.gif"
  }
  res.status(404).render('error',data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})