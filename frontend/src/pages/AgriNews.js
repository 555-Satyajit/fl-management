import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const NewsDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://webscrapping-seven.vercel.app/api/news');
        const result = await response.json();
        
        if (result.status === 'success' && result.data) {
          setNews(result.data);
        }
      } catch (err) {
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <LoadingSpinner 
          theme="docs"
          size="default"
          overlay={false}
          isLoading={loading} // Use `loading` here
        />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <div className="text-xl text-[#8B4513]">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAF6F1] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#2C1810] mb-2">Latest Agriculture News</h1>
          <div className="w-24 h-1 bg-[#8B4513] mx-auto"></div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {item.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image.startsWith('http') ? item.image : `https://odia.krishijagran.com${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#2C1810] mb-4 line-clamp-2 h-14">
                  {item.title}
                </h3>
                <a 
                  href={item.link.startsWith('http') ? item.link : `https://odia.krishijagran.com${item.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#8B4513] text-white px-6 py-2 rounded-full hover:bg-[#2C1810] transition-colors duration-300 text-sm font-medium"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDashboard;
