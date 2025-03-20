// models/Equipment.js
const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  model: String,
  status: { 
    type: String, 
    enum: ['operational', 'maintenance', 'repair', 'idle'],
    default: 'operational'
  },
  lastMaintenance: Date,
  nextMaintenance: Date,
  fuelLevel: Number,
  location: String,
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Equipment', equipmentSchema);