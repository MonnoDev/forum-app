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
    const existingUser = await collection.findOne({
      $or: [{ displayName: { $eq: displayName } }, { email: { $eq: email } }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists' });
    }
    await collection.insertOne({ displayName, email, password });
    await con.close();
    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/login', async (req, res) => {
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
    const postedDate = new Date();
    const formattedDate = postedDate
      .toISOString()
      .replace(/T/, ' ')
      .slice(0, 16);
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const data = await collection.insertOne({
      title,
      question,
      postedDate: formattedDate,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const { sortOrder } = req.query;
    const con = await client.connect();
    const sortQuery = { postedDate: sortOrder === 'asc' ? 1 : -1 };
    const collection = con.db(dbName).collection('Questions');
    const data = await collection.find().sort(sortQuery).toArray();
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

app.put('/question/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const { title, question } = req.body;
    const lastEdited = new Date();
    const con = await client.connect();
    const collection = con.db(dbName).collection('Questions');
    const objectId = new ObjectId(questionId);
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { title, question, lastEdited } },
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
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete('/question/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const questionCollection = con.db(dbName).collection('Questions');
    const commentCollection = con.db(dbName).collection('Comments');
    const questionResult = await questionCollection.deleteOne({ _id: new ObjectId(id) });
    await commentCollection.deleteMany({ questionId: new ObjectId(id) });
    await con.close();

    if (questionResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    return res.json({ message: 'Question and associated comments deleted successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post('/question/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const questionObjectId = new ObjectId(id);
    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');
    const data = await collection.insertOne({
      questionId: questionObjectId,
      comment,
    });
    await con.close();
    res.send({ id: data.insertedId });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/question/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');
    const comments = await collection
      .aggregate([
        {
          $match: {
            questionId: new ObjectId(id),
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
      ])
      .toArray();
    await con.close();
    res.send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/comment/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const lastEdited = new Date();
    const commentObjectId = new ObjectId(commentId);
    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');
    const result = await collection.updateOne(
      { _id: commentObjectId },
      { $set: { comment, lastEdited } },
    );
    await con.close();
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    return res.json({ message: 'Comment updated successfully' }); // Add a return statement here
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete('/comment/:commentId', async (req, res) => {
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
    return res.json({ message: 'Comment deleted successfully' }); // Add a return statement here
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/comment/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Comments');
    const comment = await collection.findOne({ _id: new ObjectId(commentId) });
    const lastEdited = new Date();
    await collection.updateOne(
      { _id: new ObjectId(commentId) },
      { $set: { lastEdited } },
    );
    await con.close();
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    const commentWithLastEdited = { ...comment, lastEdited };
    return res.send(commentWithLastEdited); // Add a return statement here
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(port, () => {
  // Server is running on port
});
