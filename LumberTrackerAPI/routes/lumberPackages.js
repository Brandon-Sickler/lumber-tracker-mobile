const express = require('express');
const router = express.Router();
const LumberPackage = require('../models/lumberPackage');

// GET all lumber packages
router.get('/', async (req, res) => {
  try {
    const lumberPackages = await LumberPackage.find();
    res.json(lumberPackages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single lumber package by ID
router.get('/:id', async (req, res) => {
  try {
    const lumberPackage = await LumberPackage.findById(req.params.id);
    if (lumberPackage == null) {
      return res.status(404).json({ message: 'Lumber package not found' });
    }
    res.json(lumberPackage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new lumber package
router.post('/', async (req, res) => {
  const lumberPackage = new LumberPackage({
    packageNumber: req.body.packageNumber,
    vendor: req.body.vendor,
    notes: req.body.notes
  });

  try {
    const newLumberPackage = await lumberPackage.save();
    res.status(201).json(newLumberPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a lumber package
router.put('/:id', async (req, res) => {
  try {
    const lumberPackage = await LumberPackage.findById(req.params.id);
    if (lumberPackage == null) {
      return res.status(404).json({ message: 'Lumber package not found' });
    }

    if (req.body.packageNumber != null) {
      lumberPackage.packageNumber = req.body.packageNumber;
    }
    if (req.body.vendor != null) {
      lumberPackage.vendor = req.body.vendor;
    }
    if (req.body.notes != null) {
      lumberPackage.notes = req.body.notes;
    }

    const updatedLumberPackage = await lumberPackage.save();
    res.json(updatedLumberPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a lumber package
router.delete('/:id', async (req, res) => {
  try {
    const lumberPackage = await LumberPackage.findById(req.params.id);
    if (lumberPackage == null) {
      return res.status(404).json({ message: 'Lumber package not found' });
    }

    await lumberPackage.remove();
    res.json({ message: 'Lumber package deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;