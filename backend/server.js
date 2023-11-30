const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 3001;

const atlasConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.swhx7ao.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(atlasConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  });

  const healthRecordSchema = new mongoose.Schema({
    type: String,
    date: String,
    info: String,
  });

  const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);


  app.get('/', async (req, res) => {
    try {
      const healthRecords = await HealthRecord.find();
      res.json(healthRecords);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.listen(port, () => {
    console.log(`Yeah! Server is running on port ${port}`);
  });
