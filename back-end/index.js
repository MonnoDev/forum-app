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
    const collection = con.db(dbName).collection('Users');
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

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const collection = con.db(dbName).collection('Users');
    const data = await collection.find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Users');
    const data = await collection.findOne({ _id: new ObjectId(id) });
    await con.close();
    if (!data) {
      return res.status(404).send('User not found');
    }
    return res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { displayName, email, password } = req.body;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Users');
    const newUserId = new ObjectId(userId);
    const result = await collection.updateOne(
      { _id: newUserId },
      { $set: { displayName, email, password } },
    );
    if (result.modifiedCount === 0) {
      await con.close();
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await collection.findOne({ _id: newUserId });
    await con.close();
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const usersCollection = con.db(dbName).collection('Users');
    const userResult = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });
    await con.close();
    if (userResult.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post('/question', async (req, res) => {
  try {
    const { title, question } = req.body;
    const postedDate = new Date();
    postedDate.setHours(postedDate.getHours() + 3);
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
    const answerCollection = con.db(dbName).collection('Answers');
    const questionResult = await questionCollection.deleteOne({
      _id: new ObjectId(id),
    });
    await answerCollection.deleteMany({ questionId: new ObjectId(id) });
    await con.close();
    if (questionResult.deletedCount === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }
    return res.json({
      message: 'Question and associated answers deleted successfully',
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post('/question/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const questionObjectId = new ObjectId(id);
    const con = await client.connect();
    const collection = con.db(dbName).collection('Answers');
    const data = await collection.insertOne({
      questionId: questionObjectId,
      answer,
    });
    await con.close();
    res.send({ id: data.insertedId });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/question/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Answers');
    const answers = await collection
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
    res.send(answers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/answer/:answerId', async (req, res) => {
  try {
    const { answerId } = req.params;
    const { answer } = req.body;
    const lastEdited = new Date();
    const answerObjectId = new ObjectId(answerId);
    const con = await client.connect();
    const collection = con.db(dbName).collection('Answers');
    const result = await collection.updateOne(
      { _id: answerObjectId },
      { $set: { answer, lastEdited } },
    );
    await con.close();
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'answer not found' });
    }
    return res.json({ message: 'answer updated successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete('/answer/:answerId', async (req, res) => {
  try {
    const { answerId } = req.params;
    const answerObjectId = new ObjectId(answerId);
    const con = await client.connect();
    const collection = con.db(dbName).collection('Answers');
    const result = await collection.deleteOne({ _id: answerObjectId });
    await con.close();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'answer not found' });
    }
    return res.json({ message: 'answer deleted successfully' });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get('/answer/:answerId', async (req, res) => {
  try {
    const { answerId } = req.params;
    const con = await client.connect();
    const collection = con.db(dbName).collection('Answers');
    const answer = await collection.findOne({ _id: new ObjectId(answerId) });
    const lastEdited = new Date();
    await collection.updateOne(
      { _id: new ObjectId(answerId) },
      { $set: { lastEdited } },
    );
    await con.close();
    if (!answer) {
      return res.status(404).send('answer not found');
    }
    const answerWithLastEdited = { ...answer, lastEdited };
    return res.send(answerWithLastEdited);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(port, () => {
  // Server is running on port
});
