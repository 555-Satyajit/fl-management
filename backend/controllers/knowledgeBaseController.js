// controllers/knowledgeBaseController.js
const KnowledgeBase = require('../models/KnowledgeBase');
const axios = require('axios');

// Get weather data from external API
const getWeatherData = async (latitude, longitude) => {
  try {
    // Replace with your actual weather API endpoint and key
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.WEATHER_API_KEY}&q=${latitude},${longitude}`
    );
    return response.data;
  } catch (error) {
    console.error('Weather API error:', error);
    return null;
  }
};

// Helper to determine season based on date and hemisphere
const getSeason = (date, isNorthernHemisphere = true) => {
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  
  if (isNorthernHemisphere) {
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'fall';
    return 'winter';
  } else {
    if (month >= 3 && month <= 5) return 'fall';
    if (month >= 6 && month <= 8) return 'winter';
    if (month >= 9 && month <= 11) return 'spring';
    return 'summer';
  }
};

// Helper to determine weather condition from API response
const getWeatherCondition = (weatherData) => {
  if (!weatherData) return 'all';
  
  const condition = weatherData.current.condition.text.toLowerCase();
  
  if (condition.includes('rain') || condition.includes('shower')) {
    return 'rainy';
  } else if (condition.includes('cloud') || condition.includes('overcast')) {
    return 'cloudy';
  } else if (condition.includes('storm') || condition.includes('thunder')) {
    return 'stormy';
  } else {
    return 'sunny';
  }
};

exports.getDailyTip = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const isNorthernHemisphere = req.query.hemisphere !== 'south';
    
    // Get current weather and season
    const weatherData = await getWeatherData(latitude, longitude);
    const currentSeason = getSeason(new Date(), isNorthernHemisphere);
    const weatherCondition = getWeatherCondition(weatherData);
    
    // Find tips matching the current season and weather condition
    let tip = await KnowledgeBase.findOne({
      type: 'tip',
      season: currentSeason,
      weatherCondition,
      active: true
    });
    
    // If no specific tip found, fallback to a more general tip
    if (!tip) {
      tip = await KnowledgeBase.findOne({
        type: 'tip',
        season: currentSeason,
        weatherCondition: 'all',
        active: true
      });
    }
    
    // If still no tip, get any active tip
    if (!tip) {
      tip = await KnowledgeBase.findOne({
        type: 'tip',
        active: true
      });
    }
    
    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'No farming tips available at the moment'
      });
    }
    
    res.status(200).json({
      success: true,
      data: tip
    });
  } catch (error) {
    console.error('Error fetching daily tip:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching farming tip'
    });
  }
};

exports.getMyths = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const myths = await KnowledgeBase.find({
      type: 'myth',
      active: true
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await KnowledgeBase.countDocuments({
      type: 'myth',
      active: true
    });
    
    res.status(200).json({
      success: true,
      count: myths.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: myths
    });
  } catch (error) {
    console.error('Error fetching myths:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching myths'
    });
  }
};

exports.getFacts = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const facts = await KnowledgeBase.find({
      type: 'fact',
      active: true
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await KnowledgeBase.countDocuments({
      type: 'fact',
      active: true
    });
    
    res.status(200).json({
      success: true,
      count: facts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: facts
    });
  } catch (error) {
    console.error('Error fetching facts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching facts'
    });
  }
};

exports.getFarmerSpotlight = async (req, res) => {
  try {
    const spotlight = await KnowledgeBase.findOne({
      type: 'farmer-spotlight',
      active: true
    })
    .sort({ createdAt: -1 });
    
    if (!spotlight) {
      return res.status(404).json({
        success: false,
        message: 'No farmer spotlight available at the moment'
      });
    }
    
    res.status(200).json({
      success: true,
      data: spotlight
    });
  } catch (error) {
    console.error('Error fetching farmer spotlight:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching farmer spotlight'
    });
  }
};

exports.getSuccessStories = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    
    const stories = await KnowledgeBase.find({
      type: 'story',
      active: true
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
    
    const total = await KnowledgeBase.countDocuments({
      type: 'story',
      active: true
    });
    
    res.status(200).json({
      success: true,
      count: stories.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: stories
    });
  } catch (error) {
    console.error('Error fetching success stories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching success stories'
    });
  }
};

// Admin functions to manage knowledge base content
exports.createKnowledgeItem = async (req, res) => {
  try {
    const newItem = await KnowledgeBase.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (error) {
    console.error('Error creating knowledge item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating knowledge item',
      error: error.message
    });
  }
};

exports.updateKnowledgeItem = async (req, res) => {
  try {
    const updatedItem = await KnowledgeBase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Knowledge item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Error updating knowledge item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating knowledge item',
      error: error.message
    });
  }
};

exports.deleteKnowledgeItem = async (req, res) => {
  try {
    const item = await KnowledgeBase.findByIdAndDelete(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Knowledge item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Knowledge item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting knowledge item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting knowledge item',
      error: error.message
    });
  }
};