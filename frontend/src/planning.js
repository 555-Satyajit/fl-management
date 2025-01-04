import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Newspaper, 
  BarChart3, 
  Calendar,
  Users,
  Tractor,
  CloudRain,
  DollarSign,
  ExternalLink,
  Wheat,
  BookOpen,
  ShoppingCart
} from 'lucide-react';

// Import your page components
import FarmTube from './pages/FarmTube';
import AgriNews from './pages/AgriNews';
import Analytics from './pages/Analytics';
import Planning from './pages/Planning';
import Network from './pages/Network';
import Weather from './pages/Weather';
import Equipment from './pages/Equipment';
import Finance from './pages/Finance';
import CropGuide from './pages/CropGuide';
import Knowledge from './pages/Knowledge';
import Market from './pages/Market';

const FarmFeatures = () => {
  const [currentPage, setCurrentPage] = useState('Features');

  // Page transition variants - exactly like dashboard
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    enter: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Component mapping for pages
  const pageComponents = {
    Features: FarmFeatures,
    FarmTube: FarmTube,
    AgriNews: AgriNews,
    Analytics: Analytics,
    Planning: Planning,
    Network: Network,
    Weather: Weather,
    Equipment: Equipment,
    Finance: Finance,
    CropGuide: CropGuide,
    Knowledge: Knowledge,
    Market: Market,
  };

  // Function to render current page - exactly like dashboard
  const renderPage = () => {
    const PageComponent = pageComponents[currentPage];
    
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="min-h-screen bg-[#FAF6F1] pt-16"
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>
    );
  };

  const tools = [
    {
      icon: Video,
      title: "FarmTube",
      description: "Expert videos & farming tutorials",
      page: "FarmTube",
      color: "bg-gradient-to-br from-red-500 to-red-600"
    },
    {
      icon: Newspaper,
      title: "Agri-News",
      description: "Latest agriculture news & market updates",
      page: "AgriNews",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Crop Analytics",
      description: "AI-powered yield predictions & insights",
      page: "Analytics",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: Calendar,
      title: "Farm Planner",
      description: "Smart scheduling & task management",
      page: "Planning",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Farmer Network",
      description: "Connect with agriculture community",
      page: "Network",
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      icon: CloudRain,
      title: "Weather",
      description: "Real-time forecasts & alerts",
      page: "Weather",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600"
    },
    {
      icon: Tractor,
      title: "Equipment",
      description: "Smart machinery management",
      page: "Equipment",
      color: "bg-gradient-to-br from-amber-500 to-amber-600"
    },
    {
      icon: DollarSign,
      title: "Finance",
      description: "Complete farm financial tools",
      page: "Finance",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      icon: Wheat,
      title: "Crop Guide",
      description: "In-depth cultivation techniques",
      page: "CropGuide",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600"
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Comprehensive farming resources",
      page: "Knowledge",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    },
    {
      icon: ShoppingCart,
      title: "Agri-Market",
      description: "Digital marketplace for farmers",
      page: "Market",
      color: "bg-gradient-to-br from-rose-500 to-rose-600"
    }
  ];

  // If we're on a specific feature page, render that page
  if (currentPage !== 'Features') {
    return renderPage();
  }

  // Otherwise render the features grid
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="features"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="w-full bg-[#FAF6F1] py-8"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(tool.page)}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                {/* Decorative corner shape */}
                <div className={`absolute top-0 right-0 w-24 h-24 ${tool.color} 
                  opacity-10 rounded-bl-full`}></div>
                
                {/* Tool content */}
                <div className="p-6 relative">
                  <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center 
                    justify-center mb-4`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-[#2C1810] mb-2 group-hover:text-blue-600 
                    transition-colors duration-300">
                    {tool.title}
                  </h3>
                  
                  <p className="text-[#8B4513] text-sm mb-4">{tool.description}</p>
                  
                  <div className="flex items-center text-sm text-blue-600 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300">
                    <span className="mr-2">Open Tool</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom border gradient on hover */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${tool.color} transform scale-x-0 
                  group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FarmFeatures;