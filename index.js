

const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended : false}));

//routes

app.get('/',(req, res) => {
    res.send ("Hello from Node API Server")

});
app.get('/api/products', async(req, res) =>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});

    }
})

app.post('/api/products',async (req, res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//update a product
app.put('/api/product/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product){
            return res.statusMessage(404).json({message:"Prdouct is not found"});
        }
        const updatedProsuct = await Product.findById(id);
        res.status(200).json(updatedProsuct);


    } catch (error) {
        res.status(500).json({message: error.message});

    }
});

//delete a product
app.delete('/api/product/:id', async (req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.statusMessage(404).json({message:"Product is not found"});
        }
        res.status(200).json({message:"Product is deleted"});
        
    } catch (error) {
        res.status(500).json({message: error.message});

    }
})

mongoose.connect("mongodb+srv://hemantsonihs2004:wgZlQZXLtHqkwKbY@backenddb.zye6j2j.mongodb.net/Node-API?retryWrites=true&w=majority&appName=backenddb")
.then(()=>{
    console.log ("Connected todatabase");
    app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
})
.catch (()=>{
    console.log ("Error connecting to database");
});