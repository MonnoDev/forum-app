const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.post('/register', async (req, res) => {
  try {
    const { displayName, email, password } = req.body;
    const con = await client.connect();
    const data = await con.db(dbName).collection('Registered').insertOne({ displayName, email, password });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/register', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Registered').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is runing on the ${port} port`);
});
