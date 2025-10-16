import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = () => {
  const stats = [
    {
      id: 1,
      label: "Active Members",
      value: "12,847",
      change: "+8.2%",
      changeType: "increase",
      icon: "Users",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      label: "Study Groups",
      value: "324",
      change: "+12",
      changeType: "increase",
      icon: "UserCheck",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      label: "Discussions Today",
      value: "1,256",
      change: "+24%",
      changeType: "increase",
      icon: "MessageSquare",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      label: "Questions Answered",
      value: "8,943",
      change: "+156",
      changeType: "increase",
      icon: "HelpCircle",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              stat?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              <Icon 
                name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{stat?.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityStats;