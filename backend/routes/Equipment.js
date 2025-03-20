// routes/Equipment.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Equipment Schema and Model
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

// Check if the model already exists to avoid the "Cannot overwrite model once compiled" error
const Equipment = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);

// Get all equipment
router.get('/', async (req, res) => {
  try {
    console.log('GET request to /api/equipment received');
    const equipment = await Equipment.find({});
    console.log(`Found ${equipment.length} equipment items`);
    res.json(equipment);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single equipment by ID
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new equipment
router.post('/', async (req, res) => {
  try {
    const newEquipment = new Equipment(req.body);
    const savedEquipment = await newEquipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update equipment
router.put('/:id', async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    res.json(updatedEquipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete equipment
router.delete('/:id', async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndDelete(req.params.id);
    
    if (!deletedEquipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;