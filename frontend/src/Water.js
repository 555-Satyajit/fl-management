import React from 'react';
import { Droplets, ExternalLink, Cloud, Thermometer, Timer, BarChart4, Wind } from 'lucide-react';

const Water = () => {
  const handleRedirect = () => {
    window.open('https://huggingface.co/spaces/Sriya555/water');
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
              <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Smart Water Prediction</h1>
                <p className="text-xs sm:text-sm text-gray-600">AI-Powered Irrigation Assistant</p>
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
              src="/api/placeholder/640/480"
              alt="Weather and Soil Analysis" 
              className="rounded-lg object-cover w-full h-48 sm:h-64"
            />
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Smart Data Collection</h2>
              <p className="text-sm sm:text-base text-gray-700">Our system analyzes crucial water parameters:</p>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {[
                  { icon: Cloud, text: 'Rainfall prediction and precipitation levels' },
                  { icon: Thermometer, text: 'Evaporation rates based on temperature' },
                  { icon: Droplets, text: 'Soil moisture retention capacity' },
                  { icon: Wind, text: 'Water stress detection and alerts' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span className="text-sm sm:text-base text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Irrigation Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 items-center bg-blue-50">
            <div className="space-y-3 sm:space-y-4 order-2 md:order-1">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Irrigation Scheduling</h2>
              <p className="text-sm sm:text-base text-gray-700">Optimize your watering schedule:</p>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  'Receive precise irrigation timing recommendations',
                  'Adjust water volumes based on crop type and growth stage',
                  'Save water with drought-adaptive watering plans'
                ].map((text, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <img 
              src="/api/placeholder/640/480"
              alt="Irrigation Scheduling" 
              className="rounded-lg object-cover w-full h-48 sm:h-64 order-1 md:order-2"
            />
          </div>

          {/* Section 3: Water Prediction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 items-center">
            <img 
              src="/api/placeholder/640/480"
              alt="Water Usage Analytics" 
              className="rounded-lg object-cover w-full h-48 sm:h-64"
            />
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-800">Advanced Water Forecasting</h2>
              <p className="text-sm sm:text-base text-gray-700">Get accurate predictions powered by machine learning:</p>
              <div className="space-y-2 sm:space-y-3">
                {[
                  'Predicted water requirements for upcoming weeks',
                  'Water savings potential based on smart irrigation',
                  'Seasonal water usage patterns and optimization'
                ].map((text, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <BarChart4 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action - Improved mobile spacing */}
          <div className="p-4 sm:p-6 bg-blue-50 rounded-b-lg">
            <button 
              className="w-full bg-blue-600 text-white py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2 text-base sm:text-lg font-medium"
            >
              Start Your Water Prediction Analysis
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">Get immediate access to AI-powered irrigation insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Water;