import React from 'react';
import { 
  Sprout, 
  Cloud, 
  BarChart3, 
  Settings, 
  LogOut,
  Droplets,
  Sun,
  Wind
} from 'lucide-react';
import { useAuth } from './AuthContext';

const FarmerDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Crop Health', value: '98%', icon: Sprout },
    { label: 'Water Usage', value: '780L', icon: Droplets },
    { label: 'Temperature', value: '24°C', icon: Sun },
    { label: 'Wind Speed', value: '12km/h', icon: Wind },
  ];

  const menuItems = [
    { label: 'Farm Overview', icon: Sprout, link: '/farmer/overview' },
    { label: 'Weather', icon: Cloud, link: '/farmer/weather' },
    { label: 'Analytics', icon: BarChart3, link: '/farmer/analytics' },
    { label: 'Settings', icon: Settings, link: '/farmer/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-[#2C1810] text-white p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Sprout className="h-8 w-8 text-[#E6B17E]" />
          <span className="text-xl font-bold text-[#E6B17E]">Farm Dashboard</span>
        </div>
        
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#8B4513] transition-colors duration-200 mb-2"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          ))}
          <button
            onClick={logout}
            className="flex items-center space-x-2 p-3 rounded-lg hover:bg-[#8B4513] transition-colors duration-200 w-full mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#2C1810]"></h1>
          <p className="text-[#8B4513]">Today's Farm Overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-md border border-[#E6B17E]/20">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-[#8B4513]" />
                <span className="text-2xl font-bold text-[#2C1810]">{stat.value}</span>
              </div>
              <p className="text-[#8B4513]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weather Forecast */}
        <div className="bg-white rounded-lg shadow-md border border-[#E6B17E]/20 p-6 mb-8">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4">Weather Forecast</h2>
          {/* Add weather forecast content here */}
        </div>

        {/* Crop Status */}
        <div className="bg-white rounded-lg shadow-md border border-[#E6B17E]/20 p-6">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4">Crop Status</h2>
          {/* Add crop status content here */}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;