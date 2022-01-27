const express = require('express')
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 4040;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9uobc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err);
    const restaurantCollection = client.db("restaurantDb").collection("restaurants");

    // app.post('/addRestaurants', (req, res)=>{
    //     const restaurants = req.body;
    //     console.log(restaurants);
    //     restaurantCollection.insertMany(restaurants)
    //     .then(res => console.log(res))
    // })

    app.get('/restaurants', (req, res)=>{
        restaurantCollection.find()
        .toArray((err, documents)=>{
            res.send(documents)
        })
    })

    app.get('/restaurant/:id', (req, res)=>{
        restaurantCollection.find({_id: req.params.id})
        .toArray((err, documents)=>{
            res.send(documents)
        })
    })


    


});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})