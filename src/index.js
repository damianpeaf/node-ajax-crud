const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const router = require(express.router());

const app = express();

const products = [
    {
        id: 1,
        name: 'laptop'
    }, {
        id: 2,
        name: 'microfono'
    }, {
        id: 3,
        name: 'mouse'
    }, {
        id: 4,
        name: 'si'
    }
];

// Conf
app.set('port', process.env.POST || 3000)

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/products', (req, res) => {
    res.json(products)
})

app.post('/products', (req, res) => {

    const { name } = req.body;

    products.push({
        id: products.length + 1,
        name
    })
    res.send('datos recibidos')
})

app.put('/products/:id', (req, res) => {
    // console.log(req.params, req.body)

    const { id } = req.params;
    const { name } = req.body;


    products.forEach((product, i) => {
        if (product.id == id) {
            product.name = name
            res.json('actualizado')
        }
    })

})

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    products.forEach((product, i) => {
        if (product.id == id) {
            products.splice(i)
            res.json('eliminado')
        }
    })
})

// Static files 
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`)
})

