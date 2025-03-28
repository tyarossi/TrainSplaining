const express = require('express');
const router = express.Router();
const Line = require('../models/lineModel');

// Create a new line
const createLine = async (req, res) => {
  try {
    const newLine = new Line(req.body);
    const savedLine = await newLine.save();
    res.status(201).json(savedLine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all lines
const getAllLines = async (req, res) => {
  try {
    const lines = await Line.find();
    res.status(200).json(lines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read a single line by ID
const getLineById = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id);
    if (!line) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json(line);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a line by ID
const updateLine = async (req, res) => {
  try {
    const updatedLine = await Line.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLine) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json(updatedLine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a line by ID
const deleteLine = async (req, res) => {
  try {
    const deletedLine = await Line.findByIdAndDelete(req.params.id);
    if (!deletedLine) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.status(200).json({ message: 'Line deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.post('/lines', createLine);
router.get('/lines', getAllLines);
router.get('/lines/:id', getLineById);
router.put('/lines/:id', updateLine);
router.delete('/lines/:id', deleteLine);

module.exports = {
  createLine,
  getAllLines,
  getLineById,
  updateLine,
  deleteLine
};