import React, { useState } from 'react';

const SmartFarmPlanner = () => {
  const [farmData, setFarmData] = useState({
    soilType: '',
    landSize: '',
    mainSeason: '',
    budget: '',
    currentCrops: []
  });

  const [recommendations, setRecommendations] = useState(null);

  // Database of high-profit crop combinations and farming practices
  const profitablePatterns = {
    'sandy': {
      crops: ['groundnuts', 'watermelon', 'carrots'],
      practices: [
        'Use drip irrigation to conserve water',
        'Add organic matter to improve water retention',
        'Plant wind-breaking trees on borders'
      ],
      rotation: ['legumes', 'vegetables', 'fruits'],
      investment: {
        'low': ['groundnuts', 'millet'],
        'medium': ['watermelon', 'carrots'],
        'high': ['dragon fruit', 'greenhouse vegetables']
      }
    },
    'clayey': {
      crops: ['rice', 'wheat', 'cotton'],
      practices: [
        'Implement proper drainage systems',
        'Deep plowing in dry season',
        'Add sand and organic matter to improve texture'
      ],
      rotation: ['rice', 'pulses', 'oilseeds'],
      investment: {
        'low': ['rice', 'pulses'],
        'medium': ['cotton', 'sugarcane'],
        'high': ['orchards', 'protected cultivation']
      }
    },
    'loamy': {
      crops: ['vegetables', 'fruits', 'cereals'],
      practices: [
        'Use integrated farming approach',
        'Implement mulching',
        'Practice crop rotation'
      ],
      rotation: ['cereals', 'vegetables', 'pulses'],
      investment: {
        'low': ['seasonal vegetables', 'cereals'],
        'medium': ['fruit orchards', 'commercial vegetables'],
        'high': ['greenhouse crops', 'exotic fruits']
      }
    }
  };

  const generatePlan = () => {
    if (!farmData.soilType || !farmData.budget) {
      alert('Please fill in all required fields');
      return;
    }

    const soilPattern = profitablePatterns[farmData.soilType];
    const investmentLevel = farmData.budget < 50000 ? 'low' : farmData.budget < 200000 ? 'medium' : 'high';
    
    const yearlySchedule = {
      'First Season (Primary)': {
        mainCrop: soilPattern.rotation[0],
        tasks: [
          'Soil preparation and testing (Week 1)',
          'Primary fertilization (Week 2)',
          'Sowing/planting (Week 2-3)',
          'Regular irrigation scheduling',
          'Pest monitoring and IPM',
          'Harvest and market preparation'
        ]
      },
      'Second Season': {
        mainCrop: soilPattern.rotation[1],
        tasks: [
          'Crop residue management',
          'Secondary crop planting',
          'Integrated pest management',
          'Market linkage establishment'
        ]
      },
      'Third Season (if applicable)': {
        mainCrop: soilPattern.rotation[2],
        tasks: [
          'Short duration crop planting',
          'Soil health maintenance',
          'Water conservation practices'
        ]
      }
    };

    const profitStrategy = {
      'low': [
        'Focus on local market demand',
        'Implement cost-effective pest management',
        'Use saved seeds when possible',
        'Practice natural fertilization methods',
        'Develop direct marketing channels'
      ],
      'medium': [
        'Invest in storage facilities',
        'Implement grading and packaging',
        'Explore wholesale markets',
        'Use certified seeds',
        'Invest in basic machinery'
      ],
      'high': [
        'Setup food processing unit',
        'Implement precision farming',
        'Develop export linkages',
        'Use advanced irrigation systems',
        'Invest in protected cultivation'
      ]
    }[investmentLevel];

    const sustainabilityMeasures = [
      'Crop rotation to maintain soil health',
      'Integrated pest management',
      'Water conservation practices',
      'Organic matter incorporation',
      'Natural pollinator protection',
      ...(soilPattern.practices || [])
    ];

    setRecommendations({
      recommendedCrops: soilPattern.investment[investmentLevel],
      yearlySchedule,
      profitStrategy,
      sustainabilityMeasures,
      soilType: farmData.soilType
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Farm Profit Optimizer</h1>
      
      <div className="mb-6">
        <h2 className="text-xl mb-4">Enter Your Farm Details</h2>
        <div className="space-y-4">
          <select
            className="w-full p-2 border rounded"
            value={farmData.soilType}
            onChange={(e) => setFarmData({...farmData, soilType: e.target.value})}
          >
            <option value="">Select Soil Type</option>
            <option value="sandy">Sandy Soil</option>
            <option value="clayey">Clay Soil</option>
            <option value="loamy">Loam Soil</option>
          </select>

          <input
            type="number"
            placeholder="Land Size (in acres)"
            className="w-full p-2 border rounded"
            value={farmData.landSize}
            onChange={(e) => setFarmData({...farmData, landSize: e.target.value})}
          />

          <input
            type="number"
            placeholder="Available Budget (in Rs.)"
            className="w-full p-2 border rounded"
            value={farmData.budget}
            onChange={(e) => setFarmData({...farmData, budget: e.target.value})}
          />

          <button
            onClick={generatePlan}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Generate Profit-Focused Plan
          </button>
        </div>
      </div>

      {recommendations && (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Recommended High-Profit Crops</h3>
            <ul className="list-disc pl-5 space-y-2">
              {recommendations.recommendedCrops && recommendations.recommendedCrops.map((crop, index) => (
                <li key={index} className="capitalize">{crop}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Yearly Farming Schedule</h3>
            {recommendations.yearlySchedule && Object.entries(recommendations.yearlySchedule).map(([season, details]) => (
              <div key={season} className="mb-4">
                <h4 className="font-medium mb-2">{season}</h4>
                <p className="text-green-700 mb-2">Main Crop: {details.mainCrop}</p>
                <ul className="list-disc pl-5 space-y-1">
                  {details.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Profit Optimization Strategy</h3>
            <ul className="list-disc pl-5 space-y-2">
              {recommendations.profitStrategy && recommendations.profitStrategy.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Sustainable Farming Practices</h3>
            <ul className="list-disc pl-5 space-y-2">
              {recommendations.sustainabilityMeasures && recommendations.sustainabilityMeasures.map((measure, index) => (
                <li key={index}>{measure}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default SmartFarmPlanner;