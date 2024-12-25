import React, { useState, useEffect } from 'react';
import { Sprout, Cloud, Sun, Droplets } from 'lucide-react';

const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [growthStage, setGrowthStage] = useState(0);
  const [dayNightCycle, setDayNightCycle] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const growthInterval = setInterval(() => {
      setGrowthStage(prev => (prev + 1) % 4);
      setDayNightCycle(prev => (prev + 1) % 2);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(growthInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#2C1810]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className={`relative w-full max-w-sm mx-auto rounded-xl p-4 sm:p-8 shadow-xl flex flex-col items-center gap-4 sm:gap-6 overflow-hidden transition-colors duration-800
          ${dayNightCycle === 0 ? 'bg-[#FAF6F1]' : 'bg-[#2C1810]'}`}
      >
        {/* Animated Sky Elements */}
        <div className={`absolute inset-0 transition-opacity duration-800 ${dayNightCycle === 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 animate-spin-slow">
            <Sun className={`h-6 w-6 sm:h-8 sm:w-8 text-[#8B4513] transition-transform duration-800
              ${growthStage % 2 === 0 ? 'scale-100' : 'scale-90'}`} 
            />
          </div>
        </div>
        
        {/* Stars (visible at night) */}
        <div className={`absolute inset-0 transition-opacity duration-800 ${dayNightCycle === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-2 right-2 h-2 w-2 bg-[#E6B17E] rounded-full animate-twinkle" />
          <div className="absolute top-4 left-4 h-2 w-2 bg-[#E6B17E] rounded-full animate-twinkle-delayed" />
          <div className="absolute bottom-8 right-8 h-2 w-2 bg-[#E6B17E] rounded-full animate-twinkle" />
        </div>

        {/* Clouds and Rain */}
        <div className="absolute top-3 sm:top-6 left-2 sm:left-4 animate-float-slow">
          <Cloud className={`h-4 w-4 sm:h-6 sm:w-6 ${dayNightCycle === 0 ? 'text-[#8B4513]' : 'text-[#E6B17E]'}`} />
          {growthStage === 1 && (
            <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B4513] absolute -bottom-4 left-1 animate-rain" />
          )}
        </div>

        {/* Growing Plant */}
        <div className="h-16 sm:h-20 flex items-end justify-center mt-8">
          <div className="relative">
            <div className="absolute bottom-0 w-1 sm:w-1.5 bg-[#8B4513] rounded-full transition-all duration-500"
              style={{ 
                height: `${(growthStage + 1) * 25}%`,
                maxHeight: '60px'
              }}
            />
            <Sprout 
              className={`h-8 w-8 sm:h-12 sm:w-12 text-[#8B4513] transition-all duration-500 transform
                ${growthStage === 0 ? 'scale-50 translate-y-4 opacity-50' : ''}
                ${growthStage === 1 ? 'scale-75 translate-y-2 opacity-75' : ''}
                ${growthStage === 2 ? 'scale-90 translate-y-1 opacity-90' : ''}
                ${growthStage === 3 ? 'scale-100 translate-y-0 opacity-100' : ''}
              `}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className={`text-center font-semibold text-base sm:text-lg transition-colors duration-800
          ${dayNightCycle === 0 ? 'text-[#2C1810]' : 'text-[#E6B17E]'}`}>
          {growthStage === 0 && "Planting Seeds..."}
          {growthStage === 1 && "Adding Water..."}
          {growthStage === 2 && "Growing Strong..."}
          {growthStage === 3 && "Almost Ready!"}
        </div>

        {/* Progress Bar */}
        <div className="w-32 sm:w-48 h-2 bg-[#E6B17E]/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#8B4513] rounded-full transition-all duration-500"
            style={{ 
              width: `${(growthStage + 1) * 25}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Add custom styles for animations
const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-10px) translateX(5px); }
  }

  @keyframes rain {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(20px) scale(0.5); opacity: 0; }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @keyframes twinkle-delayed {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }

  .animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
  }

  .animate-rain {
    animation: rain 1s ease-in infinite;
  }

  .animate-twinkle {
    animation: twinkle 2s ease-in-out infinite;
  }

  .animate-twinkle-delayed {
    animation: twinkle-delayed 2s ease-in-out infinite;
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LoadingSpinner;