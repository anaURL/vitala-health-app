const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const healthRoutes = require("./routes/healthRoutes");
const HealthRecord = require("./models/healthRecord");

require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
const port = 3002;

app.use(express.json());

const atlasConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.swhx7ao.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(atlasConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connected successfully!");
});

app.use("/api/healthrecords", healthRoutes);

app.get("/", async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find();
    res.json(healthRecords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Yeah! Server is running on port ${port}`);
});
