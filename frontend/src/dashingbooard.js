import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, Cloud, BarChart3, Settings, LogOut, Droplets, Sun, Wind,
  Calendar, AlertTriangle, Wrench, Leaf, PieChart, DollarSign,
  Brain, Bug, CloudRain, Menu, X, ChevronRight, Microscope,
  Plant, Tractor, Database, Zap, Radio, Map, TreePine
} from 'lucide-react';
import { useAuth } from './AuthContext';

const FarmerDashboard = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMLTool, setActiveMLTool] = useState(null);

  const stats = [
    { label: 'Crop Health', value: '98%', icon: Sprout, trend: '+2%' },
    { label: 'Water Usage', value: '780L', icon: Droplets, trend: '-5%' },
    { label: 'Temperature', value: '24°C', icon: Sun, trend: '0%' },
    { label: 'Revenue', value: '$12,450', icon: DollarSign, trend: '+8%' }
  ];

  const mlTools = [
    {
      id: 'soil',
      title: 'Soil Analysis',
      icon: Microscope,
      description: 'Real-time soil nutrient analysis and recommendations',
      actions: ['Analyze Now', 'View History', 'Export Data']
    },
    {
      id: 'drone',
      title: 'Drone Mapping',
      icon: Radio,
      description: 'Automated drone field scanning and crop monitoring',
      actions: ['Launch Drone', 'View Maps', 'Schedule Scan']
    },
    {
      id: 'machinery',
      title: 'Smart Machinery',
      icon: Tractor,
      description: 'AI-powered machinery optimization and scheduling',
      actions: ['View Fleet', 'Optimize Routes', 'Maintenance']
    },
    {
      id: 'genetics',
      title: 'Crop Genetics',
      icon: Database,
      description: 'Genetic analysis and crop breeding recommendations',
      actions: ['Analyze Crops', 'View Reports', 'Research']
    }
  ];

  const mlPredictions = [
    {
      title: 'Crop Yield Prediction',
      icon: Sprout,
      prediction: '4.2 tons/acre',
      confidence: 92,
      details: 'Based on current soil conditions and weather patterns'
    },
    {
      title: 'Pest Risk Analysis',
      icon: Bug,
      prediction: 'Low Risk',
      confidence: 88,
      details: 'No significant pest threats detected in the next 2 weeks'
    },
    {
      title: 'Optimal Irrigation',
      icon: CloudRain,
      prediction: '2.5L/m²',
      confidence: 95,
      details: 'Recommended water volume for next 3 days'
    },
    {
      title: 'Disease Prediction',
      icon: Brain,
      prediction: 'Healthy',
      confidence: 90,
      details: 'No disease indicators present in current crop analysis'
    }
  ];

  const menuItems = [
    { label: 'Overview', icon: PieChart, link: '/farmer/dashboard' },
    { label: 'Planning', icon: Calendar, link: '/farmer/planning' },
    { label: 'Weather', icon: Cloud, link: '/farmer/weather' },
    { label: 'Analytics', icon: BarChart3, link: '/farmer/analytics' },
    { label: 'ML Tools', icon: Brain, link: '/farmer/mltools' },
    { label: 'Settings', icon: Settings, link: '/farmer/settings' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Navigation remains the same */}
      
      {/* Main Content */}
      <main className="pt-16 px-4 md:px-8 pb-8">

        {/* ML Tools Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold text-[#2C1810] mb-6 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-[#8B4513]" />
            ML Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mlTools.map((tool) => (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-transparent hover:border-[#E6B17E]/20"
                onClick={() => setActiveMLTool(tool.id === activeMLTool ? null : tool.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-[#FAF6F1] rounded-lg group-hover:bg-[#2C1810] transition-colors">
                    <tool.icon className="h-6 w-6 text-[#8B4513]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#2C1810] mb-2">{tool.title}</h3>
                <p className="text-sm text-[#8B4513] mb-4">{tool.description}</p>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: activeMLTool === tool.id ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pt-4 border-t border-[#E6B17E]/20">
                    {tool.actions.map((action, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-2 text-sm text-[#2C1810] bg-[#FAF6F1] rounded-lg hover:bg-[#E6B17E]/20 transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid with Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-6 w-6 text-[#8B4513]" />
                <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#2C1810]">{stat.value}</h3>
              <p className="text-sm text-[#8B4513] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ML Predictions with Enhanced Animations */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#2C1810] mb-6 flex items-center">
            <Brain className="h-6 w-6 mr-2 text-[#8B4513]" />
            AI Predictions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mlPredictions.map((pred) => (
              <motion.div 
                key={pred.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[#E6B17E]/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-2 bg-[#FAF6F1] rounded-lg group-hover:bg-[#2C1810] transition-colors"
                  >
                    <pred.icon className="h-5 w-5 text-[#8B4513] group-hover:text-white" />
                  </motion.div>
                  <span className="text-sm font-medium text-[#8B4513]">
                    {pred.confidence}% accurate
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#2C1810] mb-2">{pred.title}</h3>
                <p className="text-2xl font-bold text-[#2C1810] mb-2">{pred.prediction}</p>
                <p className="text-sm text-[#8B4513]">{pred.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weather Alert with Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto mt-12"
        >
          <div className="bg-gradient-to-r from-[#2C1810] to-[#8B4513] p-1 rounded-xl">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-[#FAF6F1] rounded-lg"
                >
                  <Cloud className="h-6 w-6 text-[#8B4513]" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2C1810]">Incoming Weather Change</h3>
                  <p className="text-[#8B4513]">Light rain expected in the next 24 hours</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#FAF6F1] text-[#2C1810] rounded-lg hover:bg-[#E6B17E]/20 transition-colors"
              >
                View Details
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default FarmerDashboard;