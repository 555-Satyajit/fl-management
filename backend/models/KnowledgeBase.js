const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['tip', 'myth', 'fact', 'story', 'farmer-spotlight']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  isTrue: {
    type: Boolean,
    default: null // Used for myths vs facts
  },
  season: {
    type: String,
    enum: ['spring', 'summer', 'fall', 'winter', 'all'],
    default: 'all'
  },
  weatherCondition: {
    type: String,
    enum: ['sunny', 'rainy', 'cloudy', 'stormy', 'all','dry'],
    default: 'all'
  },
  farmerSpotlight: {
    name: String,
    location: String,
    achievement: String,
    technique: String,
    photoUrl: String
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Pre-save hook to update the updatedAt field
knowledgeBaseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
knowledgeBaseSchema.index({ type: 1 });
knowledgeBaseSchema.index({ season: 1 });
knowledgeBaseSchema.index({ weatherCondition: 1 });
knowledgeBaseSchema.index({ tags: 1 });

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);