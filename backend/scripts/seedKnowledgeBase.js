// scripts/seedKnowledgeBase.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const KnowledgeBase = require('../models/KnowledgeBase');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
  seedDatabase();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Seed data
const knowledgeBaseData = [
    // Farming Tips
    {
      type: 'tip',
      title: 'Optimize Summer Watering',
      content: 'Water your crops early in the morning to reduce evaporation and water loss. This ensures the water reaches plant roots before the heat of the day causes excessive evaporation.',
      season: 'summer',
      weatherCondition: 'sunny',
      tags: ['irrigation', 'water-saving', 'summer']
    },
    {
      type: 'tip',
      title: 'Prepare for Rain',
      content: 'When rain is expected, turn off automated irrigation systems and allow natural rainfall to water your crops. Consider installing rain barrels to collect excess water for future use.',
      season: 'all',
      weatherCondition: 'rainy',
      tags: ['irrigation', 'water-saving', 'rainy-season']
    },
  
    // Myths vs Facts
    {
      type: 'myth',
      title: 'More Water Means Healthier Crops',
      content: 'Too much water can cause root rot and decrease crop yield. Proper irrigation schedules help plants grow healthier.',
      isTrue: false,
      tags: ['irrigation', 'water']
    },
    {
      type: 'fact',
      title: 'Drip Irrigation Saves Up to 70% More Water',
      content: 'Drip irrigation provides water directly to the roots, reducing evaporation and ensuring efficient use of water.',
      isTrue: true,
      tags: ['irrigation', 'water-saving']
    },
  
    // Farmer Spotlight
    {
      type: 'farmer-spotlight',
      title: 'Meet Ramesh Kumar – Smart Farming Advocate',
      content: 'Ramesh Kumar from Maharashtra adopted AI-based irrigation and increased his crop yield by 40%.',
      farmerSpotlight: {
        name: 'Ramesh Kumar',
        location: 'Maharashtra, India',
        achievement: 'Increased crop yield by 40% using AI-based irrigation.',
        technique: 'AI-driven irrigation management system',
        photoUrl: 'https://example.com/ramesh-kumar-photo.jpg'
      },
      tags: ['success-story', 'technology']
    },
    {
      type: 'farmer-spotlight',
      title: 'Organic Farming Success – Priya Patel',
      content: 'Priya Patel has been using organic fertilizers and drip irrigation, reducing costs while increasing profits.',
      farmerSpotlight: {
        name: 'Priya Patel',
        location: 'Gujarat, India',
        achievement: 'Reduced costs and increased profits through organic farming.',
        technique: 'Use of organic fertilizers and drip irrigation',
        photoUrl: 'https://example.com/priya-patel-photo.jpg'
      },
      tags: ['organic', 'sustainability']
    },
  
    // Success Stories
    {
      type: 'story',
      title: 'Using AI for Precision Farming',
      content: 'A group of farmers in Punjab used AI-powered soil analysis to optimize fertilizer use, saving 30% on costs.',
      tags: ['AI', 'precision-farming']
    },
    {
      type: 'story',
      title: 'Solar-Powered Irrigation in Rajasthan',
      content: 'Farmers in Rajasthan installed solar pumps, reducing electricity costs and improving water access.',
      tags: ['solar', 'irrigation']
    },
    {
        type: 'tip',
        title: 'Mulching to Conserve Moisture',
        content: 'Apply organic mulch like straw or wood chips around plants to reduce water evaporation and control weeds.',
        season: 'all',
        weatherCondition: 'dry',
        tags: ['mulching', 'water-conservation']
      },
      {
        type: 'tip',
        title: 'Crop Rotation for Soil Health',
        content: 'Rotate crops each season to improve soil fertility and reduce pests and diseases.',
        season: 'all',
        weatherCondition: 'all',
        tags: ['crop-rotation', 'soil-health']
      },
    
      // Additional Myths vs Facts
      {
        type: 'myth',
        title: 'More Fertilizer Leads to Higher Yields',
        content: 'Excess fertilizer can harm soil health and pollute water sources. Proper balance is essential.',
        isTrue: false,
        tags: ['fertilizer', 'soil']
      },
      {
        type: 'fact',
        title: 'Intercropping Improves Soil Fertility',
        content: 'Planting different crops together helps improve soil nutrients and reduces pests.',
        isTrue: true,
        tags: ['intercropping', 'sustainability']
      },
    
      // Additional Farmer Spotlights
      {
        type: 'farmer-spotlight',
        title: 'Greenhouse Farming Success – Anil Sharma',
        content: 'Anil Sharma from Himachal Pradesh successfully grows high-yield vegetables in a greenhouse.',
        farmerSpotlight: {
          name: 'Anil Sharma',
          location: 'Himachal Pradesh, India',
          achievement: 'Increased vegetable production using greenhouse farming.',
          technique: 'Greenhouse farming for climate-controlled growth.',
          photoUrl: 'https://example.com/anil-sharma-photo.jpg'
        },
        tags: ['greenhouse', 'high-yield']
      },
    
      // Additional Success Stories
      {
        type: 'story',
        title: 'Hydroponics Revolution in Urban Areas',
        content: 'Farmers in Bengaluru are adopting hydroponics to grow vegetables in small spaces with 90% less water.',
        tags: ['hydroponics', 'urban-farming']
      },
      {
        type: 'story',
        title: 'Agri-Drones for Pest Control',
        content: 'Farmers in Andhra Pradesh are using drones to detect and control pests more efficiently.',
        tags: ['drones', 'pest-control']
      },
      {
        type: 'myth',
        title: 'More fertilizer always leads to better yields',
        content: 'Excessive use of fertilizers can degrade soil quality, harm beneficial microbes, and cause water pollution. Proper nutrient management is crucial.',
        isTrue: false,
        tags: ['fertilizer', 'soil-health']
      },
      {
        type: 'myth',
        title: 'Watering crops every day is the best practice',
        content: 'Overwatering can lead to root rot, nutrient leaching, and water wastage. Using efficient irrigation schedules is more effective.',
        isTrue: false,
        tags: ['irrigation', 'water-management']
      },
      {
        type: 'myth',
        title: 'Pesticides are the only way to control pests',
        content: 'Integrated Pest Management (IPM), including natural predators, crop rotation, and biological control, can be more sustainable and effective.',
        isTrue: false,
        tags: ['pest-control', 'sustainability']
      },
      {
        type: 'myth',
        title: 'Plowing the land deeply improves soil fertility',
        content: 'Deep plowing can disturb beneficial microbes and lead to soil erosion. Conservation tillage and cover cropping are better alternatives.',
        isTrue: false,
        tags: ['soil-health', 'tillage']
      },
      {
        type: 'myth',
        title: 'Organic farming always produces lower yields',
        content: 'Properly managed organic farming can produce comparable yields while improving soil health and reducing chemical dependence.',
        isTrue: false,
        tags: ['organic-farming', 'sustainability']
      },
      {
        type: 'myth',
        title: 'Genetically modified (GM) crops are always harmful',
        content: 'Many GM crops help improve resistance to pests, reduce pesticide use, and increase yield while being safe for consumption.',
        isTrue: false,
        tags: ['GM-crops', 'biotechnology']
      },
      {
        type: 'myth',
        title: 'Adding sugar to soil makes plants grow faster',
        content: 'Plants produce their own sugars through photosynthesis. Adding sugar to soil can disrupt microbial balance and harm plant roots.',
        isTrue: false,
        tags: ['plant-growth', 'soil']
      },
      {
        type: 'myth',
        title: 'Burning crop residue improves soil nutrients',
        content: 'Burning crop residue depletes organic matter, releases harmful gases, and contributes to air pollution.',
        isTrue: false,
        tags: ['crop-residue', 'air-pollution']
      },
      {
        type: 'myth',
        title: 'All insects on crops are harmful',
        content: 'Some insects, such as ladybugs and bees, are beneficial for pollination and natural pest control.',
        isTrue: false,
        tags: ['pollination', 'pest-control']
      },
      {
        type: 'myth',
        title: 'Drip irrigation is too expensive for small farmers',
        content: 'Low-cost drip irrigation systems are available, making them accessible and beneficial for small farmers.',
        isTrue: false,
        tags: ['drip-irrigation', 'water-saving']
      },
    
      // Facts
      {
        type: 'fact',
        title: 'Drip irrigation saves up to 70% more water',
        content: 'Drip irrigation delivers water directly to plant roots, reducing evaporation and ensuring efficient use of water.',
        isTrue: true,
        tags: ['irrigation', 'water-saving']
      },
      {
        type: 'fact',
        title: 'Crop rotation improves soil fertility',
        content: 'Growing different crops in succession helps maintain soil nutrients and reduces pests and diseases.',
        isTrue: true,
        tags: ['crop-rotation', 'soil-health']
      },
      {
        type: 'fact',
        title: 'Mulching helps conserve soil moisture',
        content: 'Applying mulch around plants reduces evaporation, controls weeds, and improves soil structure.',
        isTrue: true,
        tags: ['mulching', 'water-conservation']
      },
      {
        type: 'fact',
        title: 'Bees are essential for crop pollination',
        content: 'Bees and other pollinators help fertilize plants, increasing fruit and seed production.',
        isTrue: true,
        tags: ['pollination', 'bees']
      },
      {
        type: 'fact',
        title: 'Soil testing helps optimize fertilizer use',
        content: 'Soil testing determines nutrient levels, allowing farmers to apply only the necessary fertilizers, preventing waste and pollution.',
        isTrue: true,
        tags: ['soil-testing', 'fertilizer']
      },
      {
        type: 'fact',
        title: 'Cover crops prevent soil erosion',
        content: 'Cover crops like clover and legumes protect soil from erosion, improve fertility, and suppress weeds.',
        isTrue: true,
        tags: ['cover-crops', 'soil-health']
      },
      {
        type: 'fact',
        title: 'Composting reduces waste and enriches soil',
        content: 'Organic compost adds essential nutrients to soil, reducing the need for synthetic fertilizers.',
        isTrue: true,
        tags: ['composting', 'organic-farming']
      },
      {
        type: 'fact',
        title: 'Agroforestry enhances biodiversity',
        content: 'Growing trees and crops together provides shade, improves soil quality, and supports wildlife.',
        isTrue: true,
        tags: ['agroforestry', 'sustainability']
      },
      {
        type: 'fact',
        title: 'Precision farming increases efficiency',
        content: 'Using AI and sensors in farming helps optimize resources like water and fertilizers, improving yield and sustainability.',
        isTrue: true,
        tags: ['precision-farming', 'AI']
      },
      {
        type: 'fact',
        title: 'Earthworms improve soil health',
        content: 'Earthworms help aerate the soil, decompose organic matter, and improve nutrient availability for plants.',
        isTrue: true,
        tags: ['earthworms', 'soil-health']
      }
    ];

// Function to seed database
async function seedDatabase() {
  try {
    await KnowledgeBase.deleteMany(); // Clear existing data
    await KnowledgeBase.insertMany(knowledgeBaseData);
    console.log('Knowledge Base seeded successfully');
    mongoose.connection.close(); // Close DB connection after seeding
  } catch (error) {
    console.error('Error seeding Knowledge Base:', error);
    process.exit(1);
  }
}
