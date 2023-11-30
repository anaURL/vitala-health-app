const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  info: { type: String, required: true },
});

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);

module.exports = HealthRecord;
