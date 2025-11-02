const mongoose = require('mongoose')

const coffeeSchema = new mongoose.Schema({
    
  name: {
    type: String,
    required: true,
    trim: true
  },
  origin: {
    type: String,
    required: true
  },
  roastLevel: {
    type: String,
    enum: ['light', 'medium', 'dark'],
    required: true
  },
  flavorNotes: {
    type: [String],
    default: []
  },
  brewMethod: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  tastingDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coffee', coffeeSchema);