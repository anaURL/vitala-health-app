const express = require("express");
const router = express.Router();
const HealthRecord = require("../models/healthRecord");

// fetch all health records
router.get("/", async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find();
    console.log("Health records fetched successfully:", healthRecords);

    res.json(healthRecords);
  } catch (error) {
    console.error("Error fetching health records:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fetch a single health record by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const healthRecord = await HealthRecord.findById(id);
    if (!healthRecord) {
      return res.status(404).json({ error: "Health Record not found" });
    }
    res.json(healthRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// add a new health record
router.post("/add", async (req, res) => {
  const { type, date, info } = req.body;
  try {
    console.log("Adding a new health record:", req.body);
    const newRecord = new HealthRecord({ type, date, info });
    const savedRecord = await newRecord.save();
    res.json(savedRecord);
  } catch (error) {
    console.error("Error adding a new health record:", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update a health record by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, date, info } = req.body;
  try {
    const updatedRecord = await HealthRecord.findByIdAndUpdate(
      id,
      { type, date, info },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ error: "Health Record not found" });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete a health record by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecord = await HealthRecord.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ error: "Health Record not found" });
    }

    // Modify the response to include the deleted record details
    res.json({ message: "Health Record deleted successfully", deletedRecord });
  } catch (error) {
    console.error("Error in DELETE route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
