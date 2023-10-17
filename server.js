const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/poductModel');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoose.connect(process.env.MONGODB_URI || 'your-fallback-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });


//routes
app.get('/',(req, res) => {
    res.send('hello api')
  
})



////////////---------to post product

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//////////////------to get product

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


///////-------- to get product by id

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


///////////////-----------to update a product

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


/////////////---------------- to delete a product by id

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




mongoose.connect('mongodb+srv://admin:admin123@automobileapi.kgshxsm.mongodb.net/NoodeAPI?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    })
}).catch((error) => {
    console.log(error)
})




