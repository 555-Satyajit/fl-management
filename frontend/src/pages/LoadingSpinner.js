import React, { useState, useEffect } from 'react';
import { Sprout, Cloud, Sun, Droplets, Loader2, RefreshCcw, BookOpen, Code, Send } from 'lucide-react';

const LoadingSpinner = ({ 
  isLoading = true,
  theme = 'plant',
  message = '',
  duration = 3000,
  cycleSpeed = 800,
  overlay = true,
  size = 'default'
}) => {
  const [growthStage, setGrowthStage] = useState(0);
  const [dayNightCycle, setDayNightCycle] = useState(0);

  const themes = {
    plant: {
      icons: [
        { stage: 0, text: "Planting Seeds..." },
        { stage: 1, text: "Adding Water..." },
        { stage: 2, text: "Growing Strong..." },
        { stage: 3, text: "Almost Ready!" }
      ],
      icon: Sprout,
      bgLight: '#FAF6F1',
      bgDark: '#2C1810',
      textLight: '#2C1810',
      textDark: '#E6B17E',
      accent: '#8B4513'
    },
    data: {
      icons: [
        { stage: 0, text: "Fetching Data..." },
        { stage: 1, text: "Processing..." },
        { stage: 2, text: "Analyzing..." },
        { stage: 3, text: "Almost Done!" }
      ],
      icon: RefreshCcw,
      bgLight: '#EEF2FF',
      bgDark: '#1E293B',
      textLight: '#1E293B',
      textDark: '#93C5FD',
      accent: '#3B82F6'
    },
    docs: {
      icons: [
        { stage: 0, text: "Loading Document..." },
        { stage: 1, text: "Processing Pages..." },
        { stage: 2, text: "Formatting..." },
        { stage: 3, text: "Ready Soon!" }
      ],
      icon: BookOpen,
      bgLight: '#F0FDF4',
      bgDark: '#14532D',
      textLight: '#14532D',
      textDark: '#86EFAC',
      accent: '#22C55E'
    },
    code: {
      icons: [
        { stage: 0, text: "Compiling..." },
        { stage: 1, text: "Building..." },
        { stage: 2, text: "Testing..." },
        { stage: 3, text: "Deploying!" }
      ],
      icon: Code,
      bgLight: '#FDF4FF',
      bgDark: '#581C87',
      textLight: '#581C87',
      textDark: '#E9D5FF',
      accent: '#A855F7'
    }
  };

  const currentTheme = themes[theme] || themes.plant;
  const Icon = currentTheme.icon;

  useEffect(() => {
    const growthInterval = setInterval(() => {
      setGrowthStage(prev => (prev + 1) % 4);
      setDayNightCycle(prev => (prev + 1) % 2);
    }, cycleSpeed);

    return () => {
      clearInterval(growthInterval);
    };
  }, [cycleSpeed]);

  if (!isLoading) return null;

  const sizeClasses = {
    small: {
      wrapper: 'max-w-xs p-3',
      icon: 'h-6 w-6',
      text: 'text-sm'
    },
    default: {
      wrapper: 'max-w-sm p-4 sm:p-8',
      icon: 'h-8 w-8 sm:h-12 sm:w-12',
      text: 'text-base sm:text-lg'
    },
    large: {
      wrapper: 'max-w-md p-6 sm:p-10',
      icon: 'h-12 w-12 sm:h-16 sm:w-16',
      text: 'text-lg sm:text-xl'
    }
  };

  const selectedSize = sizeClasses[size] || sizeClasses.default;

  const Wrapper = ({ children }) => overlay ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {children}
    </div>
  ) : (
    <div className="flex items-center justify-center p-4">
      {children}
    </div>
  );

  return (
    <Wrapper>
      <div 
        className={`relative w-full mx-auto rounded-xl shadow-xl flex flex-col items-center gap-4 sm:gap-6 overflow-hidden transition-colors duration-800
          ${selectedSize.wrapper}
          ${dayNightCycle === 0 ? `bg-${currentTheme.bgLight}` : `bg-${currentTheme.bgDark}`}`}
      >
        {/* Main Icon */}
        <div className="h-16 sm:h-20 flex items-center justify-center mt-4">
          <Icon 
            className={`${selectedSize.icon} transition-all duration-500 transform
              ${dayNightCycle === 0 ? `text-${currentTheme.accent}` : `text-${currentTheme.textDark}`}
              ${growthStage === 0 ? 'scale-50 opacity-50' : ''}
              ${growthStage === 1 ? 'scale-75 opacity-75' : ''}
              ${growthStage === 2 ? 'scale-90 opacity-90' : ''}
              ${growthStage === 3 ? 'scale-100 opacity-100' : ''}
              animate-spin-slow
            `}
          />
        </div>

        {/* Loading Text */}
        <div className={`text-center font-semibold ${selectedSize.text} transition-colors duration-800
          ${dayNightCycle === 0 ? `text-${currentTheme.textLight}` : `text-${currentTheme.textDark}`}`}>
          {message || currentTheme.icons[growthStage].text}
        </div>

        {/* Progress Bar */}
        <div className="w-32 sm:w-48 h-2 bg-gray-200/20 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500`}
            style={{ 
              width: `${(growthStage + 1) * 25}%`,
              backgroundColor: currentTheme.accent
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

// The styles remain the same as in your original component
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
    0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
    50% { transform: translateY(20px) scale(0.5); opacity: 0; }
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
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default LoadingSpinner;