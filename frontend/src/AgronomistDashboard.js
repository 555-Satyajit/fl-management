import React from 'react';
import { 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Sprout,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Leaf,
  FileText
} from 'lucide-react';
import { useAuth } from './AuthContext';

const AgronomistDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Total Farmers', value: '2,345', icon: Users },
    { label: 'Active Crops', value: '1,234', icon: Leaf },
    { label: 'Pending Reports', value: '45', icon: FileText },
    { label: 'Critical Alerts', value: '12', icon: AlertTriangle },
  ];

  const menuItems = [
    { label: 'Manage Farmers', icon: Users, link: '/agronomist/farmers' },
    { label: 'Crop Analysis', icon: BarChart3, link: '/agronomist/analysis' },
    { label: 'Reports', icon: FileText, link: '/agronomist/reports' },
    { label: 'Calendar', icon: Calendar, link: '/agronomist/calendar' },
    { label: 'Settings', icon: Settings, link: '/agronomist/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-[#2C1810] text-white p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Leaf className="h-8 w-8 text-[#E6B17E]" />
          <span className="text-xl font-bold text-[#E6B17E]">Agronomist Panel</span>
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
          <h1 className="text-2xl font-bold text-[#2C1810]">Welcome, {user?.name}</h1>
          <p className="text-[#8B4513]">Agronomist Dashboard Overview</p>
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

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md border border-[#E6B17E]/20 p-6">
          <h2 className="text-xl font-bold text-[#2C1810] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add your recent activity items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgronomistDashboard;