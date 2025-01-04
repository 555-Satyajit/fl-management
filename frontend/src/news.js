import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ChevronRight, AlertTriangle, Bookmark, Share2, RefreshCw } from 'lucide-react';

const NewsDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://webscrapping-seven.vercel.app//api/news');
      const data = await response.json();
      if (data.status === 'success') {
        setNews(data.data);
      } else {
        throw new Error('Failed to fetch news');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="p-3 bg-white rounded-lg"
        >
          <RefreshCw className="h-8 w-8 text-[#8B4513]" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-sm max-w-md text-center">
          <AlertTriangle className="h-12 w-12 text-[#8B4513] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C1810] mb-2">Error Loading News</h3>
          <p className="text-[#8B4513]">{error}</p>
          <button 
            onClick={fetchNews}
            className="mt-4 px-6 py-2 bg-[#FAF6F1] text-[#2C1810] rounded-lg hover:bg-[#E6B17E]/20 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    { id: 'all', label: 'All News' },
    { id: 'top_story', label: 'Top Stories' },
    { id: 'animal_husbandry', label: 'Animal Husbandry' },
    { id: 'health_lifestyle', label: 'Health & Lifestyle' },
  ];

  const filteredNews = activeSection === 'all' 
    ? news 
    : news.filter(item => item.section === activeSection);

  return (
    <div className="min-h-screen bg-[#FAF6F1] p-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2C1810] flex items-center">
            <Newspaper className="h-6 w-6 mr-2 text-[#8B4513]" />
            Agricultural News
          </h1>
          <p className="text-[#8B4513] mt-2">Stay updated with the latest farming news and insights</p>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-[#2C1810] text-white'
                  : 'bg-white text-[#2C1810] hover:bg-[#E6B17E]/20'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              {item.image && (
                <div className="h-48 bg-[#FAF6F1] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#8B4513] bg-[#FAF6F1] px-3 py-1 rounded-full">
                    {item.section.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#2C1810] mb-4 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B4513] hover:text-[#2C1810] transition-colors flex items-center"
                  >
                    Read More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-[#FAF6F1] rounded-full transition-colors">
                      <Bookmark className="h-4 w-4 text-[#8B4513]" />
                    </button>
                    <button className="p-2 hover:bg-[#FAF6F1] rounded-full transition-colors">
                      <Share2 className="h-4 w-4 text-[#8B4513]" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NewsDashboard;