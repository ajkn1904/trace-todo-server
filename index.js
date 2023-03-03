const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();


app.use(cors());
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7splzic.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const usersCollection = client.db("traceTodo").collection("user");
const taskCollection = client.db("traceTodo").collection("tasks");



app.get('/', async (req, res) => {
    res.send('Trace Todo Server is running');
});

app.listen(port, () => console.log(`Trace Todo Server is running on ${port}`));