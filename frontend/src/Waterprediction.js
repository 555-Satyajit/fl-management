import React from 'react';
import { Sprout, ExternalLink, Cloud, Thermometer, Droplets, Wind, LineChart } from 'lucide-react';

const YieldPrediction = () => {
  const handleRedirect = () => {
    window.open('https://huggingface.co/spaces/Sriya555/smart_irrigation', '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-6">
      <div 
        onClick={handleRedirect}
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      >
        {/* Header - Improved spacing for mobile */}
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sprout className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Smart Crop Yield Prediction</h1>
                <p className="text-xs sm:text-sm text-gray-600">AI-Powered Farming Assistant</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-gray-500 hidden sm:block" />
          </div>
        </div>

        {/* Main Content - Adjusted spacing and layout for mobile */}
        <div className="space-y-6 sm:space-y-8">
          {/* Section 1: Input Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 items-center">
            <img 
              src="istockphoto-1094522076-1024x1024.jpg"
              alt="Weather and Soil Analysis" 
              className="rounded-lg object-cover w-full h-48 sm:h-64"
            />
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-green-800">Smart Data Collection</h2>
              <p className="text-sm sm:text-base text-gray-700">Our system analyzes crucial farming parameters:</p>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {[
                  { icon: Cloud, text: 'Rainfall patterns and precipitation levels' },
                  { icon: Thermometer, text: 'Temperature variations throughout seasons' },
                  { icon: Droplets, text: 'Soil moisture and nutrient content' },
                  { icon: Wind, text: 'Wind patterns and humidity levels' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-sm sm:text-base text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Growth Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 items-center bg-green-50">
            <div className="space-y-3 sm:space-y-4 order-2 md:order-1">
              <h2 className="text-lg sm:text-xl font-semibold text-green-800">Crop Growth Monitoring</h2>
              <p className="text-sm sm:text-base text-gray-700">Track your crop's development stages:</p>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  'Monitor different growth stages from sowing to harvest',
                  'Get alerts about optimal irrigation timing',
                  'Receive fertilization recommendations based on growth stage'
                ].map((text, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <img 
              src="istockphoto-175405792-1024x1024.jpg"
              alt="Crop Growth Stages" 
              className="rounded-lg object-cover w-full h-48 sm:h-64 order-1 md:order-2"
            />
          </div>

          {/* Section 3: Yield Prediction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 items-center">
            <img 
              src="istockphoto-1167738271-1024x1024.jpg"
              alt="Yield Prediction Analytics" 
              className="rounded-lg object-cover w-full h-48 sm:h-64"
            />
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-green-800">Advanced Yield Forecasting</h2>
              <p className="text-sm sm:text-base text-gray-700">Get accurate predictions powered by machine learning:</p>
              <div className="space-y-2 sm:space-y-3">
                {[
                  'Estimated crop yield based on current conditions',
                  'Historical data comparison for better accuracy',
                  'Risk assessment and mitigation suggestions'
                ].map((text, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action - Improved mobile spacing */}
          <div className="p-4 sm:p-6 bg-green-50 rounded-b-lg">
            <button 
              className="w-full bg-green-600 text-white py-3 sm:py-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 text-base sm:text-lg font-medium"
            >
              Start Your Crop Prediction Analysis
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">Get immediate access to AI-powered agricultural insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;