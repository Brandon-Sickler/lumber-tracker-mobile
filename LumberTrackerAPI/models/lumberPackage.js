const mongoose = require('mongoose');

const lumberPackageSchema = new mongoose.Schema({
  packageNumber: { type: String, required: true, unique: true },
  vendor: { type: String, required: true },
  dateReceived: { type: Date, default: Date.now },
  currentStage: { type: String, enum: ['Receiving', 'Stacking', 'Kilning', 'Planing'], default: 'Receiving' },
  notes: { type: String },
});

module.exports = mongoose.model('LumberPackage', lumberPackageSchema);