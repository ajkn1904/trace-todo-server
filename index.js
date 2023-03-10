const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();


app.use(cors());
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7splzic.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const usersCollection = client.db("traceTodo").collection("users");
const tasksCollection = client.db("traceTodo").collection("tasks");


async function run() {
    try{


        app.post('/users', async (req, res) => {
            const users = req.body
            const result = await usersCollection.insertOne(users)
            res.send(result)

        });


        app.get('/task', async (req, res) => {
            const reqEmail = req.query.email;
            const query = { email: reqEmail }
            const result = await tasksCollection.find(query).sort({ _id: -1 }).toArray()
            res.send(result)
        })



        app.put('/task/complete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const updatedDoc = {
                $set: {
                    isCompleted: true
                }
            }
            const result = await tasksCollection.updateOne(query, updatedDoc, option)
            res.send(result)
        })
        
        
        app.put('/task/notComplete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const updatedDoc = {
                $set: {
                    isCompleted: false
                }
            }
            const result = await tasksCollection.updateOne(query, updatedDoc, option)
            res.send(result)
        })


        app.post('/task', async (req, res) => {
            const tasks = req.body;
            const result = await tasksCollection.insertOne(tasks)
            res.send(tasks);
        })


        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await tasksCollection.deleteOne(query)
            res.send(result)
        })

    }
    finally{}
}
run().catch(console.log())



app.get('/', async (req, res) => {
    res.send('Trace Todo Server is running');
});

app.listen(port, () => console.log(`Trace Todo Server is running on ${port}`));