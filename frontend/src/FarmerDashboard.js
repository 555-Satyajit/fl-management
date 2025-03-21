import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, Cloud, BarChart3, Settings, LogOut, Droplets, Sun, Wind,
  Calendar, AlertTriangle, Wrench, Leaf, PieChart, DollarSign,
  Brain, Bug, CloudRain, Menu, X, ChevronRight, Microscope,
  Plant, Tractor, Database, Zap, Radio, Map, TreePine, Activity,
  Bell, User, Search, ChevronDown,
} from 'lucide-react';
import { useAuth } from './AuthContext'
import Overview from './dashingbooard';
import Planning from './planning';
import Weather from './farmer/weather'
import Analytics from './farmer/Analytics';
import MLTools from './farmer/MLTOOLS';
import YieldPrediction from './YieldPrediction';
import Water from './Water';  // adjust path as needed



const FarmerDashboard = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMLTool, setActiveMLTool] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Overview');
  const [notifications, setNotifications] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Overview');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const firstName = user.name.split(' ')[0]
  
      // Show a confirmation dialog
      const handleLogout = () => {
        // Show a confirmation dialog
        const confirmLogout = window.confirm('Are you sure you want to log out?');
    
        if (confirmLogout) {
          // Call the logout function from useAuth
          logout();
        }
      };



   // Page transition variants
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
    Overview: Overview,
    Planning: Planning,
    Weather: Weather,
    Analytics: Analytics,
    MLTools: MLTools,
    Settings: Settings,
    YieldPrediction: YieldPrediction,
    Water:Water,   // adjust path as needed
  };

  // Function to render current page
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

  // Modified menu items to use setCurrentPage
  const menuItems = [
    { 
      label: 'Overview', 
      icon: PieChart, 
      onClick: () => setCurrentPage('Overview')
    },
    { 
      label: 'Features', 
      icon: Calendar, 
      onClick: () => setCurrentPage('Planning')
    },
    { 
      label: 'Weather', 
      icon: Cloud, 
      onClick: () => setCurrentPage('Weather')
    },
    { 
      label: 'Analytics', 
      icon: BarChart3, 
      onClick: () => setCurrentPage('Analytics')
    },
    { 
      label: 'ML Tools', 
      icon: Brain, 
      onClick: () => setCurrentPage('YieldPrediction'),
      subItems: [
        { 
          label: 'Water Prediction', 
          icon: Microscope,
          onClick: () => setCurrentPage('Water')
        },
        { 
          label: 'Yield Prediction', 
          icon: Sprout,
          onClick: () => setCurrentPage('YieldPrediction')
        },
        
        { 
          label: 'Pest Risk Analysis', 
          icon: Bug,
          onClick: () => setCurrentPage('SoilAnalysis')
        },
        { 
          label: 'Crop Genetics', 
          icon: Database,
          onClick: () => setCurrentPage('SoilAnalysis')
        },
        { 
          label: 'Optimal Irrigation', 
          icon: CloudRain,
          onClick: () => setCurrentPage('SoilAnalysis')
        },

      ]
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      onClick: () => setCurrentPage('Settings')
    },
  ];

  // Animation variants for navbar
  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Mobile menu animations
  const mobileMenuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  // Navbar component
  const Navbar = () => (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-8"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sprout className="h-8 w-8 text-[#8B4513]" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-[#2C1810]">FarmSmart</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeNavItem === item.label
                      ? 'bg-[#FAF6F1] text-[#2C1810]'
                      : 'text-[#8B4513] hover:bg-[#FAF6F1]'
                  }`}
                  onClick={() => {
                    setActiveNavItem(item.label);
                    item.onClick(); // Call the onClick handler from menuItems
                  }}

                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.subItems && (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </motion.button>

                {/* Dropdown Menu */}
                {item.subItems && (
                  <div className="absolute hidden group-hover:block w-48 pt-2">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-lg border border-[#E6B17E]/20 overflow-hidden"
                    >
                      {item.subItems.map((subItem) => (
                        <motion.button  
                          key={subItem.label}
                          onClick={subItem.onClick}  // Add the onClick handler
                          whileHover={{ backgroundColor: '#FAF6F1' }}
                          className="flex items-center space-x-2 px-4 py-3 text-[#8B4513] hover:text-[#2C1810] transition-colors"
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.label}</span>
                        </motion.button  >
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-[#FAF6F1] transition-colors"
            >
              <Search className="h-5 w-5 text-[#8B4513]" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-[#FAF6F1] transition-colors"
            >
              <Bell className="h-5 w-5 text-[#8B4513]" />
            </motion.button>

            {/* User Menu */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center space-x-3 p-2 rounded-lg hover:bg-[#FAF6F1] cursor-pointer"
              onClick={handleLogout}
            >
              <div className="w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-[#2C1810] font-medium">{user.name.split(' ')[0]}</span>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#FAF6F1]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#8B4513]" />
              ) : (
                <Menu className="h-6 w-6 text-[#8B4513]" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-[#E6B17E]/20 p-4"
          >
            <div className="max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 rounded-lg bg-[#FAF6F1] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );

  // Mobile Menu
  const MobileMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileMenuVariants}
          className="fixed inset-0 bg-white z-40 md:hidden pt-16"
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-[#FAF6F1]"
                  onClick={() => {
                    setActiveNavItem(item.label);
                    if (!item.subItems) {
                      item.onClick(); // Call the onClick handler
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-[#8B4513]" />
                    <span className="text-[#2C1810]">{item.label}</span>
                  </div>
                  {item.subItems ? (
                    <ChevronDown className="h-5 w-5 text-[#8B4513]" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-[#8B4513]" />
                  )}
                </motion.button>

                {/* Mobile Subitems */}
                {item.subItems && activeNavItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 mt-2 space-y-2"
                  >
                    {item.subItems.map((subItem) => (
                      <motion.button
                        key={subItem.label}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#FAF6F1]"
                        onClick={() => {
                          subItem.onClick(); // Call the onClick handler
                          setIsMenuOpen(false);
                        }}
                      >
                        <subItem.icon className="h-4 w-4 text-[#8B4513]" />
                        <span className="text-[#2C1810]">{subItem.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Mobile User Section */}
            <div className="pt-4 border-t border-[#E6B17E]/20">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 p-4 rounded-lg hover:bg-[#FAF6F1]"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 text-[#8B4513]" />
                <span className="text-[#2C1810]">Logout</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navbar 
        menuItems={menuItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <MobileMenu 
        menuItems={menuItems}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      {renderPage()}
    </div>
  );
};

export default FarmerDashboard;