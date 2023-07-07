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
//works
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
//works
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
//works
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
//works
app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const data = await collection.find().toArray();
    await con.close();
    const transformedData = data.map(({ _id, ...rest }) => ({
      id: _id.toString(),
      ...rest,
    }));
    res.send(transformedData);
  } catch (error) {
    res.status(500).send(error);
  }
});
//works
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
//works
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
    const transformedData = {
      id: data._id.toString(),
      ...data,
    };
    return res.send(transformedData);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});
//works
app.delete('/question/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    await con.close();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
});
//works
app.post('/question/:id/comments', async (req, res) => {
  try {
    const { id } = req.params; // Get the question ID from the URL parameter
    const { comment } = req.body;

    const questionObjectId = new ObjectId(id); // Use the question ID to create ObjectId

    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');

    const data = await collection.insertOne({
      questionId: questionObjectId,
      comment,
    });
    await con.close();

    // Send only the inserted document's ID as a response
    res.send({ id: data.insertedId });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/question/:id/comments', async (req, res) => {
  try {
    const { id } = req.params; // Get the question ID from the URL parameter

    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');

    const comments = await collection.aggregate([
      {
        $match: {
          questionId: new ObjectId(id), // Convert questionId to ObjectId
        },
      },
      {
        $lookup: {
          from: 'Questions',
          localField: 'questionId',
          foreignField: '_id',
          as: 'question',
        },
      },
    ]).toArray();

    await con.close();

    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a comment /works
app.put('/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    const commentObjectId = new ObjectId(commentId);

    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');

    const result = await collection.updateOne(
      { _id: commentObjectId },
      { $set: { comment } }
    );
    await con.close();

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment updated successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a comment /works
app.delete('/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    const commentObjectId = new ObjectId(commentId);

    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');

    const result = await collection.deleteOne({ _id: commentObjectId });
    await con.close();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
