const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
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
    const collection = con.db(dbName).collection('Registered');
    const data = await collection.insertOne({ displayName, email, password });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/register', async (req, res) => {
  try {
    const con = await client.connect();
    const collection = con.db(dbName).collection('Registered');
    const data = await collection.find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/question', async (req, res) => {
  try {
    const { title, question } = req.body;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const data = await collection.insertOne({ title, question });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const data = await collection.find().toArray();
    await con.close();

    // Transform the _id field to a string without the $oid property
    const transformedData = data.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));

    res.send(transformedData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/question/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const { title, question } = req.body;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const objectId = new ObjectId(questionId);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { title, question } },
    );
    await con.close();
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.json({ message: 'Question updated successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/question/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const data = await collection.findOne({ _id: new ObjectId(id) });
    await con.close();

    if (!data) {
      return res.status(404).send('Question not found');
    }

    // Transform the _id field to a string without the $oid property
    const transformedData = {
      id: data._id.toString(),
      ...data,
    };

    return res.send(transformedData); // Use return to return the response
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message); // Use return to return the error response
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
